# Backend 数据处理流程说明

这个系统的目标：分析Amazon上开关产品的用户评论，找出用户最关心什么问题，哪些产品表现好，哪些不好。

## 整体流程概览

```
1. 爬产品信息 → 2. 构建产品分类词典+分配 → 3. 爬用户评论 → 4. 提取评论结构化数据 → 5. 构建评论分类词典+分配 → 6. 分析分类反馈 → 7. 竞争对手分析 → 8. 生成前端数据
```

## 核心逻辑：先构建分类词典，再分配原始数据

所有分类步骤都遵循相同的模式：
1. **全量读取原始数据**（产品标题 or 评论内容）
2. **AI构建分类词典**（创建标准化分类体系）
3. **分配原始数据**（把每个原始项目分到对应分类）
4. **优化分配结果**（必要时调整分配）

---

## 详细步骤说明

### 第1步：爬产品信息
**脚本**：`src/competitor/scrape_best_sellers.py`
**任务**：从Amazon和Home Depot爬取开关产品的基本信息
**输入**：网站类别列表（比如"Dimmer Switches"分类）
**输出**：
- `data/scraped/amazon/products/*.json` - Amazon产品数据
- `data/scraped/home_depot/products/*.json` - Home Depot产品数据

### 第2步：产品分类（4个小步骤）
**脚本**：`src/competitor/segment_products.py`
**核心逻辑**：先构建产品分类词典，再把每个产品分配到分类

#### 第2.1步：读取所有产品标题
**输入文件**：`data/processed/combined_products_cleaned.csv`
**原始数据示例**：
```csv
title,brand,price_usd
"Leviton SureSlide Dimmer Switch for Dimmable LED, Halogen and Incandescent Bulbs",Leviton,14.07
"Lutron Caseta Smart Dimmer Switch",Lutron,46.95
"GE Toggle Switch Single Pole",GE,3.29
```

#### 第2.2步：AI构建产品分类词典
**Prompt文件**：`prompt/product_segment/extract_taxonomy_prompt_v0.txt`
**AI任务**：分析所有产品标题，创建标准化的产品分类体系
**AI输出的分类词典示例**：
```json
{
  "Dimmer Switches": {
    "definition": "可调光开关，支持调节亮度",
    "characteristics": ["dimmer", "调光", "brightness"]
  },
  "Smart Switches": {
    "definition": "智能开关，支持APP控制或语音控制", 
    "characteristics": ["smart", "wifi", "app", "alexa"]
  },
  "Toggle Switches": {
    "definition": "传统拨动开关",
    "characteristics": ["toggle", "single pole", "traditional"]
  }
}
```

#### 第2.3步：合并相似分类
**Prompt文件**：`prompt/product_segment/consolidate_taxonomy_prompt_v0.txt`
**AI任务**：把相似的分类合并，避免重复
**处理示例**：
```
输入：{"智能调光开关": {...}, "Smart Dimmer": {...}, "调光开关": {...}}
输出：{"Smart Dimmer Switches": {...}}  // 合并后的统一分类
```

#### 第2.4步：把产品分配到最终分类
**Prompt文件**：`prompt/product_segment/refine_assignments_prompt_v0.txt`
**AI任务**：把每个产品分配到最合适的分类
**分配示例**：
```
输入产品："Leviton SureSlide Dimmer Switch for Dimmable LED"
输入分类：Smart Dimmer Switches, Toggle Switches, Smart Switches
AI输出：Smart Dimmer Switches  // 最合适的分类
```

#### 第2步最终输出
**文件**：`data/result/product_segment/combined_products_cleaned/combined_products_with_final_categories.csv`
**新增字段**：`product_segment` - 每个产品的标准化分类
```csv
title,brand,price_usd,product_segment
"Leviton SureSlide Dimmer Switch...",Leviton,14.07,Smart Dimmer Switches
"Lutron Caseta Smart Dimmer Switch",Lutron,46.95,Smart Dimmer Switches  
"GE Toggle Switch Single Pole",GE,3.29,Toggle Switches
```

---

### 第3步：爬用户评论
**脚本**：`src/competitor/scrape_reviews.py`
**任务**：使用Apify API爬取Amazon产品评论
**输入**：产品ASIN列表（从第2步的CSV文件中提取）
**配置**：每个产品最多5页评论，只抓取已验证购买的评论
**输出**：`data/scraped/amazon/review/{ASIN}_*.json` - 每个产品的评论数据

---

### 第4步：评论结构化提取
**脚本**：`src/competitor/process_reviews.py`
**任务**：把自然语言评论转换为结构化数据，提取用户关心的问题

#### 输入文件
1. **评论JSON文件**：`data/scraped/amazon/review/`
2. **产品分类CSV**：`data/result/product_segment/combined_products_cleaned/combined_products_with_final_categories.csv`

**为什么需要产品分类CSV**：
- 为每个ASIN匹配对应的产品分类（从`product_segment`列）
- 在AI提取时提供产品上下文，如"Smart Dimmer Switches"而不是具体产品标题
- 确保提取的问题与产品类型相关

