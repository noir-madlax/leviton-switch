# Leviton Switch Project

这是一个包含前端和后端的完整项目，由不同的开发者维护。

## 项目结构

```
leviton-demo/
├── frontend/              # Next.js 前端项目
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── styles/           # 样式文件
│   ├── public/           # 静态资源
│   ├── package.json      # 前端依赖配置
│   └── .gitignore        # 前端项目忽略规则
├── backend/              # Python 后端项目
│   ├── src/              # 源代码
│   ├── data/             # 数据文件
│   ├── requirements.txt  # 后端依赖配置
│   └── .gitignore        # 后端项目忽略规则
├── .gitignore            # 根目录忽略规则
└── README.md             # 项目说明文档
```

## 快速开始

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:3000 运行

### 后端开发

```bash
cd backend
pip install -r requirements.txt
# 根据后端具体的启动方式运行
```

## 开发说明

- 前端和后端项目分别维护各自的依赖和配置
- 每个子项目都有独立的 `.gitignore` 文件
- 开发时请在对应的子目录中进行

## 技术栈

- **前端**: Next.js, TypeScript, Tailwind CSS
- **后端**: Python

## 贡献指南

由于前端和后端是不同开发者维护的项目：
1. 前端相关修改请在 `frontend/` 目录中进行
2. 后端相关修改请在 `backend/` 目录中进行
3. 提交代码时请遵循各自项目的代码规范 