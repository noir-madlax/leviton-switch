// Competitor Analysis Data - 6个竞争产品的痛点对比分析
// 数据来源: consolidated_aspect_categorization.json, expanded_review_results.json
// 生成时间: 2025-06-10 19:31:45
// 分析产品: Leviton D26HD, D215S, Lutron Caseta Diva, TP Link Switch, Leviton DSL06, Lutron Diva

export interface ProductPainPoint {
  product: string;                    // 产品名称
  category: string;                   // 分类名称
  categoryType: 'Physical' | 'Performance'; // 分类类型
  mentions: number;                   // 提及次数 (用于气泡大小)
  satisfactionRate: number;           // 满意度百分比 (用于颜色)
  positiveCount: number;              // 正面评价数
  negativeCount: number;              // 负面评价数
  totalReviews: number;               // 总评价数
}

export interface CompetitorAnalysisData {
  summary: {
    totalProducts: number;
    totalDataPoints: number;
    totalMentions: number;
    avgSatisfactionRate: number;
    processingDate: string;
    description: string;
  };
  matrixData: ProductPainPoint[];        // 完整矩阵数据
  physicalData: ProductPainPoint[];     // 物理特性数据
  performanceData: ProductPainPoint[];  // 性能特性数据
  targetProducts: string[];             // 目标产品列表
}

// 目标产品列表
export const targetProducts = [
  "Leviton D26HD",
  "Leviton D215S",
  "Lutron Caseta Diva",
  "TP Link Switch",
  "Leviton DSL06",
  "Lutron Diva"
];

// 汇总统计数据
export const competitorSummary = {
  "totalProducts": 6,
  "totalDataPoints": 229,
  "totalMentions": 714,
  "avgSatisfactionRate": 79.0,
  "processingDate": "2025-06-10T19:31:45.755701",
  "description": "6 product competitive pain points analysis"
};

// 完整痛点矩阵数据
export const competitorMatrixData: ProductPainPoint[] = [
  {
    "product": "Leviton D215S",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2
  },
  {
    "product": "Leviton D215S",
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 33.3,
    "positiveCount": 1,
    "negativeCount": 2,
    "totalReviews": 3
  },
  {
    "product": "Leviton D215S",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 78.6,
    "positiveCount": 11,
    "negativeCount": 3,
    "totalReviews": 14
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 100.0,
    "positiveCount": 6,
    "negativeCount": 0,
    "totalReviews": 6
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 88.9,
    "positiveCount": 8,
    "negativeCount": 1,
    "totalReviews": 9
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 4,
    "totalReviews": 4
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 6,
    "totalReviews": 6
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Electrical Wiring",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 7,
    "negativeCount": 0,
    "totalReviews": 7
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Indicator Lights",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2
  },
  {
    "product": "TP Link Switch",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "positiveCount": 5,
    "negativeCount": 0,
    "totalReviews": 5
  },
  {
    "product": "TP Link Switch",
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3
  },
  {
    "product": "TP Link Switch",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2
  },
  {
    "product": "TP Link Switch",
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1
  },
  {
    "product": "TP Link Switch",
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 75.0,
    "positiveCount": 3,
    "negativeCount": 1,
    "totalReviews": 4
  },
  {
    "product": "TP Link Switch",
    "category": "Electrical Wiring",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 66.7,
    "positiveCount": 2,
    "negativeCount": 1,
    "totalReviews": 3
  },
  {
    "product": "TP Link Switch",
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2
  },
  {
    "product": "TP Link Switch",
    "category": "Visual Indicator Lights",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 80.0,
    "positiveCount": 4,
    "negativeCount": 1,
    "totalReviews": 5
  },
  {
    "product": "TP Link Switch",
    "category": "Tactile and Audio Feedback",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2
  },
  {
    "product": "Lutron Diva",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1
  },
  {
    "product": "Lutron Diva",
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 46.2,
    "positiveCount": 6,
    "negativeCount": 7,
    "totalReviews": 13
  },
  {
    "product": "Lutron Diva",
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4
  },
  {
    "product": "Lutron Diva",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 7,
    "totalReviews": 7
  },
  {
    "product": "Lutron Diva",
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 6,
    "totalReviews": 6
  },
  {
    "product": "Lutron Diva",
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1
  },
  {
    "product": "Lutron Diva",
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3
  },
  {
    "product": "Lutron Diva",
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 85.7,
    "positiveCount": 6,
    "negativeCount": 1,
    "totalReviews": 7
  },
  {
    "product": "Lutron Diva",
    "category": "Tactile and Audio Feedback",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 28.6,
    "positiveCount": 2,
    "negativeCount": 5,
    "totalReviews": 7
  },
  {
    "product": "Lutron Diva",
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 5,
    "totalReviews": 5
  },
  {
    "product": "Lutron Diva",
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 25.0,
    "positiveCount": 1,
    "negativeCount": 3,
    "totalReviews": 4
  }
];

