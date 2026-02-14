# 并行和拦截路由

并行路由在同一布局中渲染多个页面。拦截路由在从应用内导航时显示不同的 UI，而不是直接 URL 访问。它们一起实现模态模式。

## 文件结构

```
app/
├── @modal/                    # 并行路由插槽
│   ├── default.tsx            # 必需！返回 null
│   ├── (.)photos/             # 拦截 /photos/*
│   │   └── [id]/
│   │       └── page.tsx       # 模态内容
│   └── [...]catchall/         # 可选：捕获未匹配
│       └── page.tsx
├── photos/
│   └── [id]/
│       └── page.tsx           # 完整页面（直接访问）
├── layout.tsx                 # 渲染 children 和 @modal
└── page.tsx
```

## 步骤 1：带插槽的根布局

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
```

## 步骤 2：默认文件（关键！）

**每个并行路由插槽必须有一个 `default.tsx`** 以防止硬导航时出现 404。

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null;
}
```

没有这个文件，刷新任何页面都会 404，因为 Next.js 无法确定在 `@modal` 插槽中渲染什么。

## 步骤 3：拦截路由（模态）

`(.)` 前缀拦截同级路由。

```tsx
// app/@modal/(.)photos/[id]/page.tsx
import { Modal } from '@/components/modal';

export default async function PhotoModal({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
}
```

## 步骤 4：完整页面（直接访问）

```tsx
// app/photos/[id]/page.tsx
export default async function PhotoPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <div className="full-page">
      <img src={photo.url} alt={photo.title} />
      <h1>{photo.title}</h1>
    </div>
  );
}
```

## 步骤 5：正确关闭的模态组件

**关键：使用 `router.back()` 关闭模态，而不是 `router.push()` 或 `<Link>`。**

```tsx
// components/modal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  // 按 Escape 键关闭
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        router.back(); // 正确
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [router]);

  // 点击遮罩关闭
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      router.back(); // 正确
    }
  }, [router]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <button
          onClick={() => router.back()} // 正确！
          className="absolute top-4 right-4"
        >
          关闭
        </button>
        {children}
      </div>
    </div>
  );
}
```

### 为什么不用 `router.push('/')` 或 `<Link href="/">`？

使用 `push` 或 `Link` "关闭"模态：
1. 添加新的历史记录条目（后退按钮再次显示模态）
2. 不能正确清除拦截的路由
3. 可能导致模态闪烁或意外持续存在

`router.back()` 正确地：
1. 从历史记录中删除拦截的路由
2. 返回到上一页
3. 正确卸载模态

## 路由匹配器参考

匹配器匹配**路由段**，而不是文件系统路径：

| 匹配器 | 匹配 | 示例 |
|---------|---------|---------|
| `(.)` | 同级 | `@modal/(.)photos` 拦截 `/photos` |
| `(..)` | 上一级 | `@modal/(..)settings` 从 `/dashboard/@modal` 拦截 `/settings` |
| `(..)(..)` | 上两级 | 很少使用 |
| `(...)` | 从根目录 | `@modal/(...)photos` 从任何地方拦截 `/photos` |

**常见错误**：认为 `(..)` 意味着"父文件夹" - 它意味着"父路由段"。

## 处理硬导航

当用户直接访问 `/photos/123`（书签、刷新、共享链接）时：
- 拦截路由被绕过
- 完整的 `photos/[id]/page.tsx` 渲染
- 模态不出现（预期行为）

如果你也想在直接访问时显示模态，需要额外的逻辑：

```tsx
// app/photos/[id]/page.tsx
import { Modal } from '@/components/modal';

export default async function PhotoPage({ params }) {
  const { id } = await params;
  const photo = await getPhoto(id);

  // 选项：在直接访问时也渲染为模态
  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
}
```

## 常见陷阱

### 1. 缺少 `default.tsx` → 刷新时 404

每个 `@slot` 文件夹都需要一个返回 `null`（或适当内容）的 `default.tsx`。

### 2. 导航后模态持续存在

你使用的是 `router.push()` 而不是 `router.back()`。

### 3. 嵌套并行路由也需要默认值

如果你在路由组内有 `@modal`，每个级别都需要自己的 `default.tsx`：

```
app/
├── (marketing)/
│   ├── @modal/
│   │   └── default.tsx     # 需要！
│   └── layout.tsx
└── layout.tsx
```

### 4. 拦截路由显示错误内容

检查你的匹配器：
- `(.)photos` 从同一路由级别拦截 `/photos`
- 如果你的 `@modal` 在 `app/dashboard/@modal` 中，使用 `(.)photos` 拦截 `/dashboard/photos`，而不是 `/photos`

### 5. TypeScript 错误与 `params`

在 Next.js 15+ 中，`params` 是一个 Promise：

```tsx
// 正确
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```

## 完整示例：照片画廊模态

```
app/
├── @modal/
│   ├── default.tsx
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx
├── photos/
│   ├── page.tsx           # 画廊网格
│   └── [id]/
│       └── page.tsx       # 完整照片页面
├── layout.tsx
└── page.tsx
```

画廊中的链接：

```tsx
// app/photos/page.tsx
import Link from 'next/link';

export default async function Gallery() {
  const photos = await getPhotos();

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map(photo => (
        <Link key={photo.id} href={`/photos/${photo.id}`}>
          <img src={photo.thumbnail} alt={photo.title} />
        </Link>
      ))}
    </div>
  );
}
```

点击照片 → 模态打开（拦截）
直接 URL → 完整页面渲染
模态打开时刷新 → 完整页面渲染
