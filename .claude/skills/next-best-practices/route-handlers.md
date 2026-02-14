# 路由处理器

使用 `route.ts` 文件创建 API 端点。

## 基本用法

```tsx
// app/api/users/route.ts
export async function GET() {
  const users = await getUsers()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json(user, { status: 201 })
}
```

## 支持的方法

`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`、`OPTIONS`

## GET 处理器与 page.tsx 冲突

**`route.ts` 和 `page.tsx` 不能在同一文件夹中共存。**

```
app/
├── api/
│   └── users/
│       └── route.ts    # /api/users
└── users/
    ├── page.tsx        # /users（页面）
    └── route.ts        # 警告：与 page.tsx 冲突！
```

如果需要在同一路径上同时拥有页面和 API，请使用不同的路径：

```
app/
├── users/
│   └── page.tsx        # /users（页面）
└── api/
    └── users/
        └── route.ts    # /api/users（API）
```

## 环境行为

路由处理器在**类似服务器组件的环境**中运行：

- 可以：使用 `async/await`
- 可以：访问 `cookies()`、`headers()`
- 可以：使用 Node.js API
- 不可以：使用 React 钩子
- 不可以：使用 React DOM API
- 不可以：使用浏览器 API

```tsx
// 错误：这不起作用 - 路由处理器中没有 React DOM
import { renderToString } from 'react-dom/server'

export async function GET() {
  const html = renderToString(<Component />)  // 错误！
  return new Response(html)
}
```

## 动态路由处理器

```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await getUser(id)

  if (!user) {
    return Response.json({ error: '未找到' }, { status: 404 })
  }

  return Response.json(user)
}
```

## 请求辅助方法

```tsx
export async function GET(request: Request) {
  // URL 和搜索参数
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // 请求头
  const authHeader = request.headers.get('authorization')

  // Cookies（Next.js 辅助方法）
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return Response.json({ query, token })
}
```

## 响应辅助方法

```tsx
// JSON 响应
return Response.json({ data })

// 带状态
return Response.json({ error: '未找到' }, { status: 404 })

// 带请求头
return Response.json(data, {
  headers: {
    'Cache-Control': 'max-age=3600',
  },
})

// 重定向
return Response.redirect(new URL('/login', request.url))

// 流
return new Response(stream, {
  headers: { 'Content-Type': 'text/event-stream' },
})
```

## 何时使用路由处理器 vs Server Actions

| 用例 | 路由处理器 | Server Actions |
|----------|----------------|----------------|
| 表单提交 | 否 | 是 |
| 来自 UI 的数据变更 | 否 | 是 |
| 第三方 webhooks | 是 | 否 |
| 外部 API 消费 | 是 | 否 |
| 公共 REST API | 是 | 否 |
| 文件上传 | 都可以 | 都可以 |

**优先使用 Server Actions** 处理从 UI 触发的变更。
**使用路由处理器** 处理外部集成和公共 API。