// 物理特性痛点数据
export const physicalPainPoints: ProductPainPoint[] = [
  {
    "product": "Leviton D215S",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2
  },
  {
    "product": "Leviton D215S",
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 33.3,
    "positiveCount": 1,
    "negativeCount": 2,
    "totalReviews": 3
  },
  {
    "product": "Leviton D215S",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 78.6,
    "positiveCount": 11,
    "negativeCount": 3,
    "totalReviews": 14
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 100.0,
    "positiveCount": 6,
    "negativeCount": 0,
    "totalReviews": 6
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 88.9,
    "positiveCount": 8,
    "negativeCount": 1,
    "totalReviews": 9
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 4,
    "totalReviews": 4
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 6,
    "totalReviews": 6
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Electrical Wiring",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 7,
    "negativeCount": 0,
    "totalReviews": 7
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Visual Indicator Lights",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2
  },
  {
    "product": "Lutron Caseta Diva",
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2
  },
  {
    "product": "TP Link Switch",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "positiveCount": 5,
    "negativeCount": 0,
    "totalReviews": 5
  },
  {
    "product": "TP Link Switch",
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3
  },
  {
    "product": "TP Link Switch",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2
  },
  {
    "product": "TP Link Switch",
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1
  },
  {
    "product": "TP Link Switch",
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 75.0,
    "positiveCount": 3,
    "negativeCount": 1,
    "totalReviews": 4
  },
  {
    "product": "TP Link Switch",
    "category": "Electrical Wiring",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 66.7,
    "positiveCount": 2,
    "negativeCount": 1,
    "totalReviews": 3
  },
  {
    "product": "TP Link Switch",
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2
  },
  {
    "product": "TP Link Switch",
    "category": "Visual Indicator Lights",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 80.0,
    "positiveCount": 4,
    "negativeCount": 1,
    "totalReviews": 5
  },
  {
    "product": "TP Link Switch",
    "category": "Tactile and Audio Feedback",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2
  },
  {
    "product": "Lutron Diva",
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1
  },
  {
    "product": "Lutron Diva",
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 46.2,
    "positiveCount": 6,
    "negativeCount": 7,
    "totalReviews": 13
  },
  {
    "product": "Lutron Diva",
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4
  },
  {
    "product": "Lutron Diva",
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 7,
    "totalReviews": 7
  },
  {
    "product": "Lutron Diva",
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 6,
    "totalReviews": 6
  },
  {
    "product": "Lutron Diva",
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1
  },
  {
    "product": "Lutron Diva",
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3
  },
  {
    "product": "Lutron Diva",
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 85.7,
    "positiveCount": 6,
    "negativeCount": 1,
    "totalReviews": 7
  },
  {
    "product": "Lutron Diva",
    "category": "Tactile and Audio Feedback",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 28.6,
    "positiveCount": 2,
    "negativeCount": 5,
    "totalReviews": 7
  },
  {
    "product": "Lutron Diva",
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "positiveCount": 0,
    "negativeCount": 5,
    "totalReviews": 5
  },
  {
    "product": "Lutron Diva",
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 25.0,
    "positiveCount": 1,
    "negativeCount": 3,
    "totalReviews": 4
  }
];

// 性能特性痛点数据
export const performancePainPoints: ProductPainPoint[] = [];

// 获取竞争品分析数据
export function getCompetitorAnalysisData(): CompetitorAnalysisData {
  return {
    summary: competitorSummary,
    matrixData: competitorMatrixData,
    physicalData: physicalPainPoints,
    performanceData: performancePainPoints,
    targetProducts: targetProducts
  };
}

// 获取指定产品的痛点数据
export function getProductPainPoints(productName: string): ProductPainPoint[] {
  return competitorMatrixData.filter(item => item.product === productName);
}

// 获取指定分类的所有产品数据
export function getCategoryComparisonData(categoryName: string): ProductPainPoint[] {
  return competitorMatrixData.filter(item => item.category === categoryName);
}

// 获取所有分类列表
export function getAllCategories(): string[] {
  const categories = new Set(competitorMatrixData.map(item => item.category));
  return Array.from(categories).sort();
}

// 获取按分类类型筛选的数据
export function getDataByType(categoryType: 'Physical' | 'Performance'): ProductPainPoint[] {
  return competitorMatrixData.filter(item => item.categoryType === categoryType);
}

// 计算满意度颜色映射 (用于气泡图颜色)
export function getSatisfactionColor(satisfactionRate: number): string {
  if (satisfactionRate >= 80) return '#22c55e';      // 绿色 - 高满意度
  else if (satisfactionRate >= 60) return '#eab308'; // 黄色 - 中等满意度
  else if (satisfactionRate >= 40) return '#f97316'; // 橙色 - 较低满意度
  else return '#ef4444';                              // 红色 - 低满意度
}

// 计算气泡大小映射
export function getBubbleSize(mentions: number, maxMentions: number): number {
  const minSize = 10;
  const maxSize = 50;
  const normalizedSize = (mentions / maxMentions) * (maxSize - minSize) + minSize;
  return Math.max(minSize, Math.min(maxSize, normalizedSize));
}
