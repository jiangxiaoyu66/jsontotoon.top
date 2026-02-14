# 指令

## React 指令

这些是 React 指令，不是 Next.js 特有的。

### `'use client'`

将组件标记为客户端组件。以下情况需要：
- React 钩子（`useState`、`useEffect` 等）
- 事件处理器（`onClick`、`onChange`）
- 浏览器 API（`window`、`localStorage`）

```tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

参考：https://react.dev/reference/rsc/use-client

### `'use server'`

将函数标记为 Server Action。可以传递给客户端组件。

```tsx
'use server'

export async function submitForm(formData: FormData) {
  // 在服务器上运行
}
```

或在服务器组件内内联：

```tsx
export default function Page() {
  async function submit() {
    'use server'
    // 在服务器上运行
  }
  return <form action={submit}>...</form>
}
```

参考：https://react.dev/reference/rsc/use-server

---

## Next.js 指令

### `'use cache'`

标记函数或组件进行缓存。Next.js 缓存组件的一部分。

```tsx
'use cache'

export async function getCachedData() {
  return await fetchData()
}
```

需要在 `next.config.ts` 中设置 `cacheComponents: true`。

有关详细用法，包括缓存配置文件、`cacheLife()`、`cacheTag()` 和 `updateTag()`，请参见 `next-cache-components` 技能。

参考：https://nextjs.org/docs/app/api-reference/directives/use-cache
