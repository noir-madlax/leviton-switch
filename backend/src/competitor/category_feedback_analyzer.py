#!/usr/bin/env python3
"""
Category Feedback Analyzer
分析每个phy/perf分类的正负面反馈数据，支持按产品类型（Dimmer/Light Switches）分开处理
使用sentiment标记直接判断正负面，同时生成正面和负面分析数据

Usage:
    python category_feedback_analyzer.py

Output:
    生成 frontend/lib/categoryFeedback.ts 文件
"""

import json
import os
import sys
import pandas as pd
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple, Any, Optional, Set


class CategoryFeedbackAnalyzer:
    def __init__(self, data_dir: str):
        """
        初始化分析器
        
        Args:
            data_dir: 数据目录路径，包含JSON文件
        """
        self.data_dir = Path(data_dir)
        self.consolidated_data = None
        self.expanded_reviews = None
        self.category_definitions = None
        self.product_mapping = None  # 新增：产品类型映射
        
        # 结果数据 - 按产品类型分开
        self.category_stats_by_type = {
            'dimmer': {},
            'light': {}
        }
        self.summary_stats_by_type = {
            'dimmer': {},
            'light': {}
        }
        
        # 使用场景分析数据 - 按产品类型分开
        self.use_case_stats_by_type = {
            'dimmer': {},
            'light': {}
        }
        
    def load_product_mapping(self):
        """加载产品类型映射数据"""
        print("正在加载产品类型映射数据...")
        
        # 加载产品分类CSV文件
        csv_file = self.data_dir.parent.parent / "product_segment/combined_products_cleaned/combined_products_with_final_categories.csv"
        if not csv_file.exists():
            raise FileNotFoundError(f"找不到产品分类文件: {csv_file}")
        
        # 读取CSV文件
        df = pd.read_csv(csv_file)
        
        # 创建ASIN到产品类型的映射
        self.product_mapping = {}
        for _, row in df.iterrows():
            asin = row['platform_id']
            product_segment = row['product_segment']
            category = row['category']
            
            # 确定产品类型
            if 'Dimmer' in category or 'Dimmer' in product_segment:
                product_type = 'dimmer'
            elif 'Light Switch' in category or 'Switch' in category:
                product_type = 'light' 
            else:
                continue  # 跳过不明确的产品
                
            self.product_mapping[asin] = {
                'type': product_type,
                'segment': product_segment,
                'category': category
            }
        
        dimmer_count = len([p for p in self.product_mapping.values() if p['type'] == 'dimmer'])
        light_count = len([p for p in self.product_mapping.values() if p['type'] == 'light'])
        
        print(f"✓ 已加载产品映射数据: {len(self.product_mapping)} 个产品")
        print(f"  - Dimmer Switches: {dimmer_count} 个产品")
        print(f"  - Light Switches: {light_count} 个产品")
        
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
        
        # 加载category definitions
        definitions_file = self.data_dir / "aspect_category_definitions.json"
        if not definitions_file.exists():
            raise FileNotFoundError(f"找不到文件: {definitions_file}")
        
        with open(definitions_file, 'r', encoding='utf-8') as f:
            self.category_definitions = json.load(f)
        print(f"✓ 已加载 aspect_category_definitions.json")
        
    def extract_rating_score(self, rating_str: str) -> float:
        """
        从评分字符串中提取数字评分
        
        Args:
            rating_str: 如 "4.0 out of 5 stars"
            
        Returns:
            float: 评分数字，如 4.0
        """
        try:
            if isinstance(rating_str, str) and "out of 5 stars" in rating_str:
                return float(rating_str.split()[0])
            return 0.0
        except (ValueError, IndexError):
            return 0.0
    
    def analyze_categories(self):
        """分析所有分类的痛点数据，按产品类型分开处理，使用sentiment标记直接判断正负面"""
        print("正在分析分类数据（使用sentiment标记直接判断正负面）...")
        
        # 为每种产品类型初始化统计数据
        category_data_by_type = {
            'dimmer': defaultdict(lambda: {
                'mentions': 0,
                'positive_reviews': [],
                'negative_reviews': [],
                'all_reviews': [],
                'category_type': '',
                'top_negative_aspects': [],
                'top_positive_aspects': []  # 新增：收集正面aspects
            }),
            'light': defaultdict(lambda: {
                'mentions': 0,
                'positive_reviews': [],
                'negative_reviews': [],
                'all_reviews': [],
                'category_type': '',
                'top_negative_aspects': [],
                'top_positive_aspects': []  # 新增：收集正面aspects
            })
        }
        
        # 遍历所有产品
        total_products = len(self.consolidated_data['results'])
        processed_products = 0
        products_by_type_count = {'dimmer': 0, 'light': 0, 'unknown': 0}
        
        for product_id, product_data in self.consolidated_data['results'].items():
            processed_products += 1
            if processed_products % 10 == 0:
                print(f"  处理进度: {processed_products}/{total_products}")
            
            # 检查是否在expanded_reviews中有对应数据
            if product_id not in self.expanded_reviews.get('results', {}):
                continue
                
            # 确定产品类型
            if product_id not in self.product_mapping:
                products_by_type_count['unknown'] += 1
                continue
                
            product_type = self.product_mapping[product_id]['type']
            products_by_type_count[product_type] += 1
            
            expanded_product = self.expanded_reviews['results'][product_id]
            
            # 获取对应的category_data
            category_data = category_data_by_type[product_type]
            
            # 处理phy和perf分类
            for category_type in ['phy', 'perf']:
                if category_type not in product_data['aspect_categorization']:
                    continue
                    
                # 遍历aspect groups
                for aspect_group_name, aspect_group in product_data['aspect_categorization'][category_type].items():
                    for aspect_key, category_name in aspect_group.items():
                        if category_name == "OUT_OF_SCOPE":
                            continue
                            
                        category_data[category_name]['mentions'] += 1
                        category_data[category_name]['category_type'] = 'Physical' if category_type == 'phy' else 'Performance'
                        
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
                        
                        # 处理正面和负面评价 - 直接使用sentiment标记
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
                                
                                category_data[category_name]['all_reviews'].append(review_data)
                                
                                # 直接使用sentiment标记分类正负面
                                if sentiment == '+':
                                    category_data[category_name]['positive_reviews'].append(review_data)
                                    # 收集正面aspects
                                    aspect_text = aspect_key.split('@', 1)[-1] if '@' in aspect_key else aspect_key
                                    category_data[category_name]['top_positive_aspects'].append(aspect_text)
                                elif sentiment == '-':
                                    category_data[category_name]['negative_reviews'].append(review_data)
                                    # 收集负面aspects
                                    aspect_text = aspect_key.split('@', 1)[-1] if '@' in aspect_key else aspect_key
                                    category_data[category_name]['top_negative_aspects'].append(aspect_text)
        
        print(f"产品类型分布: Dimmer={products_by_type_count['dimmer']}, Light={products_by_type_count['light']}, Unknown={products_by_type_count['unknown']}")
        
        # 计算每种产品类型的统计指标
        print("正在计算统计指标...")
        for product_type in ['dimmer', 'light']:
            self.category_stats_by_type[product_type] = {}
            category_data = category_data_by_type[product_type]
            
            for category_name, data in category_data.items():
                total_reviews = len(data['all_reviews'])
                if total_reviews == 0:
                    continue
                    
                positive_count = len(data['positive_reviews'])
                negative_count = len(data['negative_reviews'])
                
                # 计算满意度（基于sentiment标记）
                satisfaction_rate = (positive_count / total_reviews) * 100 if total_reviews > 0 else 0
                negative_rate = (negative_count / total_reviews) * 100 if total_reviews > 0 else 0
                
                # 计算平均评分
                all_ratings = [r['rating'] for r in data['all_reviews'] if r['rating'] > 0]
                average_rating = sum(all_ratings) / len(all_ratings) if all_ratings else 0
                
                # 获取最频繁的负面aspects (最多5个)
                negative_aspects_count = defaultdict(int)
                for aspect in data['top_negative_aspects']:
                    negative_aspects_count[aspect] += 1
                
                top_negative_aspects = sorted(
                    negative_aspects_count.items(), 
                    key=lambda x: x[1], 
                    reverse=True
                )[:5]
                
                # 获取最频繁的正面aspects (最多5个)
                positive_aspects_count = defaultdict(int)
                for aspect in data['top_positive_aspects']:
                    positive_aspects_count[aspect] += 1
                
                top_positive_aspects = sorted(
                    positive_aspects_count.items(), 
                    key=lambda x: x[1], 
                    reverse=True
                )[:5]
                
                self.category_stats_by_type[product_type][category_name] = {
                    'category': category_name,
                    'categoryType': data['category_type'],
                    'mentions': data['mentions'],
                    'satisfactionRate': round(satisfaction_rate, 1),
                    'negativeRate': round(negative_rate, 1),
                    'positiveCount': positive_count,
                    'negativeCount': negative_count,
                    'totalReviews': total_reviews,
                    'averageRating': round(average_rating, 2),
                    'topNegativeAspects': [aspect for aspect, count in top_negative_aspects],
                    'topPositiveAspects': [aspect for aspect, count in top_positive_aspects]  # 新增
                }
    
    def calculate_summary_stats(self):
        """计算汇总统计数据（按产品类型分开）"""
        print("正在计算汇总统计...")
        
        for product_type in ['dimmer', 'light']:
            stats = self.category_stats_by_type[product_type]
            
            physical_categories = [cat for cat in stats.values() if cat['categoryType'] == 'Physical']
            performance_categories = [cat for cat in stats.values() if cat['categoryType'] == 'Performance']
            
            all_satisfaction_rates = [cat['satisfactionRate'] for cat in stats.values()]
            avg_satisfaction = sum(all_satisfaction_rates) / len(all_satisfaction_rates) if all_satisfaction_rates else 0
            
            self.summary_stats_by_type[product_type] = {
                'totalCategories': len(stats),
                'physicalCategories': len(physical_categories),
                'performanceCategories': len(performance_categories),
                'avgSatisfactionRate': round(avg_satisfaction, 1),
                'processingDate': datetime.now().isoformat(),
                'productType': 'Dimmer Switches' if product_type == 'dimmer' else 'Light Switches'
            }
    
    def get_top_negative_categories(self, product_type: str, limit: int = 10) -> List[Dict]:
        """获取指定产品类型的Top N负面分类（按绝对负面评价数排序）"""
        stats = self.category_stats_by_type[product_type]
        # 按绝对负面评价数排序（确保数据有统计意义）
        sorted_categories = sorted(
            [cat for cat in stats.values() if cat['totalReviews'] >= 5],  # 至少5个评价
            key=lambda x: -x['negativeCount']  # 按绝对负面评价数降序排序
        )
        return sorted_categories[:limit]
    
    def get_top_positive_categories(self, product_type: str, limit: int = 10) -> List[Dict]:
        """获取指定产品类型的Top N正面分类（按绝对正面评价数排序）"""
        stats = self.category_stats_by_type[product_type]
        # 按绝对正面评价数排序（确保数据有统计意义）
        sorted_categories = sorted(
            [cat for cat in stats.values() if cat['totalReviews'] >= 5],  # 至少5个评价
            key=lambda x: -x['positiveCount']  # 按绝对正面评价数降序排序
        )
        return sorted_categories[:limit]
    
    def analyze_use_cases(self):
        """分析使用场景满意度数据，按产品类型分开处理"""
        print("正在分析使用场景数据...")
        
        # 使用场景关键词库 - 基于aspect key和review content
        use_case_keywords = {
            'lighting_control': ['dimmer', 'dimming', 'bright', 'light level', 'illumination', 'lighting'],
            'smart_home': ['smart', 'alexa', 'google', 'voice', 'app', 'wifi', 'automation'],
            'installation_replacement': ['install', 'replace', 'upgrade', 'wiring', 'electrical'],
            'appearance_aesthetics': ['look', 'appearance', 'design', 'style', 'color', 'finish'],
            'functionality_operation': ['work', 'function', 'operate', 'switch', 'control', 'button'],
            'quality_durability': ['quality', 'durable', 'build', 'material', 'construction', 'solid'],
            'value_price': ['price', 'cost', 'value', 'cheap', 'expensive', 'worth'],
            'compatibility_fit': ['fit', 'size', 'compatible', 'standard', 'box', 'gang'],
            'performance_reliability': ['reliable', 'performance', 'consistent', 'stable', 'work well'],
            'energy_efficiency': ['energy', 'efficient', 'save', 'power', 'consumption', 'led']
        }
        
        # 为每种产品类型初始化使用场景数据
        use_case_data_by_type = {
            'dimmer': defaultdict(lambda: {
                'total_mentions': 0,
                'positive_reviews': [],
                'negative_reviews': [],
                'satisfaction_reasons': [],
                'gap_reasons': [],
                'related_categories': set()
            }),
            'light': defaultdict(lambda: {
                'total_mentions': 0,
                'positive_reviews': [],
                'negative_reviews': [],
                'satisfaction_reasons': [],
                'gap_reasons': [],
                'related_categories': set()
            })
        }
        
        # 遍历所有产品
        for product_id, product_data in self.consolidated_data['results'].items():
            if product_id not in self.expanded_reviews.get('results', {}):
                continue
                
            # 确定产品类型
            if product_id not in self.product_mapping:
                continue
                
            product_type = self.product_mapping[product_id]['type']
            expanded_product = self.expanded_reviews['results'][product_id]
            use_case_data = use_case_data_by_type[product_type]
            
            # 处理phy和perf分类
            for category_type in ['phy', 'perf']:
                if category_type not in product_data['aspect_categorization']:
                    continue
                    
                # 遍历aspect groups
                for aspect_group_name, aspect_group in product_data['aspect_categorization'][category_type].items():
                    for aspect_key, category_name in aspect_group.items():
                        if category_name == "OUT_OF_SCOPE":
                            continue
                            
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
                                    
                                # 获取aspect key和review content用于使用场景匹配
                                review_content = review.get('review', '').lower()
                                aspect_text = aspect_key.lower()
                                
                                # 合并aspect key和review content进行匹配
                                search_text = f"{aspect_text} {review_content}"
                                
                                # 匹配使用场景
                                for use_case, keywords in use_case_keywords.items():
                                    matched = False
                                    for keyword in keywords:
                                        if keyword.lower() in search_text:
                                            use_case_data[use_case]['total_mentions'] += 1
                                            use_case_data[use_case]['related_categories'].add(category_name)
                                            
                                            rating_score = self.extract_rating_score(review.get('rating', ''))
                                            review_data = {
                                                'rating': rating_score,
                                                'sentiment': sentiment,
                                                'aspect_key': aspect_key,
                                                'category': category_name,
                                                'product_id': product_id
                                            }
                                            
                                            if sentiment == '+':
                                                use_case_data[use_case]['positive_reviews'].append(review_data)
                                                # 提取满意原因
                                                clean_aspect_text = aspect_key.split('@', 1)[-1] if '@' in aspect_key else aspect_key
                                                use_case_data[use_case]['satisfaction_reasons'].append(clean_aspect_text)
                                            elif sentiment == '-':
                                                use_case_data[use_case]['negative_reviews'].append(review_data)
                                                # 提取不满意原因
                                                clean_aspect_text = aspect_key.split('@', 1)[-1] if '@' in aspect_key else aspect_key
                                                use_case_data[use_case]['gap_reasons'].append(clean_aspect_text)
                                            matched = True
                                            break  # 找到匹配就停止
                                    if matched:
                                        break  # 避免重复计数
        
        # 计算每种产品类型的使用场景统计指标
        print("正在计算使用场景统计指标...")
        for product_type in ['dimmer', 'light']:
            self.use_case_stats_by_type[product_type] = {}
            use_case_data = use_case_data_by_type[product_type]
            
            for use_case, data in use_case_data.items():
                total_mentions = data['total_mentions']
                if total_mentions < 5:  # 至少5个提及
                    continue
                    
                positive_count = len(data['positive_reviews'])
                negative_count = len(data['negative_reviews'])
                
                # 计算满意度
                satisfaction_rate = (positive_count / total_mentions) * 100 if total_mentions > 0 else 0
                
                # 获取最频繁的满意原因 (最多5个)
                satisfaction_reasons_count = defaultdict(int)
                for reason in data['satisfaction_reasons']:
                    satisfaction_reasons_count[reason] += 1
                
                top_satisfaction_reasons = sorted(
                    satisfaction_reasons_count.items(), 
                    key=lambda x: x[1], 
                    reverse=True
                )[:5]
                
                # 获取最频繁的不满意原因 (最多5个)
                gap_reasons_count = defaultdict(int)
                for reason in data['gap_reasons']:
                    gap_reasons_count[reason] += 1
                
                top_gap_reasons = sorted(
                    gap_reasons_count.items(), 
                    key=lambda x: x[1], 
                    reverse=True
                )[:5]
                
                # 格式化使用场景名称
                use_case_display = use_case.replace('_', ' ').title()
                
                self.use_case_stats_by_type[product_type][use_case] = {
                    'useCase': use_case_display,
                    'totalMentions': total_mentions,
                    'positiveCount': positive_count,
                    'negativeCount': negative_count,
                    'satisfactionRate': round(satisfaction_rate, 1),
                    'categoryType': 'Physical',  # 大多数使用场景相关的都是物理特性
                    'topSatisfactionReasons': [reason for reason, count in top_satisfaction_reasons],
                    'topGapReasons': [reason for reason, count in top_gap_reasons],
                    'relatedCategories': list(data['related_categories'])[:5]  # 最多5个相关分类
                }
    
    def get_top_use_cases(self, product_type: str, limit: int = 10) -> List[Dict]:
        """获取指定产品类型的Top N使用场景（按提及次数排序）"""
        stats = self.use_case_stats_by_type[product_type]
        # 按总提及次数排序
        sorted_use_cases = sorted(
            stats.values(),
            key=lambda x: -x['totalMentions']
        )
        return sorted_use_cases[:limit]
    
    def generate_typescript_file(self, output_path: str):
        """生成TypeScript数据文件（包含两种产品类型的正面和负面数据）"""
        print(f"正在生成TypeScript文件: {output_path}")
        
        # 获取两种产品类型的Top 10负面分类
        top_negative_dimmer = self.get_top_negative_categories('dimmer', 10)
        top_negative_light = self.get_top_negative_categories('light', 10)
        
        # 获取两种产品类型的Top 10正面分类
        top_positive_dimmer = self.get_top_positive_categories('dimmer', 10)
        top_positive_light = self.get_top_positive_categories('light', 10)
        
        # 获取两种产品类型的Top 10使用场景
        top_use_cases_dimmer = self.get_top_use_cases('dimmer', 10)
        top_use_cases_light = self.get_top_use_cases('light', 10)
        
        # 获取所有分类数据
        all_categories_dimmer = list(self.category_stats_by_type['dimmer'].values())
        all_categories_light = list(self.category_stats_by_type['light'].values())
        
        # 按负面率排序所有分类
        all_categories_dimmer.sort(key=lambda x: -x['negativeRate'])
        all_categories_light.sort(key=lambda x: -x['negativeRate'])
        
        # 生成TypeScript代码
        ts_content = f'''// Category Feedback Analysis Data - 基于产品类型分类的正负面反馈分析
// 数据来源: consolidated_aspect_categorization.json, expanded_review_results.json, 产品分类数据
// 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// 使用sentiment标记直接判断正负面

export interface CategoryFeedback {{
  category: string;                 // 分类名称
  categoryType: 'Physical' | 'Performance'; // 分类类型
  mentions: number;                // 总提及次数
  satisfactionRate: number;        // 满意度百分比
  negativeRate: number;           // 负面评价比例
  positiveCount: number;          // 正面评价数
  negativeCount: number;          // 负面评价数
  totalReviews: number;           // 总评价数
  averageRating: number;          // 平均评分
  topNegativeAspects: string[];   // 主要负面aspect
  topPositiveAspects: string[];   // 主要正面aspect
}}

export interface UseCaseFeedback {{
  useCase: string;                    // 使用场景名称
  totalMentions: number;             // 总提及次数
  positiveCount: number;             // 正面评价数
  negativeCount: number;             // 负面评价数
  satisfactionRate: number;          // 满意度百分比
  categoryType: 'Physical' | 'Performance'; // 关联的主要分类类型
  topSatisfactionReasons: string[];  // 满意的原因
  topGapReasons: string[];          // 不满意的原因/产品缺口
  relatedCategories: string[];      // 相关的category分类
}}

export interface CategoryFeedbackData {{
  summary: {{
    totalCategories: number;
    physicalCategories: number;
    performanceCategories: number;
    avgSatisfactionRate: number;
    processingDate: string;
    productType: string;
  }};
  topNegativeCategories: CategoryFeedback[];  // Top 10 负面分类
  topPositiveCategories: CategoryFeedback[];  // Top 10 正面分类
  topUseCases: UseCaseFeedback[];             // Top 10 使用场景
  allCategories: CategoryFeedback[];          // 所有分类数据（按负面率排序）
}}

export type ProductType = 'dimmer' | 'light';

// Dimmer Switches 数据
export const dimmerSwitchesSummary = {json.dumps(self.summary_stats_by_type['dimmer'], indent=2, ensure_ascii=False)};
export const topNegativeDimmerCategories: CategoryFeedback[] = {json.dumps(top_negative_dimmer, indent=2, ensure_ascii=False)};
export const topPositiveDimmerCategories: CategoryFeedback[] = {json.dumps(top_positive_dimmer, indent=2, ensure_ascii=False)};
export const topUseCasesDimmer: UseCaseFeedback[] = {json.dumps(top_use_cases_dimmer, indent=2, ensure_ascii=False)};
export const allDimmerCategories: CategoryFeedback[] = {json.dumps(all_categories_dimmer, indent=2, ensure_ascii=False)};

// Light Switches 数据
export const lightSwitchesSummary = {json.dumps(self.summary_stats_by_type['light'], indent=2, ensure_ascii=False)};
export const topNegativeLightCategories: CategoryFeedback[] = {json.dumps(top_negative_light, indent=2, ensure_ascii=False)};
export const topPositiveLightCategories: CategoryFeedback[] = {json.dumps(top_positive_light, indent=2, ensure_ascii=False)};
export const topUseCasesLight: UseCaseFeedback[] = {json.dumps(top_use_cases_light, indent=2, ensure_ascii=False)};
export const allLightCategories: CategoryFeedback[] = {json.dumps(all_categories_light, indent=2, ensure_ascii=False)};

// 获取指定产品类型的分类反馈数据
export function getCategoryFeedback(productType: ProductType = 'dimmer'): CategoryFeedbackData {{
  if (productType === 'dimmer') {{
    return {{
      summary: dimmerSwitchesSummary,
      topNegativeCategories: topNegativeDimmerCategories,
      topPositiveCategories: topPositiveDimmerCategories,
      topUseCases: topUseCasesDimmer,
      allCategories: allDimmerCategories
    }};
  }} else {{
    return {{
      summary: lightSwitchesSummary,
      topNegativeCategories: topNegativeLightCategories,
      topPositiveCategories: topPositiveLightCategories,
      topUseCases: topUseCasesLight,
      allCategories: allLightCategories
    }};
  }}
}}

// 获取Top N负面分类
export function getTopNegativeCategories(productType: ProductType = 'dimmer', limit: number = 10): CategoryFeedback[] {{
  const data = getCategoryFeedback(productType);
  return data.topNegativeCategories.slice(0, limit);
}}

// 获取Top N正面分类
export function getTopPositiveCategories(productType: ProductType = 'dimmer', limit: number = 10): CategoryFeedback[] {{
  const data = getCategoryFeedback(productType);
  return data.topPositiveCategories.slice(0, limit);
}}

// 获取Top N使用场景
export function getTopUseCases(productType: ProductType = 'dimmer', limit: number = 10): UseCaseFeedback[] {{
  const data = getCategoryFeedback(productType);
  return data.topUseCases.slice(0, limit);
}}

// 按分类类型筛选
export function getCategoriesByType(categoryType: 'Physical' | 'Performance', productType: ProductType = 'dimmer'): CategoryFeedback[] {{
  const data = getCategoryFeedback(productType);
  return data.allCategories.filter(cat => cat.categoryType === categoryType);
}}

// 获取所有可用的产品类型
export function getAvailableProductTypes(): {{ value: ProductType; label: string }}[] {{
  return [
    {{ value: 'dimmer', label: 'Dimmer Switches' }},
    {{ value: 'light', label: 'Light Switches' }}
  ];
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
        print("分析结果摘要 - 按产品类型分开（基于sentiment标记）")
        print("="*80)
        
        for product_type in ['dimmer', 'light']:
            product_name = 'Dimmer Switches' if product_type == 'dimmer' else 'Light Switches'
            summary = self.summary_stats_by_type[product_type]
            
            print(f"\n📊 {product_name}:")
            print(f"总分类数量: {summary['totalCategories']}")
            print(f"物理分类数量: {summary['physicalCategories']}")
            print(f"性能分类数量: {summary['performanceCategories']}")
            print(f"平均满意度: {summary['avgSatisfactionRate']}%")
            
            print(f"\nTop 10 负面分类 (按绝对负面评价数排序):")
            top_negative = self.get_top_negative_categories(product_type, 10)
            for i, cat in enumerate(top_negative, 1):
                print(f"{i:2d}. {cat['category']:<30} | 负面评价数: {cat['negativeCount']:3d} | 负面率: {cat['negativeRate']:5.1f}% | 总评价: {cat['totalReviews']:3d}")
            
            print(f"\nTop 10 正面分类 (按绝对正面评价数排序):")
            top_positive = self.get_top_positive_categories(product_type, 10)
            for i, cat in enumerate(top_positive, 1):
                print(f"{i:2d}. {cat['category']:<30} | 正面评价数: {cat['positiveCount']:3d} | 正面率: {cat['satisfactionRate']:5.1f}% | 总评价: {cat['totalReviews']:3d}")
            
            print("-" * 80)
        
        print("\n" + "="*80)
    
    def run(self, output_path: str):
        """运行完整的分析流程"""
        try:
            self.load_data()
            self.analyze_categories()
            self.analyze_use_cases()
            self.calculate_summary_stats()
            self.generate_typescript_file(output_path)
            self.print_analysis_summary()
            
            print(f"\n✅ 分析完成！数据已保存到: {output_path}")
            
        except Exception as e:
            print(f"\n❌ 分析过程中出现错误: {str(e)}")
            raise


def main():
    """主函数"""
    # 设置路径
    current_dir = Path(__file__).parent.parent.parent  # backend/
    data_dir = current_dir / "data/result/process_review/20250609_05"
    output_path = current_dir.parent / "frontend/lib/categoryFeedback.ts"  # frontend/lib/
    
    print("Category Feedback Analyzer - 按产品类型分开分析")
    print("="*70)
    print(f"数据目录: {data_dir}")
    print(f"输出文件: {output_path}")
    print()
    
    # 运行分析
    analyzer = CategoryFeedbackAnalyzer(str(data_dir))
    analyzer.run(str(output_path))


if __name__ == "__main__":
    main() 