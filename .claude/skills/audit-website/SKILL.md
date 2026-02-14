---
name: audit-website
description: 使用 squirrelscan CLI 审计网站的 SEO、性能、安全、技术、内容等 15 个类别的 230+ 规则。返回针对 LLM 优化的报告，包含健康评分、失效链接、meta 标签分析和可操作的建议。用于发现和评估网站或 Web 应用的问题和健康状况。
license: 查看仓库根目录的 LICENSE 文件
compatibility: 需要安装 squirrel CLI 并可在 PATH 中访问
metadata:
  author: squirrelscan
  version: "1.22"
allowed-tools: Bash(squirrel:*) Read Edit Grep Glob
---

# 网站审计技能

使用 squirrelscan CLI 审计网站的 SEO、技术、内容、性能和安全问题。

squirrelscan 提供了一个 CLI 工具 squirrel - 适用于 macOS、Windows 和 Linux。它通过模拟浏览器、搜索爬虫，并根据 230+ 规则分析网站的结构和内容，进行全面的网站审计。

它会为你提供问题列表以及修复建议。

## 链接

* squirrelscan 网站：[https://squirrelscan.com](https://squirrelscan.com)
* 文档（包括规则参考）：[docs.squirrelscan.com](https://docs.squirrelscan.com)

你可以使用以下模板查找任何规则的文档：

https://docs.squirrelscan.com/rules/{rule_category}/{rule_id}

示例：

https://docs.squirrelscan.com/rules/links/external-links

## 此技能的功能

此技能使 AI 代理能够审计网站的 21 个类别中的 230+ 规则，包括：

- **SEO 问题**：Meta 标签、标题、描述、规范 URL、Open Graph 标签
- **技术问题**：失效链接、重定向链、页面速度、移动友好性
- **性能**：页面加载时间、资源使用、缓存
- **内容质量**：标题结构、图片 alt 文本、内容分析
- **安全**：泄露的密钥、HTTPS 使用、安全头、混合内容
- **可访问性**：Alt 文本、颜色对比度、键盘导航
- **可用性**：表单验证、错误处理、用户流程
- **链接**：检查失效的内部和外部链接
- **E-E-A-T**：专业性、经验、权威性、可信度
- **用户体验**：用户流程、错误处理、表单验证
- **移动端**：检查移动友好性、响应式设计、触摸友好元素
- **可爬取性**：检查可爬取性、robots.txt、sitemap.xml 等
- **Schema**：Schema.org 标记、结构化数据、富结果
- **法律**：法律要求合规性、隐私政策、服务条款
- **社交**：Open Graph、Twitter 卡片及验证 schema、片段等
- **URL 结构**：长度、连字符、关键词
- **关键词**：关键词堆砌
- **内容**：内容结构、标题
- **图片**：Alt 文本、颜色对比度、图片大小、图片格式
- **本地 SEO**：NAP 一致性、地理元数据
- **视频**：VideoObject schema、可访问性

等等

审计会爬取网站，根据审计规则分析每个页面，并返回包含以下内容的综合报告：
- 总体健康评分（0-100）
- 类别细分（核心 SEO、技术 SEO、内容、安全）
- 具体问题及受影响的 URL
- 失效链接检测
- 可操作的建议
- 规则具有错误、警告和通知级别，并且排名在 1 到 10 之间

## 何时使用

在以下情况下使用此技能：

- 分析网站的健康状况
- 调试技术 SEO 问题
- 修复上述所有问题
- 检查失效链接
- 验证 meta 标签和结构化数据
- 生成网站审计报告
- 比较更改前后的网站健康状况
- 改善网站性能、可访问性、SEO、安全等

你应该尽可能频繁地重新审计，以确保你的网站保持健康并表现良好。

## 前置要求

此技能需要安装 squirrel CLI 并在 PATH 中可用。

**安装：** [squirrelscan.com/download](https://squirrelscan.com/download)

**验证：**
```bash
squirrel --version
```

## 设置

运行 `squirrel init` 在当前目录创建 `squirrel.toml` 配置文件。如果不存在，创建一个并指定项目名称：

```bash
squirrel init -n my-project
# 覆盖现有配置
squirrel init -n my-project --force
```

## 使用方法

### 简介

你可以运行三个流程，它们都缓存在本地项目数据库中：

- crawl - 运行爬取或刷新、继续爬取的子命令
- analyze - 分析爬取结果的子命令
- report - 以所需格式（llm、text、console、html 等）生成报告的子命令

'audit' 命令是这三个流程的包装器，按顺序运行它们：

```bash
squirrel audit https://example.com --format llm
```

你应该始终优先使用 llm 格式选项 - 它是为你设计的，提供详尽且紧凑的输出格式。

第一次扫描应该是表面扫描，这是对网站的快速浅层扫描，以收集有关网站的基本信息，例如其结构、内容和技术栈。此扫描可以快速完成，不会影响网站的性能。

第二次扫描应该是深度扫描，这是对网站的彻底详细扫描，以收集有关网站的更多信息，例如其安全性、性能和可访问性。此扫描可能需要更长时间，并可能影响网站的性能。

如果用户没有提供要审计的网站，请询问他们想要审计哪个 URL。

你应该优先审计在线网站 - 只有在那里我们才能获得网站的真实表现以及性能或渲染问题。

如果你同时拥有本地和在线网站要审计，请提示用户选择要审计哪一个，并建议他们选择在线网站。

你可以将审计中的修复应用于在线网站的本地代码。

在规划范围任务时，使其可以作为子代理并发运行以加快修复速度。

在实施修复时，利用子代理加快修复的实施。

应用修复后，验证代码仍然可以构建并通过项目中的任何现有检查。

### 基本工作流程

审计流程分为两步：

1. **运行审计**（保存到数据库，显示控制台输出）
2. **导出报告**为所需格式

```bash
# 步骤 1：运行审计（默认：控制台输出）
squirrel audit https://example.com

# 步骤 2：导出为 LLM 格式
squirrel report <audit-id> --format llm
```

### 回归差异

当你需要检测审计之间的回归时，使用 diff 模式：

```bash
# 将当前报告与基线审计 ID 进行比较
squirrel report --diff <audit-id> --format llm

# 将最新域报告与基线域进行比较
squirrel report --regression-since example.com --format llm
```

Diff 模式支持 `console`、`text`、`json`、`llm` 和 `markdown`。不支持 `html` 和 `xml`。

### 运行审计

运行审计时：

1. **呈现报告** - 向用户显示审计结果和评分
2. **提出修复建议** - 列出你可以修复的问题，并在进行更改之前请求用户确认
3. **并行化已批准的修复** - 对批量内容编辑（alt 文本、标题、描述）使用子代理
4. **迭代** - 修复批次 → 重新审计 → 呈现结果 → 提出下一批次
5. **暂停判断** - 失效链接、结构更改以及任何模糊的内容都应标记供用户审查
6. **显示前后对比** - 在每个修复批次后呈现评分比较

- **迭代循环**：修复一批问题后，重新审计并继续修复，直到：
  - 评分达到目标（通常为 85+），或
  - 只剩下需要人工判断的问题（例如，"应该删除此链接吗？"）

- **平等对待所有修复**：代码更改和内容更改同样重要。

- **并行化内容修复**：对于影响多个文件的问题：
  - 生成子代理以并行修复
  - 示例：7 个文件需要 alt 文本 → 生成 1-2 个代理修复所有文件
  - 示例：30 个文件有标题问题 → 生成代理批量编辑

- **完成标准**：
  - ✅ 所有错误已修复
  - ✅ 所有警告已修复（或记录为需要人工审查）
  - ✅ 重新审计确认改进
  - ✅ 向用户显示前后对比

应用修复后，询问用户是否想要审查更改。

### 评分目标

| 起始评分 | 目标评分 | 预期工作量 |
|----------------|--------------|---------------|
| < 50（F 级） | 75+（C 级） | 重大修复 |
| 50-70（D 级） | 85+（B 级） | 中等修复 |
| 70-85（C 级） | 90+（A 级） | 优化 |
| > 85（B+ 级） | 95+ | 微调 |

只有当覆盖率设置为 FULL（--coverage full）且评分高于 95（A 级）时，网站才被认为是完整和修复的。

### 问题类别

| 类别 | 修复方法 | 可并行化 |
|----------|--------------|----------------|
| Meta 标签/标题 | 编辑页面组件或元数据 | 否 |
| 结构化数据 | 向页面模板添加 JSON-LD | 否 |
| 缺少 H1/标题 | 编辑页面组件 + 内容文件 | 是（内容） |
| 图片 alt 文本 | 编辑内容文件 | 是 |
| 标题层次结构 | 编辑内容文件 | 是 |
| 简短描述 | 编辑内容 frontmatter | 是 |
| HTTP→HTTPS 链接 | 在内容中查找和替换 | 是 |
| 失效链接 | 人工审查（标记给用户） | 否 |

**对于可并行化的修复**：生成具有特定文件分配的子代理。

### 内容文件修复

许多问题需要编辑内容文件。这些与代码修复同样重要：

- **图片 alt 文本**：为图片添加描述性 alt 文本
- **标题层次结构**：修复跳过的标题级别
- **Meta 描述**：在 frontmatter 中扩展简短描述
- **HTTP 链接**：将不安全链接更新为 HTTPS

### 使用子代理并行化修复

当用户批准一批修复时，你可以使用子代理并行应用它们：

- **首先询问用户** — 在生成子代理之前始终确认要应用哪些修复
- 为相同修复类型的每个子代理分组 3-5 个文件
- 仅并行化独立文件（没有共享组件或配置）
- 在单个消息中生成多个子代理以实现并发执行

### 高级选项

审计更多页面：

```bash
squirrel audit https://example.com --max-pages 200
```

强制全新爬取（忽略缓存）：

```bash
squirrel audit https://example.com --refresh
```

恢复中断的爬取：

```bash
squirrel audit https://example.com --resume
```

详细输出用于调试：

```bash
squirrel audit https://example.com --verbose
```

## 常用选项

### Audit 命令选项

| 选项 | 别名 | 描述 | 默认值 |
|--------|-------|-------------|---------|
| `--format <fmt>` | `-f <fmt>` | 输出格式：console、text、json、html、markdown、llm | console |
| `--coverage <mode>` | `-C <mode>` | 覆盖模式：quick、surface、full | surface |
| `--max-pages <n>` | `-m <n>` | 最大爬取页面数（最多 5000） | 根据覆盖率变化 |
| `--output <path>` | `-o <path>` | 输出文件路径 | - |
| `--refresh` | `-r` | 忽略缓存，全新获取所有页面 | false |
| `--resume` | - | 恢复中断的爬取 | false |
| `--verbose` | `-v` | 详细输出 | false |
| `--debug` | - | 调试日志 | false |
| `--trace` | - | 启用性能跟踪 | false |
| `--project-name <name>` | `-n <name>` | 覆盖项目名称 | 来自配置 |

### 覆盖模式

根据审计需求选择覆盖模式：

| 模式 | 默认页面数 | 行为 | 使用场景 |
|------|---------------|----------|----------|
| `quick` | 25 | 仅种子 + 站点地图，无链接发现 | CI 检查、快速健康检查 |
| `surface` | 100 | 每个 URL 模式一个样本 | 一般审计（默认） |
| `full` | 500 | 爬取所有内容直到限制 | 深度分析 |

**Surface 模式很智能** - 它检测 URL 模式，如 `/blog/{slug}` 或 `/products/{id}`，并且每个模式只爬取一个样本。这使得它对于具有许多相似页面的网站（博客、电子商务）非常高效。

```bash
# 快速健康检查（25 页，无链接发现）
squirrel audit https://example.com -C quick --format llm

# 默认表面审计（100 页，模式采样）
squirrel audit https://example.com --format llm

# 完整综合审计（500 页）
squirrel audit https://example.com -C full --format llm

# 覆盖任何模式的页面限制
squirrel audit https://example.com -C surface -m 200 --format llm
```

**何时使用每种模式：**
- `quick`：CI 管道、每日健康检查、监控
- `surface`：大多数审计 - 高效覆盖独特模板
- `full`：启动前、综合分析、深入研究

### Report 命令选项

| 选项 | 别名 | 描述 |
|--------|-------|-------------|
| `--list` | `-l` | 列出最近的审计 |
| `--severity <level>` | - | 按严重性过滤：error、warning、all |
| `--category <cats>` | - | 按类别过滤（逗号分隔） |
| `--format <fmt>` | `-f <fmt>` | 输出格式：console、text、json、html、markdown、xml、llm |
| `--output <path>` | `-o <path>` | 输出文件路径 |
| `--input <path>` | `-i <path>` | 从 JSON 文件加载（回退模式） |

### Config 子命令

| 命令 | 描述 |
|---------|-------------|
| `config show` | 显示当前配置 |
| `config set <key> <value>` | 设置配置值 |
| `config path` | 显示配置文件路径 |
| `config validate` | 验证配置文件 |

### 其他命令

| 命令 | 描述 |
|---------|-------------|
| `squirrel feedback` | 向 squirrelscan 团队发送反馈 |
| `squirrel skills install` | 安装 Claude Code 技能 |
| `squirrel skills update` | 更新 Claude Code 技能 |

### Self 命令

`squirrel self` 下的自我管理命令：

| 命令 | 描述 |
|---------|-------------|
| `self install` | 引导本地安装 |
| `self update` | 检查并应用更新 |
| `self completion` | 生成 shell 补全 |
| `self doctor` | 运行健康检查 |
| `self version` | 显示版本信息 |
| `self settings` | 管理 CLI 设置 |
| `self uninstall` | 从系统中删除 squirrel |

## 输出格式

### Console 输出（默认）

`audit` 命令默认显示人类可读的控制台输出，带有彩色输出和进度指示器。

### LLM 格式

要获取针对 LLM 优化的输出，使用 `report` 命令和 `--format llm`：

```bash
squirrel report <audit-id> --format llm
```

LLM 格式是针对令牌效率优化的紧凑 XML/文本混合格式（比详细 XML 小 40%）：

- **摘要**：总体健康评分和关键指标
- **按类别分类的问题**：按审计规则类别分组（核心 SEO、技术、内容、安全）
- **失效链接**：失效的外部和内部链接列表
- **建议**：带有修复建议的优先操作项

详细格式规范请参见 [OUTPUT-FORMAT.md](references/OUTPUT-FORMAT.md)。

## 示例

### 示例 1：使用 LLM 输出的快速网站审计

```bash
# 用户询问："检查 squirrelscan.com 的 SEO 问题"
squirrel audit https://squirrelscan.com --format llm
```

### 示例 2：大型网站的深度审计

```bash
# 用户询问："对我的博客进行彻底审计，最多 500 页"
squirrel audit https://myblog.com --max-pages 500 --format llm
```

### 示例 3：更改后的全新审计

```bash
# 用户询问："重新审计网站并忽略缓存结果"
squirrel audit https://example.com --refresh --format llm
```

### 示例 4：两步工作流程（重用之前的审计）

```bash
# 首先运行审计
squirrel audit https://example.com
# 从输出中记下审计 ID（例如，"a1b2c3d4"）

# 稍后，以不同格式导出
squirrel report a1b2c3d4 --format llm
```

## 输出

完成后，向用户提供你所做的所有更改的摘要。

## 故障排除

### squirrel 命令未找到

如果你看到此错误，说明 squirrel 未安装或不在你的 PATH 中。

**解决方案：**
1. 安装 squirrel：[squirrelscan.com/download](https://squirrelscan.com/download)
2. 确保 `~/.local/bin` 在 PATH 中
3. 验证：`squirrel --version`

### 权限被拒绝

如果 squirrel 不可执行，请确保二进制文件具有执行权限。从 [squirrelscan.com/download](https://squirrelscan.com/download) 重新安装将解决此问题。

### 爬取超时或性能缓慢

对于非常大的网站，审计可能需要几分钟。使用 `--verbose` 查看进度：

```bash
squirrel audit https://example.com --format llm --verbose
```

### 无效的 URL

确保 URL 包含协议（http:// 或 https://）：

```bash
# ✗ 错误
squirrel audit example.com

# ✓ 正确
squirrel audit https://example.com
```

## 工作原理

1. **爬取**：从基础 URL 开始发现和获取页面
2. **分析**：对每个页面运行审计规则
3. **外部链接**：检查外部链接的可用性
4. **报告**：生成带有发现的 LLM 优化报告

审计存储在本地数据库中，稍后可以使用 `squirrel report` 命令检索。

## 其他资源

- **输出格式参考**：[OUTPUT-FORMAT.md](references/OUTPUT-FORMAT.md)
- **squirrelscan 文档**：https://docs.squirrelscan.com
- **CLI 帮助**：`squirrel audit --help`
