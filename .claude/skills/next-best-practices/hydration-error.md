# 水合错误

诊断和修复 React 水合不匹配错误。

## 错误迹象

- "Hydration failed because the initial UI does not match"（水合失败，因为初始 UI 不匹配）
- "Text content does not match server-rendered HTML"（文本内容与服务器渲染的 HTML 不匹配）

## 调试

在开发环境中，点击水合错误以查看服务器/客户端差异。

## 常见原因和修复

### 仅浏览器 API

```tsx
// 错误：导致不匹配 - window 在服务器上不存在
<div>{window.innerWidth}</div>

// 正确：使用带挂载检查的客户端组件
'use client'
import { useState, useEffect } from 'react'

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? children : null
}
```

### 日期/时间渲染

服务器和客户端可能在不同的时区：

```tsx
// 错误：导致不匹配
<span>{new Date().toLocaleString()}</span>

// 正确：仅在客户端渲染
'use client'
const [time, setTime] = useState<string>()
useEffect(() => setTime(new Date().toLocaleString()), [])
```

### 随机值或 ID

```tsx
// 错误：随机值在服务器和客户端之间不同
<div id={Math.random().toString()}>

// 正确：使用 useId 钩子
import { useId } from 'react'

function Input() {
  const id = useId()
  return <input id={id} />
}
```

### 无效的 HTML 嵌套

```tsx
// 错误：无效 - p 内的 div
<p><div>内容</div></p>

// 错误：无效 - p 内的 p
<p><p>嵌套</p></p>

// 正确：有效嵌套
<div><p>内容</p></div>
```

### 第三方脚本

在水合期间修改 DOM 的脚本。

```tsx
// 正确：使用 next/script 和 afterInteractive
import Script from 'next/script'

export default function Page() {
  return (
    <Script
      src="https://example.com/script.js"
      strategy="afterInteractive"
    />
  )
}
```
