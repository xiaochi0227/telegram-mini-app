# Telegram Mini App

这是一个基于 Vue 3 + TypeScript + Vant UI 的 Telegram Mini App 项目。

## 功能特性

- 使用 Vue 3 + TypeScript 开发
- 集成 Vant UI 组件库
- 支持 Telegram WebApp 原生功能
- 响应式设计，适配移动端
- 主题跟随 Telegram 客户端
- 用户认证和授权
- 路由管理
- 状态管理

## 开发环境要求

- Node.js >= 16
- npm >= 7

## 安装和运行

1. 安装依赖：

```bash
npm install
```

2. 开发环境运行：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build
```

## 项目结构

```
src/
  ├── api/          # API 请求
  ├── components/   # 公共组件
  ├── views/        # 页面组件
  ├── store/        # Vuex 状态管理
  ├── router/       # 路由配置
  ├── utils/        # 工具函数
  ├── types/        # TypeScript 类型定义
  ├── App.vue       # 根组件
  └── main.ts       # 入口文件
```

## 环境变量

在项目根目录创建 `.env` 文件：

```
VITE_API_BASE_URL=你的API地址
```

## 使用说明

1. 在 Telegram 中打开 Mini App
2. 点击 "Login with Telegram" 按钮进行登录
3. 登录后可以查看个人信息
4. 可以随时退出登录

## 注意事项

- 确保在 Telegram 客户端中打开
- 需要配置正确的 API 地址
- 需要配置正确的 Telegram Bot Token

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支
3. 提交你的更改
4. 推送到分支
5. 创建一个 Pull Request

## 许可证

MIT
