# WZY Blog

基于 Astro 和 GitHub Pages 的个人博客。

## 项目结构

```text
/
├─ .github/workflows/deploy.yml  GitHub Pages 自动部署
├─ public/                       原样发布的静态资源
├─ src/
│  ├─ components/                公共组件
│  ├─ content/blog/              Markdown/MDX 文章
│  ├─ layouts/                   页面和文章布局
│  ├─ pages/                     文件路由
│  ├─ styles/                    全局样式
│  ├─ utils/                     文章、路径和日期工具
│  ├─ consts.ts                  站点常量
│  └─ content.config.ts          内容集合 schema
├─ astro.config.mjs              Astro 配置
└─ package.json
```

## 常用命令

```sh
npm install
npm run dev
npm run build
npm run preview
```

Windows PowerShell 如果拦截 `npm.ps1`，可以使用：

```sh
npm.cmd run dev
npm.cmd run build
```

## 写文章

在 `src/content/blog/` 下新增 Markdown 文件：

```md
---
title: 文章标题
description: 文章摘要
pubDate: 2026-05-04
tags:
  - Astro
  - 博客
featured: false
draft: false
---

正文内容。
```

`draft: true` 的文章不会出现在构建结果中。
