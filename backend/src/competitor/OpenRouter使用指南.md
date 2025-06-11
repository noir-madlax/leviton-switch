# OpenRouter使用指南

## 🎯 概述

**无需修改任何原有代码**，通过环境变量即可切换到OpenRouter。

## 🚀 使用方法：环境变量切换

### 步骤1：确认.env文件配置

**文件位置：** `/Users/rigel/project/leviton/leviton-switch-demo-0611/backend/.env`

**文件内容示例：**
```env
# OpenRouter配置
OPENROUTER_API_KEY=你的OpenRouter密钥
USE_OPENROUTER=true
OPENROUTER_MODEL=anthropic/claude-sonnet-4-20250514

# Apify配置（用于爬取评论）
APIFY_API_TOKEN=你的Apify密钥
```

### 步骤2：加载环境变量

```bash
# 进入backend目录
cd /Users/rigel/project/leviton/leviton-switch-demo-0611/backend

# 加载环境变量
source .env

# 验证环境变量已设置
echo $USE_OPENROUTER
echo $OPENROUTER_API_KEY
```

### 步骤3：运行脚本

```bash
# 进入脚本目录
cd /Users/rigel/project/leviton/leviton-switch-demo-0611/backend/src/competitor

# 运行脚本
python3 final_assign_aspects_only.py
```

## 🔑 API密钥申请方法

### Apify API密钥

1. 访问 [https://console.apify.com/](https://console.apify.com/)
2. 注册账户并登录
3. 进入 **Integrations** 页面
4. 找到 **API tokens** 部分，复制你的API token
5. Apify用于爬取Amazon/Home Depot的评论数据

## ✅ 验证切换成功

运行脚本时，如果看到以下输出说明切换成功：

```
🔀 使用OpenRouter作为LLM提供商
✅ 成功切换到OpenRouter！
```
