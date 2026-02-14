# LLM 格式输出参考

## 概述

`--format llm` 输出是一种紧凑、令牌优化的混合 XML/文本格式，专为 AI 代理消费而设计。它以平衡机器可读性和令牌效率的格式提供结构化审计数据。

## 关键特性

- **比详细 XML 格式小 40-70%**
- **1 空格缩进**以实现最小令牌使用
- **混合结构**：XML 标签 + 元数据的文本前缀
- **内联属性**：元数据存储为 XML 属性，而非嵌套元素
- **逗号分隔列表**：页面和数组内联格式化
- **扁平层次结构**：与详细 XML 相比减少嵌套深度

## 格式结构

### 1. 文档头

```xml
<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.24">
```

### 2. 网站信息

```xml
<site url="https://example.com" crawled="51" date="2025-01-18T10:30:00Z"/>
```

属性：
- `url` - 审计的基础 URL
- `crawled` - 爬取的页面数
- `date` - ISO 8601 时间戳

### 3. 健康评分

```xml
<score overall="85" grade="B">
 <cat name="Core SEO" score="92"/>
 <cat name="Technical SEO" score="88"/>
 <cat name="Content Quality" score="76"/>
</score>
```

属性：
- `overall` - 0-100 健康评分
- `grade` - 字母等级（A-F）
- 具有单独评分的类别

### 4. 摘要

```xml
<summary passed="120" warnings="15" failed="8"/>
```

属性：
- `passed` - 通过的检查数
- `warnings` - 警告数
- `failed` - 失败的检查数

### 5. 问题部分

问题按类别分组，具有紧凑的内联元数据：

```xml
<issues>
 <category name="Core SEO" errors="2" warnings="3">
  <rule id="core/meta-title" severity="error" status="fail">
   缺少或为空的 meta title 标签
   Desc: 每个页面都应该有唯一的 meta title
   Fix: 为每个页面添加描述性 <title> 标签
   Pages (2): https://example.com/about, https://example.com/contact
   Items (2):
    - https://example.com/about
    - https://example.com/contact
  </rule>
  <rule id="core/meta-description" severity="warning" status="warn">
   Desc: 页面应该有 meta 描述
   Fix: 添加 <meta name="description"> 标签
   Pages (5): https://example.com/page1, https://example.com/page2, ...
  </rule>
 </category>
 <category name="Performance" errors="0" warnings="1">
  ...
 </category>
</issues>
```

#### 规则结构

每个 `<rule>` 元素包含：

**属性：**
- `id` - 规则标识符（例如，`core/meta-title`）
- `severity` - `error`、`warning` 或 `info`
- `status` - `pass`、`warn` 或 `fail`

**文本内容（按顺序）：**
1. **Message**（可选）- 人类可读的问题摘要
2. **Desc:** - 规则描述（正在检查什么）
3. **Fix:** - 推荐的解决方案（如何修复）
4. **Pages (n):** - 受影响 URL 的逗号分隔列表
5. **Items (n):** - 带有元数据的特定项目的破折号前缀列表

### 6. Items 格式

Items 提供有关受影响元素的详细上下文：

```xml
Items (3):
 - https://example.com/missing-title (title: "")
 - https://example.com/duplicate-title (title: "Home Page") (from: https://example.com/other)
 - /broken-link [status: 404, type: internal] (from: https://example.com/contact)
```

Item 格式：
- `- <id>` - 主标识符（URL、选择器等）
- `(<label>)` - 可选的人类可读标签（如果与 id 不同）
- `[key: value, ...]` - 方括号中的元数据
- `(from: <sources>)` - 项目出现的源页面

## Diff 输出（LLM 格式）

