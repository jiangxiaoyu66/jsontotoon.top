---
name: github-integration
description: This skill should be used when the user asks to "create a GitHub repository", "manage GitHub repo", "create PR", "create pull request", "manage issues", "setup GitHub Actions", "configure workflows", "push to GitHub", "clone from GitHub", or mentions "GitHub operations", "repo management", "CI/CD setup".
version: 1.0.0
license: MIT
---

# GitHub 集成 (GitHub Integration)

## 概述

这个技能提供完整的 GitHub 操作能力，包括仓库管理、分支操作、Pull Request、Issues、GitHub Actions 工作流配置等。使用 GitHub CLI (gh) 和 git 命令实现所有操作。

## 何时使用

当用户需要：
- 创建、克隆、删除 GitHub 仓库
- 管理分支、标签、远程仓库
- 创建和管理 Pull Request
- 创建和管理 Issues
- 配置 GitHub Actions 工作流
- 查看仓库状态和历史
- 管理协作者和权限

## 核心工作流程

### 第 1 步：确认 GitHub CLI 已安装

检查 gh 命令是否可用：

```bash
gh --version
```

如果未安装，根据系统安装：
- Ubuntu/Debian: `sudo apt install gh` 或 `sudo snap install gh`
- macOS: `brew install gh`
- Windows: `winget install GitHub.cli`

### 第 2 步：认证 GitHub

首次使用需要登录：

```bash
gh auth login
```

选择：
- GitHub.com（或 GitHub Enterprise）
- HTTPS 协议
- 使用浏览器或 token 认证

检查登录状态：

```bash
gh auth status
```

### 第 3 步：仓库操作

#### 创建新仓库

```bash
# 创建公开仓库
gh repo create 仓库名 --public

# 创建私有仓库
gh repo create 仓库名 --private

# 从当前目录创建并推送
gh repo create 仓库名 --public --source=. --remote=origin --push

# 创建时添加描述和主页
gh repo create 仓库名 --public --description "描述" --homepage "https://example.com"
```

#### 克隆仓库

```bash
# 克隆自己的仓库
gh repo clone 仓库名

# 克隆其他用户的仓库
gh repo clone 用户名/仓库名

# 克隆到指定目录
gh repo clone 仓库名 目标目录
```

#### 查看仓库信息

```bash
# 查看当前仓库信息
gh repo view

# 查看指定仓库
gh repo view 用户名/仓库名

# 在浏览器中打开
gh repo view --web
```

#### 管理远程仓库

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/用户名/仓库名.git

# 修改远程仓库 URL
git remote set-url origin https://github.com/用户名/仓库名.git

# 删除远程仓库
git remote remove origin
```

### 第 4 步：分支和提交操作

#### 分支管理

```bash
# 查看所有分支
git branch -a

# 创建新分支
git checkout -b 分支名

# 切换分支
git checkout 分支名

# 删除本地分支
git branch -d 分支名

# 删除远程分支
git push origin --delete 分支名

# 推送新分支到远程
git push -u origin 分支名
```

#### 提交代码

```bash
# 查看状态
git status

# 添加文件到暂存区
git add .
git add 文件名

# 提交更改
git commit -m "提交信息"

# 推送到远程
git push

# 强制推送（谨慎使用）
git push --force
```

### 第 5 步：Pull Request 操作

#### 创建 PR

```bash
# 从当前分支创建 PR
gh pr create

# 指定标题和正文
gh pr create --title "标题" --body "描述"

# 指定目标分支
gh pr create --base main --head feature-branch

# 创建草稿 PR
gh pr create --draft

# 指定审阅者
gh pr create --reviewer 用户名1,用户名2

# 添加标签
gh pr create --label bug,enhancement
```

#### 查看 PR

```bash
# 列出所有 PR
gh pr list

# 查看特定 PR
gh pr view 123

# 在浏览器中查看
gh pr view 123 --web

# 查看 PR 的 diff
gh pr diff 123

# 查看 PR 的检查状态
gh pr checks 123
```

#### 管理 PR

```bash
# 合并 PR
gh pr merge 123

# 使用 squash 合并
gh pr merge 123 --squash

# 使用 rebase 合并
gh pr merge 123 --rebase

# 关闭 PR
gh pr close 123

# 重新打开 PR
gh pr reopen 123

# 审阅 PR
gh pr review 123 --approve
gh pr review 123 --request-changes --body "需要修改的内容"
gh pr review 123 --comment --body "评论内容"
```

#### 检出 PR

```bash
# 检出 PR 到本地分支
gh pr checkout 123

# 查看 PR 的提交
gh pr view 123 --json commits
```

### 第 6 步：Issues 操作

#### 创建 Issue

```bash
# 交互式创建
gh issue create

