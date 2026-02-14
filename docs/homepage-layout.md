# 主页布局文档 (Homepage Layout)

## 页面结构图

```
┌─────────────────────────────────────────────────────────────┐
│  Navbar                                          [🌐 语言] [🌙 主题]  │
│  Logo + 导航链接                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Hero Converter Section                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  标题 + 描述                                            │  │
│  │  ┌─────────────────┐  [📋 转换按钮] ┌──────────────┐  │  │
│  │  │  JSON 输入框    │  ────────────→  │  TOON 输出   │  │  │
│  │  │  [可编辑]       │                 │  [可复制]    │  │  │
│  │  └─────────────────┘                 └──────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  About Section                                              │
│  标题 + 描述文本（居中）                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Comparison Section                                         │
│  对比展示（可能包含图表或对比内容）                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Comparison Table                                           │
│  详细对比表格                                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FAQ Section                                                │
│  常见问题折叠列表 [▼ 点击展开/收起]                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Learn More Section                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ TOON 格式   │  │ 快速入门    │  │ 常见问题    │         │
│  │ 详解        │  │ 指南        │  │             │         │
│  │ [hover效果] │  │ [hover效果] │  │ [hover效果] │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  CTA Section                                                │
│  行动号召按钮/内容                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Footer                                                     │
│  版权信息 + 链接                                             │
└─────────────────────────────────────────────────────────────┘
```

## 组件详细说明

### 1. Navbar (导航栏)
**文件**: `src/components/navbar.tsx`

**功能**:
- Logo 展示
- 导航链接
- 语言切换器 (🌐 中文/English)
- 主题切换器 (🌙 深色/浅色模式)

**交互**:
- 点击 Logo → 返回首页
- 点击导航链接 → 跳转到对应页面
- 点击语言切换 → 切换 zh/en
- 点击主题图标 → 切换 dark/light 模式

---

### 2. Hero Converter (主转换器区域)
**文件**: `src/components/hero-converter.tsx`

**功能**:
- 展示产品核心功能
- 实时 JSON 到 TOON 格式转换
- 输入/输出展示

**交互**:
- 在左侧输入框输入 JSON → 实时转换
- 点击转换按钮 → 执行转换
- 点击复制按钮 → 复制 TOON 输出
- 输入框可编辑

---

### 3. About Section (关于部分)
**文件**: `src/app/[locale]/page.tsx:23-28`

**功能**:
- 展示产品介绍
- 使用 i18n 多语言内容

**内容**:
- 标题: `t('about.title')`
- 描述: `t('about.description')`

---

### 4. Comparison (对比部分)
**文件**: `src/components/comparison.tsx`

**功能**:
- 展示 JSON vs TOON 的对比
- 可视化优势

---

### 5. Comparison Table (对比表格)
**文件**: `src/components/comparison-table.tsx`

**功能**:
- 详细的功能对比表格
- 结构化展示差异

---

### 6. FAQ Section (常见问题)
**文件**: `src/components/faq-section.tsx`

**功能**:
- 折叠式问答列表
- 解答用户常见疑问

**交互**:
- 点击问题 → 展开/收起答案
- 手风琴效果（可能）

---

### 7. Learn More Section (了解更多)
**文件**: `src/app/[locale]/page.tsx:34-73`

**功能**:
- 3个卡片链接
- 引导用户深入了解

**卡片内容**:
1. **TOON 格式详解**
   - 链接: `/[locale]/blog/toon-format-explained`
   - 描述: 深入了解 TOON 格式的工作原理

2. **快速入门指南**
   - 链接: `/[locale]/blog/welcome`
   - 描述: 开始使用 JSON to TOON 转换器

3. **常见问题**
   - 链接: `/[locale]/faq`
   - 描述: 查看常见问题解答

**交互**:
- Hover → 背景色变化 (`hover:bg-accent`)
- 点击 → 跳转到对应页面

---

### 8. CTA (行动号召)
**文件**: `src/components/cta.tsx`

**功能**:
- 引导用户采取行动
- 可能包含按钮或表单

---

