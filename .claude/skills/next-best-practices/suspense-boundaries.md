# Suspense 边界

导致 CSR 退出的客户端钩子需要 Suspense 边界。

## useSearchParams

在静态路由中始终需要 Suspense 边界。没有它，整个页面将变成客户端渲染。

```tsx
// 错误：整个页面变成 CSR
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  return <div>查询：{searchParams.get('q')}</div>
}
```

```tsx
// 正确：用 Suspense 包装
import { Suspense } from 'react'
import SearchBar from './search-bar'

export default function Page() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <SearchBar />
    </Suspense>
  )
}
```

## usePathname

当路由有动态参数时需要 Suspense 边界。

```tsx
// 在动态路由 [slug] 中
// 错误：没有 Suspense
'use client'
import { usePathname } from 'next/navigation'

export function Breadcrumb() {
  const pathname = usePathname()
  return <nav>{pathname}</nav>
}
```

```tsx
// 正确：用 Suspense 包装
<Suspense fallback={<BreadcrumbSkeleton />}>
  <Breadcrumb />
</Suspense>
```

如果你使用 `generateStaticParams`，Suspense 是可选的。

## 快速参考

| 钩子 | 需要 Suspense |
|------|-------------------|
| `useSearchParams()` | 是 |
| `usePathname()` | 是（动态路由）|
| `useParams()` | 否 |
| `useRouter()` | 否 |