#### AI处理过程
**Prompt文件**：`prompt/extract_review_hierarchy_v0.txt`
**AI任务**：从评论中提取用户关心的三大类问题

**三大类设计原理**（人工预设的框架）：
- **物理特性(phy)**：产品本身的物理属性，不涉及使用
  - 包括：外观、尺寸、材质、颜色、重量等
  - 例如："按钮是金属的"、"开关很厚重"、"颜色很漂亮"

- **性能表现(perf)**：产品在各种条件下的表现和功能
  - 包括：耐用性、响应速度、稳定性、兼容性等
  - 例如："开关很灵敏"、"用了2年还很好"、"支持LED灯"

- **使用场景(use)**：产品的具体应用场景和使用方法
  - 包括：安装位置、适用环境、使用方式等
  - 例如："适合厨房使用"、"安装简单"、"配3路开关"

**为什么是这3类**：
1. **覆盖产品评价的全部维度**：用户评价产品时，无外乎说产品长什么样（物理）、好不好用（性能）、适合什么场景（使用）
2. **符合产品分析逻辑**：这个分类方法适用于几乎所有实体产品的分析
3. **便于后续分析**：这种分类让AI能建立因果关系，比如"因为按钮是金属的(phy)，所以按起来很舒服(perf)，适合高频使用场景(use)"

#### 处理示例
**输入评论**：
```
"This dimmer switch has a great feel to the buttons and looks very modern. Installation was a bit tricky but works perfectly with LED lights."
```

**AI输出结构化数据**：
```json
{
  "B0076HPM8A": {
    "phy": {
      "Button Interface": {"A@按钮手感舒适": {"+": [1,3,5]}},
      "Visual Appearance": {"B@外观现代": {"+": [1]}}
    },
    "perf": {
      "LED Compatibility": {"a@支持LED灯": {"+": [1]}}
    },
    "use": {
      "Installation": {"+": {"安装有点复杂": [1]}}
    }
  }
}
```

#### 第4步输出文件
**文件**：`data/result/process_review/{日期}/expanded_review_results.json` (16MB)
**内容**：500多个产品，每个产品包含phy、perf、use三类结构化问题

---

### 第5步：评论问题分类（4个小步骤）
**脚本**：`src/competitor/categorize_review_aspects.py`
**核心逻辑**：先构建评论分类词典，再把每个问题分配到分类（与第2步逻辑相同）

#### 第5.1步：提取所有问题点
**输入**：第4步的复杂嵌套JSON
**任务**：从复杂结构中提取出所有用户提到的问题，给每个问题一个编号
**处理示例**：
```
从复杂数据：
"Button Interface": {"A@按钮手感舒适": {"+": [1,3,5]}}

提取成简单列表：
[1] Button Interface: 按钮手感舒适 (来自产品B0076HPM8A)
[2] Button Interface: 按钮难按 (来自产品B002DN8CQ6)  
[3] Visual Appearance: 外观现代 (来自产品B0076HPM8A)
... 总共提取出2000+个问题点
```

#### 第5.2步：AI构建评论分类词典
**Prompt文件**：`prompt/categorize_review_aspects_prompt_v0.txt`
**AI任务**：分析所有2000+个问题，创建有商业价值的分类体系

**关键：AI是一次性看所有问题，直接创建完整的分类词典**

**AI输出的分类词典示例**：
```json
{
  "Button Interface": {
    "definition": "用户与物理按钮的交互体验，包括按压感受、触觉反馈，e.g. 按钮手感、按压力度、按钮布局"
  },
  "Installation": {
    "definition": "产品安装过程的难易程度和兼容性，e.g. 安装步骤、兼容性问题、所需工具"
  },
  "Overall Performance": {
    "definition": "产品整体功能表现和可靠性，e.g. 工作稳定性、响应速度、耐用性"
  },
  "Visual Appearance": {
    "definition": "产品的视觉设计和美学效果，e.g. 外观风格、颜色搭配、设计感"
  }
}
```

**AI分类的智能之处**：
- **语义理解**：AI知道"按钮手感舒适"和"按钮难按"都属于按钮交互问题
- **业务思维**：AI创建的分类都有商业价值，比如"Button Interface"对产品团队很有用
- **命名规范**：AI用英文命名，便于后续编程处理

#### 第5.3步：合并相似分类
**Prompt文件**：`prompt/consolidate_aspect_categories_prompt_v0.txt`
**为什么需要**：因为数据量大，AI分批处理，不同批次可能产生相似分类
**处理示例**：
```
输入多个批次的分类：
批次A: {"按钮操作体验": {...}, "产品外观设计": {...}}
批次B: {"物理按钮交互": {...}, "视觉美观程度": {...}}

AI发现相似性，合并输出：
{
  "Button Interface": {  // 合并了"按钮操作体验"和"物理按钮交互"
    "definition": "用户与物理按钮的交互体验",
    "merged_from": ["批次A:按钮操作体验", "批次B:物理按钮交互"]
  },
  "Visual Appearance": {  // 合并了"产品外观设计"和"视觉美观程度"  
    "definition": "产品的视觉设计和美学效果",
    "merged_from": ["批次A:产品外观设计", "批次B:视觉美观程度"]
  }
}
```

