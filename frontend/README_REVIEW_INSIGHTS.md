# Review Insights 功能说明

## 概述
Review Insights 是一个新添加的分析页面，基于开关产品的用户评论数据，提供三个核心维度的可视化分析：

1. **Customer Pain Points** - 客户痛点分析
2. **Customer Likes** - 客户喜欢的特点
3. **Underserved Use Cases** - 未满足的用例需求

## 功能特点

### 1. 痛点散点图 (Pain Points Scatter Chart)
- **X轴**: 问题严重程度 (1-5分)
- **Y轴**: 评论提及频次
- **气泡大小**: 影响的产品数量
- **颜色区分**: 
  - 🔴 红色: Physical Issues (物理问题)
  - 🟠 橙色: Performance Issues (性能问题) 
  - 🔴 深红: Usability Issues (易用性问题)

### 2. 客户喜欢特点柱状图 (Customer Likes Bar Chart)
- **X轴**: 功能特性
- **Y轴**: 正面提及频次
- **颜色编码**:
  - 🟢 绿色: High Satisfaction (高满意度)
  - 🟡 黄色: Medium Satisfaction (中等满意度)
  - ⚪ 灰色: Low Satisfaction (低满意度)

### 3. 未满足需求热力图 (Underserved Use Cases Heatmap)
- **行**: 用例类别
- **列**: 产品属性
- **颜色强度**: 需求缺口程度 (红色越深=缺口越大)
- **数值显示**: 百分比和提及次数

## 数据结构

### Pain Points (客户痛点)
```typescript
interface PainPoint {
  aspect: string;           // 问题方面
  category: string;         // 分类
  severity: number;         // 严重程度 (1-5)
  frequency: number;        // 提及频次
  impactedProducts: number; // 影响的产品数量
  type: 'Physical' | 'Performance' | 'Usability';
}
```

### Customer Likes (客户喜欢的特点)
```typescript
interface CustomerLike {
  feature: string;          // 功能特性
  category: string;         // 分类
  frequency: number;        // 正面提及频次
  satisfactionLevel: 'High' | 'Medium' | 'Low';
}
```

### Underserved Use Cases (未满足用例)
```typescript
interface UnderservedUseCase {
  useCase: string;          // 用例名称
  productAttribute: string; // 产品属性
  gapLevel: number;         // 需求缺口程度 (0-100)
  mentionCount: number;     // 提及次数
}
```

## 文件结构

```
frontend/
├── lib/
│   └── reviewInsights.ts          # 数据定义和接口
├── components/
│   ├── review-insights.tsx        # 主组件
│   └── charts/
│       ├── pain-points-scatter.tsx    # 痛点散点图
│       ├── customer-likes-bar.tsx     # 客户喜欢柱状图
│       └── underserved-heatmap.tsx    # 未满足需求热力图
└── app/
    └── page.tsx                   # 主页面 (添加了tab导航)
```

## 关键洞察

### 当前发现的主要痛点:
1. **LED闪烁问题** - 198次提及，严重程度4.5
2. **WiFi连接稳定性** - 234次提及，影响52个产品
3. **安装复杂性** - 156次提及，严重程度4.2

### 最受欢迎的特点:
1. **智能家居集成** - 445次正面提及
2. **调光性能** - 378次正面提及  
3. **易于安装** - 312次正面提及

### 最大市场机会:
1. **电池备份功能** - 91%需求缺口
2. **能耗监控** - 89%需求缺口
3. **户外应用** - 85%需求缺口

## 技术实现

- **前端框架**: Next.js 15 + React 19
- **图表库**: Recharts
- **样式**: Tailwind CSS
- **UI组件**: Radix UI
- **类型支持**: TypeScript

## 使用方法

1. 启动开发服务器: `npm run dev`
2. 访问主页面，点击 "Review Insights" 标签页
3. 查看三个图表和分析建议
4. 可以悬停在图表元素上查看详细信息

## 数据来源

数据基于 `consolidated_aspect_categorization.json` 和 `aspect_category_definitions.json` 文件中的开关产品评论分析结果。所有数字都反映了真实的用户反馈统计。 