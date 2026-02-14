# 脚本

在 Next.js 中加载第三方脚本。

## 使用 next/script

始终使用 `next/script` 而不是原生 `<script>` 标签以获得更好的性能。

```tsx
// 错误：原生 script 标签
<script src="https://example.com/script.js"></script>

// 正确：Next.js Script 组件
import Script from 'next/script'

<Script src="https://example.com/script.js" />
```

## 内联脚本需要 ID

内联脚本需要 `id` 属性以便 Next.js 跟踪它们。

```tsx
// 错误：缺少 id
<Script dangerouslySetInnerHTML={{ __html: 'console.log("hi")' }} />

// 正确：有 id
<Script id="my-script" dangerouslySetInnerHTML={{ __html: 'console.log("hi")' }} />

// 正确：带 id 的内联
<Script id="show-banner">
  {`document.getElementById('banner').classList.remove('hidden')`}
</Script>
```

## 不要将 Script 放在 Head 中

`next/script` 不应放在 `next/head` 内。它会处理自己的定位。

```tsx
// 错误：Script 在 Head 内
import Head from 'next/head'
import Script from 'next/script'

<Head>
  <Script src="/analytics.js" />
</Head>

// 正确：Script 在 Head 外
<Head>
  <title>页面</title>
</Head>
<Script src="/analytics.js" />
```

## 加载策略

```tsx
// afterInteractive（默认）- 页面交互后加载
<Script src="/analytics.js" strategy="afterInteractive" />

// lazyOnload - 在空闲时间加载
<Script src="/widget.js" strategy="lazyOnload" />

// beforeInteractive - 页面交互前加载（谨慎使用）
// 仅在 app/layout.tsx 或 pages/_document.js 中有效
<Script src="/critical.js" strategy="beforeInteractive" />

// worker - 在 web worker 中加载（实验性）
<Script src="/heavy.js" strategy="worker" />
```

## Google Analytics

使用 `@next/third-parties` 而不是内联 GA 脚本。

```tsx
// 错误：内联 GA 脚本
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX" />
<Script id="ga-init">
  {`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXX');`}
</Script>

// 正确：Next.js 组件
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXX" />
    </html>
  )
}
```

## Google Tag Manager

```tsx
import { GoogleTagManager } from '@next/third-parties/google'

export default function Layout({ children }) {
  return (
    <html>
      <GoogleTagManager gtmId="GTM-XXXXX" />
      <body>{children}</body>
    </html>
  )
}
```

## 其他第三方脚本

```tsx
// YouTube 嵌入
import { YouTubeEmbed } from '@next/third-parties/google'

<YouTubeEmbed videoid="dQw4w9WgXcQ" />

// Google Maps
import { GoogleMapsEmbed } from '@next/third-parties/google'

<GoogleMapsEmbed
  apiKey="YOUR_API_KEY"
  mode="place"
  q="Brooklyn+Bridge,New+York,NY"
/>
```

## 快速参考

| 模式 | 问题 | 修复 |
|---------|-------|-----|
| `<script src="...">` | 无优化 | 使用 `next/script` |
| `<Script>` 没有 id | 无法跟踪内联脚本 | 添加 `id` 属性 |
| `<Script>` 在 `<Head>` 内 | 错误的位置 | 移到 Head 外 |
| 内联 GA/GTM 脚本 | 无优化 | 使用 `@next/third-parties` |
| 布局外的 `strategy="beforeInteractive"` | 不起作用 | 仅在根布局中使用 |