当使用 `squirrel report --diff` 或 `--regression-since` 与 `--format llm` 时，
输出是紧凑的 XML diff 格式：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<diff version="0.0.24">
 <baseline id="a7b3c2d1" url="https://example.com" date="2026-01-17T10:30:00Z" pages="42" score="87" grade="B"/>
 <current id="b9c4e1f2" url="https://example.com" date="2026-01-18T10:30:00Z" pages="44" score="84" grade="B"/>
 <summary added="3" removed="1" changed="2" regressions="1" improvements="1"/>
 <added>
  <issue fp="abc123" rule="core/meta-title" severity="error" status="fail" check="meta-title" category="core" weight="8">
   缺少页面标题
   Target: page /about
  </issue>
 </added>
 <removed>
  ...
 </removed>
 <changed>
  <change type="regression" fp="def456" rule="links/broken-links" severity="warning" status="fail" check="broken-links">
   warn→fail: 失效链接数量增加
   Before:
    <issue ...> ... </issue>
   After:
    <issue ...> ... </issue>
  </change>
 </changed>
</diff>
```

关键字段：
- `fp`：问题实例的确定性指纹
- `rule`、`check`、`severity`、`status`：规则和检查元数据
- `Target:`：项目/页面/检查目标
- `change type`：`regression`、`improvement` 或 `change`

## 示例输出

```xml
<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.24">
<site url="https://example.com" crawled="51" date="2025-01-18T10:30:00Z"/>
<score overall="78" grade="C">
 <cat name="Core SEO" score="85"/>
 <cat name="Technical SEO" score="92"/>
 <cat name="Performance" score="65"/>
</score>
<summary passed="98" warnings="12" failed="5"/>
<issues>
 <category name="Core SEO" errors="2" warnings="1">
  <rule id="core/meta-title" severity="error" status="fail">
   2 个页面缺少 meta title
   Desc: 每个页面都应该有唯一的 meta title
   Fix: 为每个页面添加描述性 <title> 标签
   Pages (2): https://example.com/about, https://example.com/contact
   Items (2):
    - https://example.com/about
    - https://example.com/contact
  </rule>
 </category>
</issues>
</audit>
```

## 使用方法

LLM 格式可通过 `audit` 和 `report` 命令使用：

```bash
# 直接 LLM 输出（单步）
squirrel audit https://example.com --format llm

# 或两步工作流程
squirrel audit https://example.com
squirrel report <audit-id> --format llm

# 直接管道到 AI 代理
squirrel audit https://example.com --format llm | claude
```

`audit` 命令直接支持 `--format llm` 以方便使用。当你需要从单个审计生成多种格式的报告时，使用两步工作流程。

## 与其他格式的比较

| 格式 | 大小 | 结构 | 最适合 |
|--------|------|-----------|----------|
| `xml` | 209KB | 详细，2 空格缩进，完全嵌套 | 企业集成、存档 |
| `llm` | 125KB | 紧凑，1 空格缩进，混合 | AI 代理、令牌限制上下文 |
| `json` | 180KB | 结构化数据 | 程序化处理 |
| `text` | 45KB | 纯文本，无结构 | 简单管道、grep |

## 令牌效率

LLM 格式通过以下方式实现比详细 XML 减少 40-70% 的大小：

1. **1 空格缩进**而非 2-4 空格
2. **内联属性**而非嵌套元素
3. **文本前缀**（Desc:、Fix:）而非 XML 标签
4. **逗号分隔列表**而非多个元素
5. **扁平层次结构** - 更少的嵌套级别

## XML 字符转义

特殊字符被正确转义：
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&apos;`

## 设计理念

LLM 格式针对以下方面进行了优化：
1. **令牌效率** - 对 API 成本和上下文限制至关重要
2. **易于解析** - XML 结构用于可靠提取
3. **人类可读性** - AI 代理可以自然地解释问题
4. **渐进式披露** - 摘要 → 类别 → 规则 → Items
5. **可操作的见解** - 修复建议内联包含

## 实现说明

- 由 `app/src/reports/output/llm.ts` 中的 `generateLlmReport()` 生成
- 空问题部分呈现为自闭合：`<issues/>`
- 所有文本内容都经过 XML 转义以确保安全
- 缩进仅使用空格（无制表符）
- 行尾为 Unix 风格（`\n`）
