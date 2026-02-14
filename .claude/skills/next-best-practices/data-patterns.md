# 数据模式

为每个用例选择正确的数据获取模式。

## 决策树

```
需要获取数据？
├── 从服务器组件？
│   └── 使用：直接获取（不需要 API）
│
├── 从客户端组件？
│   ├── 是否是变更（POST/PUT/DELETE）？
│   │   └── 使用：Server Action
│   └── 是否是读取（GET）？
│       └── 使用：路由处理器或从服务器组件传递
│
├── 需要外部 API 访问（webhooks、第三方）？
│   └── 使用：路由处理器
│
└── 需要 REST API 用于移动应用/外部客户端？
    └── 使用：路由处理器
```

## 模式 1：服务器组件（读取的首选方式）

直接在服务器组件中获取数据 - 不需要 API 层。

```tsx
// app/users/page.tsx
async function UsersPage() {
  // 直接数据库访问 - 无 API 往返
  const users = await db.user.findMany();

  // 或从外部 API 获取
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**优点**：
- 无需维护 API
- 无客户端-服务器瀑布
- 密钥保留在服务器上
- 直接数据库访问

## 模式 2：Server Actions（变更的首选方式）

Server Actions 是处理变更的推荐方式。

```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await db.post.create({ data: { title } });

  revalidatePath('/posts');
}

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });

  revalidateTag('posts');
}
```

```tsx
// app/posts/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">创建</button>
    </form>
  );
}
```

**优点**：
- 端到端类型安全
- 渐进增强（无 JS 也能工作）
- 自动请求处理
- 与 React transitions 集成

**限制**：
- 仅 POST（无 GET 缓存语义）
- 仅内部使用（无外部访问）
- 不能返回不可序列化的数据

## 模式 3：路由处理器（APIs）

当需要 REST API 时使用路由处理器。

```tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET 可缓存
export async function GET(request: NextRequest) {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

// POST 用于变更
export async function POST(request: NextRequest) {
  const body = await request.json();
  const post = await db.post.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}
```

**何时使用**：
- 外部 API 访问（移动应用、第三方）
- 来自外部服务的 Webhooks
- 需要 HTTP 缓存的 GET 端点
- 需要 OpenAPI/Swagger 文档

**何时不使用**：
- 内部数据获取（使用服务器组件）
- 来自 UI 的变更（使用 Server Actions）

## 避免数据瀑布

### 问题：顺序获取

```tsx
// 错误：顺序瀑布
async function Dashboard() {
  const user = await getUser();        // 等待...
  const posts = await getPosts();      // 然后等待...
  const comments = await getComments(); // 然后等待...

  return <div>...</div>;
}
```

### 解决方案 1：使用 Promise.all 并行获取

```tsx
// 正确：并行获取
async function Dashboard() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments(),
  ]);

  return <div>...</div>;
}
```

### 解决方案 2：使用 Suspense 流式传输

```tsx
// 正确：逐步显示内容
import { Suspense } from 'react';

async function Dashboard() {
  return (
    <div>
      <Suspense fallback={<UserSkeleton />}>
        <UserSection />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsSection />
      </Suspense>
    </div>
  );
}

async function UserSection() {
  const user = await getUser(); // 独立获取
  return <div>{user.name}</div>;
}

async function PostsSection() {
  const posts = await getPosts(); // 独立获取
  return <PostList posts={posts} />;
}
```

### 解决方案 3：预加载模式

```tsx
// lib/data.ts
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

export const preloadUser = (id: string) => {
  void getUser(id); // 触发并忘记
};
```

```tsx
// app/user/[id]/page.tsx
import { getUser, preloadUser } from '@/lib/data';

export default async function UserPage({ params }) {
  const { id } = await params;

  // 提前开始获取
  preloadUser(id);

  // 做其他工作...

  // 数据现在可能已准备好
  const user = await getUser(id);
  return <div>{user.name}</div>;
}
```

## 客户端组件数据获取

当客户端组件需要数据时：

### 选项 1：从服务器组件传递（首选）

```tsx
// 服务器组件
async function Page() {
  const data = await fetchData();
  return <ClientComponent initialData={data} />;
}

// 客户端组件
'use client';
function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  // ...
}
```

### 选项 2：挂载时获取（必要时）

```tsx
'use client';
import { useEffect, useState } from 'react';

function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <Loading />;
  return <div>{data.value}</div>;
}
```

### 选项 3：用于读取的 Server Action（可行但不理想）

Server Actions 可以从客户端组件调用进行读取，但这不是它们的预期用途：

```tsx
'use client';
import { getData } from './actions';
import { useEffect, useState } from 'react';

function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return <div>{data?.value}</div>;
}
```

**注意**：Server Actions 始终使用 POST，因此没有 HTTP 缓存。对于可缓存的读取，首选路由处理器。

## 快速参考

| 模式 | 用例 | HTTP 方法 | 缓存 |
|---------|----------|-------------|---------|
| 服务器组件 fetch | 内部读取 | 任何 | 完整的 Next.js 缓存 |
| Server Action | 变更、表单提交 | 仅 POST | 否 |
| 路由处理器 | 外部 API、webhooks | 任何 | GET 可以缓存 |
| 客户端 fetch 到 API | 客户端读取 | 任何 | HTTP 缓存头 |