### 9. Footer (页脚)
**文件**: `src/components/footer.tsx`

**功能**:
- 版权信息
- 次要导航链接
- 社交媒体链接（可能）

---

## SEO 配置

### Metadata (元数据)
**文件**: `src/app/[locale]/layout.tsx:78-116`

```typescript
{
  metadataBase: BASE_URL,
  title: {
    default: tSeo('title'),
    template: `%s | ${siteName}`
  },
  description: tSeo('description'),
  keywords: tSeo('keywords'),
  robots: { index: true, follow: true }
}
```

### Open Graph
```typescript
openGraph: {
  type: 'website',
  locale: 'zh_CN' | 'en_US',
  url: `${BASE_URL}/${locale}`,
  siteName,
  title,
  description,
  images: [{
    url: '/og-image.jpg',
    width: 1200,
    height: 630
  }]
}
```

### Twitter Card
```typescript
twitter: {
  card: 'summary_large_image',
  title,
  description
}
```

### 多语言 SEO
- **Canonical URL**: `${BASE_URL}/${locale}`
- **Alternate Languages**:
  - `zh`: `${BASE_URL}/zh`
  - `en`: `${BASE_URL}/en`

### JSON-LD 结构化数据
**文件**: `src/components/json-ld-home.tsx`

- 提供搜索引擎可读的结构化数据
- 增强搜索结果展示
- 可能包含: WebSite, Organization, BreadcrumbList 等 schema

---

## 国际化 (i18n)

### 支持语言
- 中文 (zh)
- English (en)

### 翻译文件
- `messages/zh.json`
- `messages/en.json`

### 命名空间
- `seo`: SEO 相关文本
- `about`: 关于部分文本
- 其他组件特定命名空间

---

## 无障碍功能 (Accessibility)

### Skip Link
**文件**: `src/app/[locale]/layout.tsx:142-144`

```html
<a href="#main-content">Skip to main content</a>
```

- 键盘用户可快速跳转到主内容
- 默认隐藏，获得焦点时显示

### Semantic HTML
- `<main>` 标签包裹主内容
- `role="main"` 属性

---

## 性能优化

### 字体优化
- DM Sans (本地字体)
- Inter (Google Fonts)
- `display: swap` 防止字体加载阻塞

### 图片优化
- Next.js Image 组件（推测）
- OG 图片尺寸优化 (1200x630)

---

## 技术栈

- **框架**: Next.js 15+ (App Router)
- **国际化**: next-intl
- **样式**: Tailwind CSS
- **主题**: next-themes
- **字体**: next/font

---

## 页面流程

```
用户访问 → 选择语言 → 查看 Hero → 尝试转换
    ↓
了解产品 (About) → 查看对比 (Comparison)
    ↓
查看详细对比 (Table) → 阅读 FAQ
    ↓
点击 Learn More 卡片 → 深入了解
    ↓
CTA 行动 → 转化
```

---

## 关键交互点总结

| 区域 | 交互类型 | 触发方式 | 结果 |
|------|---------|---------|------|
| Navbar | 语言切换 | 点击语言选择器 | 切换 zh/en |
| Navbar | 主题切换 | 点击主题图标 | 切换 dark/light |
| Hero Converter | 输入 JSON | 输入框编辑 | 实时转换 |
| Hero Converter | 复制输出 | 点击复制按钮 | 复制到剪贴板 |
| FAQ | 展开问题 | 点击问题标题 | 显示/隐藏答案 |
| Learn More | 卡片悬停 | 鼠标悬停 | 背景色变化 |
| Learn More | 卡片点击 | 点击卡片 | 跳转到详情页 |
| CTA | 行动按钮 | 点击按钮 | 执行转化动作 |

---

## 维护建议

1. **SEO 监控**: 定期检查 metadata 和 JSON-LD 是否正确渲染
2. **翻译更新**: 新增内容时同步更新 zh.json 和 en.json
3. **性能测试**: 使用 Lighthouse 监控页面性能
4. **无障碍测试**: 使用屏幕阅读器测试导航流程
5. **转换器测试**: 确保 JSON 转换功能在各种输入下正常工作
