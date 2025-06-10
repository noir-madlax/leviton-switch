#!/usr/bin/env python3
"""
Competitor Analysis Data Generator
专门分析6个竞争产品之间的痛点对比分析

目标产品：
- Leviton D26HD
- Leviton D215S  
- Lutron Caseta Diva
- TP Link Switch
- Leviton DSL06
- Lutron Diva

Usage:
    python competitor_analysis.py

Output:
    生成 frontend/lib/competitorAnalysis.ts 文件
"""

import json
import os
import sys
import pandas as pd
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple, Any, Optional, Set
import re


class CompetitorAnalyzer:
    def __init__(self, data_dir: str):
        """
        初始化竞争品分析器
        
        Args:
            data_dir: 数据目录路径，包含JSON文件
        """
        self.data_dir = Path(data_dir)
        self.consolidated_data = None
        self.expanded_reviews = None
        self.category_definitions = None
        self.product_mapping = None
        
        # 定义6个目标产品的精确ASIN匹配（用户提供的精确ASIN列表）
        self.target_products = {
            'Leviton D26HD': {
                'asins': ['B0BVKYKKRK'],
                'brand': 'Leviton',
                'type': 'Smart Dimmer'
            },
            'Leviton D215S': {
                'asins': ['B0BVKZLT3B'],
                'brand': 'Leviton', 
                'type': 'Smart Switch'
            },
            'Lutron Caseta Diva': {
                'asins': ['B0BSHKS26L'],
                'brand': 'Lutron',
                'type': 'Smart Dimmer'
            },
            'TP Link Switch': {
                'asins': ['B01EZV35QU'],
                'brand': 'TP-Link',
                'type': 'Smart Switch'
            },
            'Leviton DSL06': {
                'asins': ['B00NG0ELL0'],
                'brand': 'Leviton',
                'type': 'Traditional Dimmer'
            },
            'Lutron Diva': {
                'asins': ['B085D8M2MR'],
                'brand': 'Lutron',
                'type': 'Traditional Dimmer'
            }
        }
        
        # 结果数据：产品 × 分类的痛点矩阵
        self.product_pain_matrix = {}
        
    def load_product_mapping(self):
        """使用精确ASIN匹配加载目标产品数据"""
        print("正在使用精确ASIN匹配目标产品...")
        
        # 先加载expanded_review_results来获取实际评论数量
        expanded_file = self.data_dir / "expanded_review_results.json"
        if not expanded_file.exists():
            raise FileNotFoundError(f"找不到文件: {expanded_file}")
        
        with open(expanded_file, 'r', encoding='utf-8') as f:
            expanded_data = json.load(f)
        
        # 精确匹配目标产品的ASIN
        self.product_mapping = {}
        matched_products = {product: [] for product in self.target_products.keys()}
        
        for product_name, criteria in self.target_products.items():
            for target_asin in criteria['asins']:
                if target_asin in expanded_data.get('results', {}):
                    product_info = expanded_data['results'][target_asin]
                    actual_reviews = product_info.get('total_reviews', 0)
                    
                    self.product_mapping[target_asin] = {
                        'product_name': product_name,
                        'title': product_info.get('product_title', ''),
                        'brand': criteria['brand'],
                        'type': criteria['type'],
                        'total_reviews': actual_reviews
                    }
                    matched_products[product_name].append({
                        'asin': target_asin,
                        'title': product_info.get('product_title', ''),
                        'total_reviews': actual_reviews
                    })
                else:
                    print(f"⚠️  ASIN {target_asin} ({product_name}) 未在评论数据中找到")
        
        # 打印匹配结果
        print("✓ 精确ASIN匹配结果 (实际评论数量):")
        for product_name, matches in matched_products.items():
            if matches:
                for match in matches:
                    print(f"  {product_name}: {match['asin']} - {match['total_reviews']} reviews")
                    print(f"    └─ {match['title'][:80]}...")
            else:
                print(f"  {product_name}: ❌ 未找到数据")
        
        total_matched = sum(len(matches) for matches in matched_products.values())
        total_reviews = sum(match['total_reviews'] for matches in matched_products.values() for match in matches)
        print(f"总计精确匹配到 {total_matched} 个目标产品，总评论数: {total_reviews}")
        
    def load_data(self):
        """加载所需的数据文件"""
        print("正在加载数据文件...")
        
        # 加载产品映射
        self.load_product_mapping()
        
        # 加载consolidated aspect categorization
        consolidated_file = self.data_dir / "consolidated_aspect_categorization.json"
        if not consolidated_file.exists():
            raise FileNotFoundError(f"找不到文件: {consolidated_file}")
        
        with open(consolidated_file, 'r', encoding='utf-8') as f:
            self.consolidated_data = json.load(f)
        print(f"✓ 已加载 consolidated_aspect_categorization.json")
        
        # 加载expanded review results
        expanded_file = self.data_dir / "expanded_review_results.json"
        if not expanded_file.exists():
            raise FileNotFoundError(f"找不到文件: {expanded_file}")
        
        with open(expanded_file, 'r', encoding='utf-8') as f:
            self.expanded_reviews = json.load(f)
        print(f"✓ 已加载 expanded_review_results.json")
        
    def extract_rating_score(self, rating_str: str) -> float:
        """从评分字符串中提取数字评分"""
        try:
            if isinstance(rating_str, str) and "out of 5 stars" in rating_str:
                return float(rating_str.split()[0])
            return 0.0
        except (ValueError, IndexError):
            return 0.0
            
    def analyze_competitor_pain_points(self):
        """分析竞争对手痛点矩阵：产品 × 分类"""
        print("正在分析竞争品痛点矩阵...")
        
        # 初始化每个目标产品的数据结构
        for product_name in self.target_products.keys():
            self.product_pain_matrix[product_name] = defaultdict(lambda: {
                'mentions': 0,
                'positive_reviews': [],
                'negative_reviews': [],
                'category_type': '',
                'satisfaction_rate': 0.0
            })
        
        # 统计每个产品类型的处理数量
        processed_count = {product: 0 for product in self.target_products.keys()}
        
        # 遍历所有产品
        total_products = len(self.consolidated_data['results'])
        processed_products = 0
        
        for product_id, product_data in self.consolidated_data['results'].items():
            processed_products += 1
            if processed_products % 50 == 0:
                print(f"  处理进度: {processed_products}/{total_products}")
            
            # 检查是否是目标产品
            if product_id not in self.product_mapping:
                continue
                
            # 检查是否在expanded_reviews中有对应数据
            if product_id not in self.expanded_reviews.get('results', {}):
                continue
                
            product_name = self.product_mapping[product_id]['product_name']
            processed_count[product_name] += 1
            expanded_product = self.expanded_reviews['results'][product_id]
            
            # 处理phy和perf分类
            for category_type in ['phy', 'perf']:
                if category_type not in product_data['aspect_categorization']:
                    continue
                    
                # 遍历aspect groups
                for aspect_group_name, aspect_group in product_data['aspect_categorization'][category_type].items():
                    for aspect_key, category_name in aspect_group.items():
                        if category_name == "OUT_OF_SCOPE":
                            continue
                            
                        # 记录分类类型
                        category_full_name = f"{category_name}"
                        self.product_pain_matrix[product_name][category_full_name]['mentions'] += 1
                        self.product_pain_matrix[product_name][category_full_name]['category_type'] = 'Physical' if category_type == 'phy' else 'Performance'
                        
                        # 查找对应的评价数据
                        review_analysis = expanded_product.get('review_analysis', {})
                        if category_type not in review_analysis:
                            continue
                            
                        type_analysis = review_analysis[category_type]
                        if aspect_group_name not in type_analysis:
                            continue
                            
                        group_analysis = type_analysis[aspect_group_name]
                        if aspect_key not in group_analysis:
                            continue
                            
                        aspect_reviews = group_analysis[aspect_key]
                        
                        # 处理正面和负面评价
                        for sentiment in ['+', '-']:
                            if sentiment not in aspect_reviews:
                                continue
                                
                            reviews_list = aspect_reviews[sentiment]
                            if not isinstance(reviews_list, list):
                                continue
                                
                            for review in reviews_list:
                                if not isinstance(review, dict):
                                    continue
                                    
                                rating_score = self.extract_rating_score(review.get('rating', ''))
                                review_data = {
                                    'rating': rating_score,
                                    'sentiment': sentiment,
                                    'aspect_key': aspect_key,
                                    'product_id': product_id
                                }
                                
                                if sentiment == '+':
                                    self.product_pain_matrix[product_name][category_full_name]['positive_reviews'].append(review_data)
                                elif sentiment == '-':
                                    self.product_pain_matrix[product_name][category_full_name]['negative_reviews'].append(review_data)
        
        print("✓ 各产品处理数量统计:")
        for product, count in processed_count.items():
            print(f"  {product}: {count} 个产品实例")
        
        # 添加分类处理统计
        print("\n✓ 各产品发现的分类数量:")
        total_categories_found = 0
        for product_name, categories in self.product_pain_matrix.items():
            category_count = len(categories)
            total_categories_found += category_count
            print(f"  {product_name}: {category_count} 个分类")
            # 显示前5个分类作为示例
            category_names = list(categories.keys())[:5]
            if category_names:
                print(f"    示例分类: {', '.join(category_names)}")
                if len(categories) > 5:
                    print(f"    ... 还有 {len(categories)-5} 个分类")
        
        print(f"\n总共发现 {total_categories_found} 个产品-分类组合")
            
    def calculate_satisfaction_rates(self):
        """计算每个产品-分类组合的满意度"""
        print("正在计算满意度指标...")
        
        for product_name, categories in self.product_pain_matrix.items():
            for category_name, data in categories.items():
                positive_count = len(data['positive_reviews'])
                negative_count = len(data['negative_reviews'])
                total_reviews = positive_count + negative_count
                
                if total_reviews > 0:
                    satisfaction_rate = (positive_count / total_reviews) * 100
                    data['satisfaction_rate'] = round(satisfaction_rate, 1)
                    data['positive_count'] = positive_count
                    data['negative_count'] = negative_count
                    data['total_reviews'] = total_reviews
                else:
                    data['satisfaction_rate'] = 0.0
                    data['positive_count'] = 0
                    data['negative_count'] = 0
                    data['total_reviews'] = 0
    
    def get_matrix_data(self) -> List[Dict]:
        """获取矩阵数据格式，用于前端气泡图显示"""
        matrix_data = []
        
        # 排除没有评论数据的产品
        excluded_products = []
        valid_products = []
        
        # 直接从product_mapping获取实际评论数量
        for product_name in self.target_products.keys():
            # 找到对应的ASIN并获取评论数量
            product_total_reviews = 0
            for asin, mapping in self.product_mapping.items():
                if mapping['product_name'] == product_name:
                    product_total_reviews += mapping.get('total_reviews', 0)
            
            if product_total_reviews < 5:  # 少于5条评论的产品排除
                excluded_products.append(product_name)
            else:
                valid_products.append(product_name)
        
        print(f"✓ 排除评论数据不足的产品: {excluded_products}")
        print(f"✓ 保留的产品: {valid_products}")
        
        # 收集在多个产品中出现且有足够评论的分类
        from collections import defaultdict
        category_stats = defaultdict(lambda: {'products': 0, 'total_reviews': 0, 'total_mentions': 0})
        
        for product_name in valid_products:
            if product_name not in self.product_pain_matrix:
                continue
            categories = self.product_pain_matrix[product_name]
            for category_name, data in categories.items():
                if data.get('total_reviews', 0) > 0:  # 必须有评论数据
                    category_stats[category_name]['products'] += 1
                    category_stats[category_name]['total_reviews'] += data.get('total_reviews', 0)
                    category_stats[category_name]['total_mentions'] += data.get('mentions', 0)
        
        # 筛选分类：降低门槛，允许更多分类通过
        valid_categories = []
        for category_name, stats in category_stats.items():
            # 放宽条件：只要在1个产品中出现且总评论数>=1即可
            if stats['products'] >= 1 and stats['total_reviews'] >= 1:
                valid_categories.append(category_name)
        
        # 按总评论数排序，增加到前50个分类
        valid_categories = sorted(valid_categories, 
                                key=lambda x: category_stats[x]['total_reviews'], 
                                reverse=True)[:50]
        
        print(f"✓ 筛选后的分类数量: {len(valid_categories)} (从原来的分类中筛选)")
        print(f"✓ 分类详情:")
        for cat in valid_categories[:10]:  # 显示前10个分类
            stats = category_stats[cat]
            print(f"    {cat}: {stats['products']}个产品, {stats['total_reviews']}个评论, {stats['total_mentions']}次提及")
        if len(valid_categories) > 10:
            print(f"    ... 还有{len(valid_categories)-10}个分类")
        
        # 为每个产品-分类组合生成数据点
        for product_name in valid_products:
            if product_name not in self.product_pain_matrix:
                continue
            for category_name in valid_categories:
                data = self.product_pain_matrix[product_name].get(category_name, {
                    'mentions': 0,
                    'satisfaction_rate': 0.0,
                    'category_type': 'Physical',
                    'positive_count': 0,
                    'negative_count': 0,
                    'total_reviews': 0
                })
                
                # 降低要求：包含所有有mentions的数据，即使是0次提及也包含（用于完整性）
                if data['mentions'] >= 0:  # 包含0次提及的数据
                    matrix_data.append({
                        'product': product_name,
                        'category': category_name,
                        'categoryType': data.get('category_type', 'Physical'),
                        'mentions': data['mentions'],
                        'satisfactionRate': data['satisfaction_rate'],
                        'positiveCount': data.get('positive_count', 0),
                        'negativeCount': data.get('negative_count', 0),
                        'totalReviews': data.get('total_reviews', 0)
                    })
        
        return matrix_data
    
    def get_summary_stats(self) -> Dict:
        """获取汇总统计数据"""
        total_data_points = 0
        total_mentions = 0
        satisfaction_rates = []
        
        for product_name, categories in self.product_pain_matrix.items():
            for category_name, data in categories.items():
                # 包含所有的数据点，不管mentions是否>=1
                if data['mentions'] >= 0:  # 包含0次提及的数据
                    total_data_points += 1
                    total_mentions += data['mentions']
                    if data['total_reviews'] > 0:  # 只有真实评论的数据才计算满意度
                        satisfaction_rates.append(data['satisfaction_rate'])
        
        avg_satisfaction = sum(satisfaction_rates) / len(satisfaction_rates) if satisfaction_rates else 0
        
        return {
            'totalProducts': len(self.target_products),
            'totalDataPoints': total_data_points,
            'totalMentions': total_mentions,
            'avgSatisfactionRate': round(avg_satisfaction, 1),
            'processingDate': datetime.now().isoformat(),
            'description': '6 product competitive pain points analysis'
        }
    
    def generate_typescript_file(self, output_path: str):
        """生成TypeScript数据文件"""
        print(f"正在生成TypeScript文件: {output_path}")
        
        # 获取矩阵数据和汇总统计
        matrix_data = self.get_matrix_data()
        summary_stats = self.get_summary_stats()
        
        # 按分类类型分组数据
        physical_data = [d for d in matrix_data if d['categoryType'] == 'Physical']
        performance_data = [d for d in matrix_data if d['categoryType'] == 'Performance']
        
        # 收集每个产品的实际总评论数
        product_total_reviews = {}
        for asin, mapping in self.product_mapping.items():
            product_name = mapping['product_name']
            total_reviews = mapping.get('total_reviews', 0)
            if product_name not in product_total_reviews:
                product_total_reviews[product_name] = 0
            product_total_reviews[product_name] += total_reviews
        
        # 生成TypeScript代码
        ts_content = f'''// Competitor Analysis Data - 6个竞争产品的痛点对比分析
// 数据来源: consolidated_aspect_categorization.json, expanded_review_results.json
// 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// 分析产品: Leviton D26HD, D215S, Lutron Caseta Diva, TP Link Switch, Leviton DSL06, Lutron Diva

export interface ProductPainPoint {{
  product: string;                    // 产品名称
  category: string;                   // 分类名称
  categoryType: 'Physical' | 'Performance'; // 分类类型
  mentions: number;                   // 提及次数 (用于气泡大小)
  satisfactionRate: number;           // 满意度百分比 (用于颜色)
  positiveCount: number;              // 正面评价数
  negativeCount: number;              // 负面评价数
  totalReviews: number;               // 总评价数
}}

export interface CompetitorAnalysisData {{
  summary: {{
    totalProducts: number;
    totalDataPoints: number;
    totalMentions: number;
    avgSatisfactionRate: number;
    processingDate: string;
    description: string;
  }};
  matrixData: ProductPainPoint[];        // 完整矩阵数据
  physicalData: ProductPainPoint[];     // 物理特性数据
  performanceData: ProductPainPoint[];  // 性能特性数据
  targetProducts: string[];             // 目标产品列表
  productTotalReviews: Record<string, number>; // 每个产品的实际总评论数
}}

// 目标产品列表
export const targetProducts = {json.dumps(list(self.target_products.keys()), indent=2, ensure_ascii=False)};

// 每个产品的实际总评论数
export const productTotalReviews = {json.dumps(product_total_reviews, indent=2, ensure_ascii=False)};

// 汇总统计数据
export const competitorSummary = {json.dumps(summary_stats, indent=2, ensure_ascii=False)};

// 完整痛点矩阵数据
export const competitorMatrixData: ProductPainPoint[] = {json.dumps(matrix_data, indent=2, ensure_ascii=False)};

// 物理特性痛点数据
export const physicalPainPoints: ProductPainPoint[] = {json.dumps(physical_data, indent=2, ensure_ascii=False)};

// 性能特性痛点数据
export const performancePainPoints: ProductPainPoint[] = {json.dumps(performance_data, indent=2, ensure_ascii=False)};

// 获取竞争品分析数据
export function getCompetitorAnalysisData(): CompetitorAnalysisData {{
  return {{
    summary: competitorSummary,
    matrixData: competitorMatrixData,
    physicalData: physicalPainPoints,
    performanceData: performancePainPoints,
    targetProducts: targetProducts,
    productTotalReviews: productTotalReviews
  }};
}}

// 获取指定产品的痛点数据
export function getProductPainPoints(productName: string): ProductPainPoint[] {{
  return competitorMatrixData.filter(item => item.product === productName);
}}

// 获取指定分类的所有产品数据
export function getCategoryComparisonData(categoryName: string): ProductPainPoint[] {{
  return competitorMatrixData.filter(item => item.category === categoryName);
}}

// 获取所有分类列表
export function getAllCategories(): string[] {{
  const categories = new Set(competitorMatrixData.map(item => item.category));
  return Array.from(categories).sort();
}}

// 获取按分类类型筛选的数据
export function getDataByType(categoryType: 'Physical' | 'Performance'): ProductPainPoint[] {{
  return competitorMatrixData.filter(item => item.categoryType === categoryType);
}}

// 计算满意度颜色映射 (用于气泡图颜色)
export function getSatisfactionColor(satisfactionRate: number): string {{
  if (satisfactionRate >= 80) return '#22c55e';      // 绿色 - 高满意度
  else if (satisfactionRate >= 60) return '#eab308'; // 黄色 - 中等满意度
  else if (satisfactionRate >= 40) return '#f97316'; // 橙色 - 较低满意度
  else return '#ef4444';                              // 红色 - 低满意度
}}

// 计算气泡大小映射
export function getBubbleSize(mentions: number, maxMentions: number): number {{
  const minSize = 10;
  const maxSize = 50;
  const normalizedSize = (mentions / maxMentions) * (maxSize - minSize) + minSize;
  return Math.max(minSize, Math.min(maxSize, normalizedSize));
}}
'''
        
        # 写入文件
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        print(f"✓ 已生成TypeScript文件: {output_path}")
    
    def print_analysis_summary(self):
        """打印分析结果摘要"""
        print("\n" + "="*80)
        print("竞争品分析结果摘要")
        print("="*80)
        
        matrix_data = self.get_matrix_data()
        summary = self.get_summary_stats()
        
        print(f"目标产品数量: {summary['totalProducts']}")
        print(f"数据点总数: {summary['totalDataPoints']}")
        print(f"总提及次数: {summary['totalMentions']}")
        print(f"平均满意度: {summary['avgSatisfactionRate']}%")
        
        print(f"\n各产品数据分布:")
        for product_name in self.target_products.keys():
            product_data = [d for d in matrix_data if d['product'] == product_name]
            total_mentions = sum(d['mentions'] for d in product_data)
            avg_satisfaction = sum(d['satisfactionRate'] for d in product_data) / len(product_data) if product_data else 0
            print(f"  {product_name:<20}: {len(product_data):3d} 分类, {total_mentions:4d} 提及, {avg_satisfaction:5.1f}% 满意度")
        
        print(f"\n分类类型分布:")
        physical_count = len([d for d in matrix_data if d['categoryType'] == 'Physical'])
        performance_count = len([d for d in matrix_data if d['categoryType'] == 'Performance'])
        print(f"  Physical: {physical_count} 数据点")
        print(f"  Performance: {performance_count} 数据点")
        
        print("\n" + "="*80)
    
    def run(self, output_path: str):
        """运行完整的分析流程"""
        try:
            self.load_data()
            self.analyze_competitor_pain_points()
            self.calculate_satisfaction_rates()
            self.generate_typescript_file(output_path)
            self.print_analysis_summary()
            
            print(f"\n✅ 竞争品分析完成！数据已保存到: {output_path}")
            
        except Exception as e:
            print(f"\n❌ 分析过程中出现错误: {str(e)}")
            raise


def main():
    """主函数"""
    # 设置路径
    current_dir = Path(__file__).parent.parent.parent  # backend/
    data_dir = current_dir / "data/result/process_review/20250609_05"
    output_path = current_dir.parent / "frontend/lib/competitorAnalysis.ts"  # frontend/lib/
    
    print("Competitor Analysis Generator - 6产品竞争分析")
    print("="*70)
    print(f"数据目录: {data_dir}")
    print(f"输出文件: {output_path}")
    print()
    
    # 运行分析
    analyzer = CompetitorAnalyzer(str(data_dir))
    analyzer.run(str(output_path))


if __name__ == "__main__":
    main()