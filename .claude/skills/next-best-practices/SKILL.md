---
name: next-best-practices
version: 1.0.0
description: Next.js 最佳实践 - 文件约定、RSC 边界、数据模式、异步 API、元数据、错误处理、路由处理器、图像/字体优化、打包
user-invocable: true
---

# Next.js 最佳实践

在编写或审查 Next.js 代码时应用这些规则。

## 文件约定

参见 [file-conventions.md](./file-conventions.md)：
- 项目结构和特殊文件
- 路由段（动态、捕获所有、分组）
- 并行和拦截路由
- 中间件在 v16 中重命名（middleware → proxy）

## RSC 边界

检测无效的 React 服务器组件模式。

参见 [rsc-boundaries.md](./rsc-boundaries.md)：
- 异步客户端组件检测（无效）
- 不可序列化的 props 检测
- Server Action 异常

## 异步模式

Next.js 15+ 异步 API 变更。

参见 [async-patterns.md](./async-patterns.md)：
- 异步 `params` 和 `searchParams`
- 异步 `cookies()` 和 `headers()`
- 迁移 codemod

## 运行时选择

参见 [runtime-selection.md](./runtime-selection.md)：
- 默认使用 Node.js 运行时
- 何时适合使用 Edge 运行时

## 指令

参见 [directives.md](./directives.md)：
- `'use client'`、`'use server'`（React）
- `'use cache'`（Next.js）

## 函数

参见 [functions.md](./functions.md)：
- 导航钩子：`useRouter`、`usePathname`、`useSearchParams`、`useParams`
- 服务器函数：`cookies`、`headers`、`draftMode`、`after`
- 生成函数：`generateStaticParams`、`generateMetadata`

## 错误处理

参见 [error-handling.md](./error-handling.md)：
- `error.tsx`、`global-error.tsx`、`not-found.tsx`
- `redirect`、`permanentRedirect`、`notFound`
- `forbidden`、`unauthorized`（认证错误）
- `unstable_rethrow` 用于 catch 块

## 数据模式

参见 [data-patterns.md](./data-patterns.md)：
- 服务器组件 vs Server Actions vs 路由处理器
- 避免数据瀑布（`Promise.all`、Suspense、preload）
- 客户端组件数据获取

## 路由处理器

参见 [route-handlers.md](./route-handlers.md)：
- `route.ts` 基础
- GET 处理器与 `page.tsx` 冲突
- 环境行为（无 React DOM）
- 何时使用 vs Server Actions

## 元数据和 OG 图像

参见 [metadata.md](./metadata.md)：
- 静态和动态元数据
- `generateMetadata` 函数
- 使用 `next/og` 生成 OG 图像
- 基于文件的元数据约定

## 图像优化

参见 [image.md](./image.md)：
- 始终使用 `next/image` 而不是 `<img>`
- 远程图像配置
- 响应式 `sizes` 属性
- 模糊占位符
- LCP 的优先加载

## 字体优化

参见 [font.md](./font.md)：
- `next/font` 设置
- Google Fonts、本地字体
- Tailwind CSS 集成
- 预加载子集

## 打包

参见 [bundling.md](./bundling.md)：
- 服务器不兼容的包
- CSS 导入（不是 link 标签）
- Polyfills（已包含）
- ESM/CommonJS 问题
- 打包分析

## 脚本

参见 [scripts.md](./scripts.md)：
- `next/script` vs 原生 script 标签
- 内联脚本需要 `id`
- 加载策略
- 使用 `@next/third-parties` 的 Google Analytics

## 水合错误

参见 [hydration-error.md](./hydration-error.md)：
- 常见原因（浏览器 API、日期、无效 HTML）
- 使用错误覆盖层调试
- 每种原因的修复方法

## Suspense 边界

参见 [suspense-boundaries.md](./suspense-boundaries.md)：
- 使用 `useSearchParams` 和 `usePathname` 的 CSR 退出
- 哪些钩子需要 Suspense 边界

## 并行和拦截路由

参见 [parallel-routes.md](./parallel-routes.md)：
- 使用 `@slot` 和 `(.)` 拦截器的模态模式
- `default.tsx` 用于回退
- 使用 `router.back()` 正确关闭模态

## 自托管

参见 [self-hosting.md](./self-hosting.md)：
- Docker 的 `output: 'standalone'`
- 多实例 ISR 的缓存处理器
- 什么有效 vs 需要额外设置

## 调试技巧

参见 [debug-tricks.md](./debug-tricks.md)：
- 用于 AI 辅助调试的 MCP 端点
- 使用 `--debug-build-paths` 重建特定路由
