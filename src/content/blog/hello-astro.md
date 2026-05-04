---
title: 开始使用 Astro 写博客
description: 从这个示例开始，了解博客文章的 frontmatter、标签和页面生成方式。
pubDate: 2026-05-03
tags:
  - Astro
  - 博客
featured: true
draft: true
---

这是第一篇示例文章。你可以在 `src/content/blog` 目录中继续添加 Markdown 文件，每个文件都会变成一篇独立的博客文章。

## 文章元数据

每篇文章顶部的 frontmatter 会被 `src/content.config.ts` 校验。常用字段包括：

- `title`：文章标题。
- `description`：文章摘要，用于列表和页面描述。
- `pubDate`：发布时间。
- `tags`：标签列表。
- `draft`：设为 `true` 后不会发布。

## 下一步

把这个文件复制一份，改成自己的标题和内容，就可以开始写第一篇正式文章。