# 指定标题和正文
gh issue create --title "标题" --body "描述"

# 添加标签
gh issue create --label bug,help-wanted

# 指定负责人
gh issue create --assignee 用户名
```

#### 查看 Issues

```bash
# 列出所有 issues
gh issue list

# 查看特定 issue
gh issue view 123

# 在浏览器中查看
gh issue view 123 --web

# 筛选 issues
gh issue list --label bug
gh issue list --assignee @me
gh issue list --state closed
```

#### 管理 Issues

```bash
# 关闭 issue
gh issue close 123

# 重新打开 issue
gh issue reopen 123

# 添加评论
gh issue comment 123 --body "评论内容"

# 编辑 issue
gh issue edit 123 --title "新标题"
gh issue edit 123 --add-label enhancement
```

### 第 7 步：GitHub Actions 工作流

#### 查看工作流

```bash
# 列出所有工作流
gh workflow list

# 查看工作流运行
gh run list

# 查看特定运行的详情
gh run view 运行ID

# 查看运行日志
gh run view 运行ID --log

# 在浏览器中查看
gh run view 运行ID --web
```

#### 触发工作流

```bash
# 手动触发工作流
gh workflow run 工作流名称

# 传递输入参数
gh workflow run 工作流名称 --field key=value
```

#### 管理工作流运行

```bash
# 取消运行
gh run cancel 运行ID

# 重新运行
gh run rerun 运行ID

# 下载构建产物
gh run download 运行ID
```

### 第 8 步：其他常用操作

#### 查看提交历史

```bash
# 查看提交日志
git log --oneline --graph --all

# 查看特定文件的历史
git log --follow 文件名

# 查看某个提交的详情
git show 提交哈希
```

#### 标签管理

```bash
# 创建标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
```

#### 查看差异

```bash
# 查看工作区和暂存区的差异
git diff

# 查看暂存区和最后一次提交的差异
git diff --staged

# 查看两个分支的差异
git diff branch1..branch2

# 查看两个提交的差异
git diff commit1 commit2
```

## 安全最佳实践

### 提交前检查

- 始终先运行 `git status` 查看将要提交的内容
- 使用 `git diff` 检查具体更改
- 避免提交敏感信息（密码、密钥、token）

### 分支策略

- 主分支（main/master）保持稳定
- 功能开发使用 feature 分支
- 修复 bug 使用 hotfix 分支
- 合并前进行代码审查

### 强制推送警告

- 避免使用 `git push --force`，除非完全理解后果
- 如果必须强制推送，使用 `git push --force-with-lease` 更安全
- 永远不要强制推送到共享分支

### 敏感数据处理

- 使用 `.gitignore` 排除敏感文件
- 使用环境变量存储密钥
- 如果不小心提交了敏感数据，立即撤销并修改密钥

## 附加资源

### 参考文件

- **`references/advanced-workflows.md`** - 高级工作流和最佳实践
- **`references/github-actions-templates.md`** - 常用 GitHub Actions 模板
- **`references/git-commands-reference.md`** - Git 命令速查表

### 示例

- **`examples/create-repo-workflow.sh`** - 完整的创建仓库工作流示例
- **`examples/pr-workflow.sh`** - Pull Request 工作流示例
- **`examples/ci-cd-setup.yml`** - CI/CD 配置示例

### 脚本

- **`scripts/setup-repo.sh`** - 自动化仓库初始化脚本
- **`scripts/sync-fork.sh`** - 同步 fork 仓库的脚本

## 常见问题

### 认证问题

如果遇到认证错误：
1. 检查登录状态：`gh auth status`
2. 重新登录：`gh auth login`
3. 检查 token 权限是否足够

### 推送被拒绝

如果推送被拒绝：
1. 先拉取远程更改：`git pull --rebase`
2. 解决冲突（如果有）
3. 再次推送：`git push`

### 合并冲突

解决合并冲突：
1. 查看冲突文件：`git status`
2. 手动编辑冲突文件
3. 标记为已解决：`git add 文件名`
4. 完成合并：`git commit`

## 快速参考

### 常用命令速查

```bash
# 仓库操作
gh repo create 名称 --public --source=. --push
gh repo clone 用户名/仓库名
gh repo view --web

# PR 操作
gh pr create --title "标题" --body "描述"
gh pr list
gh pr merge 123 --squash

# Issue 操作
gh issue create --title "标题" --body "描述"
gh issue list
gh issue close 123

# 分支操作
git checkout -b 新分支
git push -u origin 新分支
git branch -d 旧分支

# 提交操作
git add .
git commit -m "提交信息"
git push
```
