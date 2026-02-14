# 打包

修复第三方包的常见打包问题。

## 服务器不兼容的包

一些包使用浏览器 API（`window`、`document`、`localStorage`）并在服务器组件中失败。

### 错误迹象

```
ReferenceError: window is not defined
ReferenceError: document is not defined
ReferenceError: localStorage is not defined
Module not found: Can't resolve 'fs'
```

### 解决方案 1：标记为仅客户端

如果包仅在客户端需要：

```tsx
// 错误：失败 - 包使用 window
import SomeChart from 'some-chart-library'

export default function Page() {
  return <SomeChart />
}

// 正确：使用带 ssr: false 的动态导入
import dynamic from 'next/dynamic'

const SomeChart = dynamic(() => import('some-chart-library'), {
  ssr: false,
})

export default function Page() {
  return <SomeChart />
}
```

### 解决方案 2：从服务器包中外部化

对于应该在服务器上运行但有打包问题的包：

```js
// next.config.js
module.exports = {
  serverExternalPackages: ['problematic-package'],
}
```

用于：
- 带原生绑定的包（sharp、bcrypt）
- 打包不好的包（一些 ORM）
- 有循环依赖的包

### 解决方案 3：客户端组件包装器

将整个使用包装在客户端组件中：

```tsx
// components/ChartWrapper.tsx
'use client'

import { Chart } from 'chart-library'

export function ChartWrapper(props) {
  return <Chart {...props} />
}

// app/page.tsx（服务器组件）
import { ChartWrapper } from '@/components/ChartWrapper'

export default function Page() {
  return <ChartWrapper data={data} />
}
```

## CSS 导入

导入 CSS 文件而不是使用 `<link>` 标签。Next.js 处理打包和优化。

```tsx
// 错误：手动链接标签
<link rel="stylesheet" href="/styles.css" />

// 正确：导入 CSS
import './styles.css'

// 正确：CSS 模块
import styles from './Button.module.css'
```

## Polyfills

Next.js 自动包含常见的 polyfills。不要从 polyfill.io 或类似的 CDN 加载冗余的。

已包含：`Array.from`、`Object.assign`、`Promise`、`fetch`、`Map`、`Set`、`Symbol`、`URLSearchParams` 和 50 多个其他。

```tsx
// 错误：冗余的 polyfills
<script src="https://polyfill.io/v3/polyfill.min.js?features=fetch,Promise,Array.from" />

// 正确：Next.js 自动包含这些
```

## ESM/CommonJS 问题

### 错误迹象

```
SyntaxError: Cannot use import statement outside a module
Error: require() of ES Module
Module not found: ESM packages need to be imported
```

### 解决方案：转译包

```js
// next.config.js
module.exports = {
  transpilePackages: ['some-esm-package', 'another-package'],
}
```

## 常见问题包

| 包 | 问题 | 解决方案 |
|---------|-------|----------|
| `sharp` | 原生绑定 | `serverExternalPackages: ['sharp']` |
| `bcrypt` | 原生绑定 | `serverExternalPackages: ['bcrypt']` 或使用 `bcryptjs` |
| `canvas` | 原生绑定 | `serverExternalPackages: ['canvas']` |
| `recharts` | 使用 window | `dynamic(() => import('recharts'), { ssr: false })` |
| `react-quill` | 使用 document | `dynamic(() => import('react-quill'), { ssr: false })` |
| `mapbox-gl` | 使用 window | `dynamic(() => import('mapbox-gl'), { ssr: false })` |
| `monaco-editor` | 使用 window | `dynamic(() => import('@monaco-editor/react'), { ssr: false })` |
| `lottie-web` | 使用 document | `dynamic(() => import('lottie-react'), { ssr: false })` |

## 打包分析

使用内置分析器分析打包大小（Next.js 16.1+）：

```bash
next experimental-analyze
```

这会打开一个交互式 UI 来：
- 按路由、环境（客户端/服务器）和类型过滤
- 检查模块大小和导入链
- 查看树状图可视化

保存输出以进行比较：

```bash
next experimental-analyze --output
# 输出保存到 .next/diagnostics/analyze
```

参考：https://nextjs.org/docs/app/guides/package-bundling

## 从 Webpack 迁移到 Turbopack

Turbopack 是 Next.js 15+ 中的默认打包器。如果你有自定义 webpack 配置，请迁移到 Turbopack 兼容的替代方案：

```js
// next.config.js
module.exports = {
  // 正确：与 Turbopack 兼容
  serverExternalPackages: ['package'],
  transpilePackages: ['package'],

  // 错误：仅 Webpack - 从此迁移
  webpack: (config) => {
    // 自定义 webpack 配置
  },
}
```

参考：https://nextjs.org/docs/app/building-your-application/upgrading/from-webpack-to-turbopack