#### 第5.4步：把问题分配到最终分类
**Prompt文件**：`prompt/final_assign_aspects_prompt_v0.txt`
**AI任务**：把每个具体问题分配到最合适的分类
**分配示例**：
```
输入最终分类词典：
C_0: Button Interface - 按钮交互体验
C_1: Visual Appearance - 外观设计美观
C_2: Installation - 安装使用便利

输入具体问题：
[1] 按钮手感舒适
[2] 外观现代
[3] 安装复杂

AI分配输出：
{
  "1": "C_0",  // 按钮手感 → 按钮交互体验
  "2": "C_1",  // 外观现代 → 外观设计美观
  "3": "C_2"   // 安装复杂 → 安装使用便利
}
```

#### 第5步最终输出
1. **`aspect_category_definitions.json` (103KB)** - 最终分类定义
```json
{
  "category_definitions": {
    "physical_categories": {
      "Button Interface": {
        "definition": "用户与物理按钮的交互体验，包括按压感受、触觉反馈，e.g. 按钮手感、按压力度、按钮布局"
      }
    },
    "performance_categories": {
      "Overall Performance": {
        "definition": "产品整体功能表现和可靠性，e.g. 工作稳定性、响应速度、耐用性"
      }
    },
    "use_categories": {
      "Installation": {
        "definition": "产品安装过程的难易程度和兼容性，e.g. 安装步骤、兼容性问题、所需工具"
      }
    }
  }
}
```

2. **`consolidated_aspect_categorization.json` (961KB)** - 问题到分类的映射
```json
{
  "B0076HPM8A": {
    "A@按钮手感舒适": "Button Interface",
    "B@外观现代": "Visual Appearance",
    "a@支持LED灯": "Overall Performance"
  }
}
```

---

### 第6步：分析分类反馈
**脚本**：`src/competitor/category_feedback_analyzer.py`
**任务**：统计每个分类下用户满意度，找出痛点
**输入**：第5步的分类结果和评论数据
**功能**：
- 计算每个分类的正面/负面评论比例
- 找出用户最不满意的问题
- 按产品类型分析差异
**输出**：`frontend/lib/categoryFeedback.ts` - 反馈分析数据

### 第7步：竞争对手分析
**脚本**：`src/competitor/competitor_analysis.py`
**任务**：重点分析6个目标竞争对手产品的表现
**目标产品**：Leviton D26HD, D215S, DSL06; Lutron Caseta Diva, Diva; TP Link Switch
**功能**：
- 生成产品vs问题分类的对比矩阵
- 计算相对满意度排名
- 找出每个产品的优势和劣势
**输出**：`frontend/lib/competitorAnalysis.ts` - 竞争对手对比数据

### 第8步：生成前端展示数据
**脚本**：`generate_review_data.py`
**任务**：为前端界面准备详细的评论数据
**功能**：
- 提取每个分类下的具体评论原文
- 支持前端点击查看详情功能
**输出**：`frontend/lib/reviewData.ts` - 详细评论数据

---

## 🎯 从混乱到有序：整个系统的价值

### 处理前的混乱状态
```
- 产品A: "按钮手感好"、"颜色不错"、"安装麻烦"
- 产品B: "按钮难按"、"外观现代"、"接线复杂"  
- 产品C: "操作方便"、"设计简洁"、"说明不清"
... 每个产品都有不同的问题描述，无法比较
```

### 处理后的有序结果
```json
{
  "standardized_categories": {
    "Button Interface": "按钮交互体验分类",
    "Visual Appearance": "外观设计分类", 
    "Installation": "安装体验分类"
  },
  "competitive_analysis": {
    "产品A": {"Button Interface": 4.2, "Visual Appearance": 4.0, "Installation": 2.1},
    "产品B": {"Button Interface": 2.8, "Visual Appearance": 4.5, "Installation": 2.3},
    "产品C": {"Button Interface": 4.0, "Visual Appearance": 4.3, "Installation": 2.0}
  }
}
```

**现在可以清楚地得出结论**：
- 产品A的按钮体验最好(4.2)
- 产品B的外观最佳(4.5)
- 所有产品的安装体验都不理想(都在2.0-2.3)

---

## 运行顺序
1. `scrape_best_sellers.py` (爬产品信息)
2. `segment_products.py` (产品分类)  
3. `scrape_reviews.py` (爬评论)
4. `process_reviews.py` (评论结构化)
5. `categorize_review_aspects.py` (评论分类)
6. `category_feedback_analyzer.py` (分析反馈)
7. `competitor_analysis.py` (竞争对手分析)
8. `generate_review_data.py` (生成前端数据)

## 文件结构
```
backend/
├── src/competitor/          # 处理脚本
├── prompt/                  # AI提示词
├── data/                    # 数据目录
│   ├── scraped/            # 爬取的原始数据
│   └── result/             # 处理后的结果
└── frontend/lib/           # 前端数据文件
```

## 重要配置
- 每个产品最多爬取5页评论
- AI模型：Claude Sonnet 4
- 评论只包含已验证购买
- 目标：6个竞争对手产品的详细分析