# Git 命令速查表

## 基础命令

### 配置

```bash
# 设置用户信息
git config --global user.name "你的名字"
git config --global user.email "your@email.com"

# 查看配置
git config --list
git config user.name

# 设置默认编辑器
git config --global core.editor "vim"

# 设置默认分支名
git config --global init.defaultBranch main
```

### 初始化和克隆

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone https://github.com/用户名/仓库名.git

# 克隆到指定目录
git clone https://github.com/用户名/仓库名.git 目录名

# 浅克隆（只克隆最近的提交）
git clone --depth 1 https://github.com/用户名/仓库名.git
```

## 基本操作

### 查看状态

```bash
# 查看工作区状态
git status

# 简洁输出
git status -s

# 查看差异
git diff                    # 工作区 vs 暂存区
git diff --staged          # 暂存区 vs 最后一次提交
git diff HEAD              # 工作区 vs 最后一次提交
git diff branch1..branch2  # 两个分支的差异
```

### 添加和提交

```bash
# 添加文件到暂存区
git add 文件名
git add .                  # 添加所有更改
git add *.js              # 添加所有 .js 文件
git add -p                # 交互式添加

# 提交
git commit -m "提交信息"
git commit -am "提交信息"  # 添加并提交已跟踪文件
git commit --amend        # 修改最后一次提交

# 撤销操作
git restore 文件名         # 撤销工作区更改
git restore --staged 文件名 # 取消暂存
git reset HEAD~1          # 撤销最后一次提交（保留更改）
git reset --hard HEAD~1   # 撤销最后一次提交（丢弃更改）
```

## 分支操作

### 查看分支

```bash
# 查看本地分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 查看远程分支
git branch -r

# 查看分支详细信息
git branch -v
git branch -vv  # 显示跟踪关系
```

### 创建和切换分支

```bash
# 创建分支
git branch 分支名

# 切换分支
git checkout 分支名
git switch 分支名  # 新命令

# 创建并切换分支
git checkout -b 分支名
git switch -c 分支名  # 新命令

# 从远程分支创建本地分支
git checkout -b 本地分支名 origin/远程分支名
```

### 合并和删除分支

```bash
# 合并分支
git merge 分支名

# 取消合并
git merge --abort

# 删除本地分支
git branch -d 分支名      # 安全删除
git branch -D 分支名      # 强制删除

# 删除远程分支
git push origin --delete 分支名
```

## 远程操作

### 远程仓库管理

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/用户名/仓库名.git

# 修改远程仓库 URL
git remote set-url origin https://github.com/用户名/仓库名.git

# 删除远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename old-name new-name
```

### 拉取和推送

```bash
# 拉取远程更改
git pull                   # 拉取并合并
git pull --rebase         # 拉取并 rebase

# 获取远程更改（不合并）
git fetch
git fetch origin
git fetch --all

# 推送到远程
git push
git push origin 分支名
git push -u origin 分支名  # 设置上游分支
git push --force-with-lease  # 安全的强制推送
git push --all            # 推送所有分支
git push --tags           # 推送所有标签
```

## 历史和日志

### 查看提交历史

```bash
# 查看提交日志
git log

# 简洁输出
git log --oneline

# 图形化显示
git log --graph --oneline --all

# 查看最近 N 次提交
git log -n 5

# 查看特定文件的历史
git log -- 文件名
git log --follow 文件名  # 跟踪重命名

# 查看提交详情
git show 提交哈希
git show HEAD
git show HEAD~2  # 倒数第三次提交
```

### 搜索历史

```bash
# 搜索提交信息
git log --grep="关键词"

# 搜索代码更改
git log -S "代码片段"

# 查看谁修改了文件
git blame 文件名

# 查看文件的每一行最后修改信息
git annotate 文件名
```

## 标签

```bash
# 查看标签
git tag
git tag -l "v1.*"  # 筛选标签

# 创建轻量标签
git tag v1.0.0

# 创建附注标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 给特定提交打标签
git tag -a v1.0.0 提交哈希 -m "版本 1.0.0"

# 推送标签
git push origin v1.0.0
git push --tags  # 推送所有标签

# 删除标签
git tag -d v1.0.0              # 删除本地标签
git push origin --delete v1.0.0  # 删除远程标签
```

## 高级操作

### Rebase

```bash
# Rebase 到指定分支
git rebase main

# 交互式 rebase
git rebase -i HEAD~3

# 继续 rebase
git rebase --continue

# 跳过当前提交
git rebase --skip

# 取消 rebase
git rebase --abort
```

### Cherry-pick

```bash
# 应用特定提交
git cherry-pick 提交哈希

# 应用多个提交
git cherry-pick 提交1 提交2

# 应用提交范围
git cherry-pick 开始提交..结束提交
```

### Stash（暂存）

```bash
# 暂存当前更改
git stash
git stash save "描述"

# 查看暂存列表
git stash list

# 应用暂存
git stash apply           # 应用最新暂存
git stash apply stash@{0}  # 应用特定暂存

# 应用并删除暂存
git stash pop

# 删除暂存
git stash drop stash@{0}
git stash clear  # 清空所有暂存
```

### Reset 和 Revert

```bash
# Reset（重置到特定提交）
git reset --soft HEAD~1   # 保留更改在暂存区
git reset --mixed HEAD~1  # 保留更改在工作区（默认）
git reset --hard HEAD~1   # 丢弃所有更改

# Revert（创建新提交来撤销）
git revert 提交哈希
git revert HEAD
git revert HEAD~3..HEAD  # 撤销多个提交
```

### Clean（清理）

```bash
# 查看将被删除的文件
git clean -n

# 删除未跟踪的文件
git clean -f

# 删除未跟踪的文件和目录
git clean -fd

# 删除被忽略的文件
git clean -fX

# 删除所有未跟踪和被忽略的文件
git clean -fx
```

## 子模块

```bash
# 添加子模块
git submodule add https://github.com/用户名/仓库名.git path/to/submodule

# 初始化子模块
git submodule init

# 更新子模块
git submodule update
git submodule update --remote  # 更新到最新

# 克隆包含子模块的仓库
git clone --recurse-submodules https://github.com/用户名/仓库名.git

# 查看子模块状态
git submodule status
```

## 工作树（Worktree）

```bash
# 创建新工作树
git worktree add ../feature-branch feature/新功能

# 列出所有工作树
git worktree list

# 删除工作树
git worktree remove ../feature-branch

# 清理工作树
git worktree prune
```

## 性能优化

```bash
# 垃圾回收
git gc

# 积极的垃圾回收
git gc --aggressive --prune=now

# 查看仓库大小
git count-objects -vH

# 验证仓库完整性
git fsck

# 优化仓库
git repack -a -d --depth=250 --window=250
```

## 调试

```bash
# 二分查找问题提交
git bisect start
git bisect bad          # 标记当前提交为坏的
git bisect good 提交哈希  # 标记已知好的提交
# Git 会自动切换到中间提交，测试后标记
git bisect good/bad
# 找到问题提交后
git bisect reset

# 查看引用日志
git reflog

# 恢复丢失的提交
git reflog
git checkout 提交哈希
```

## 别名

```bash
# 设置别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg 'log --graph --oneline --all'
```

## 常用组合命令

```bash
# 撤销最后一次提交并重新提交
git reset --soft HEAD~1
git commit -m "新的提交信息"

# 修改最后一次提交的作者
git commit --amend --author="Name <email@example.com>"

# 查看两个分支的差异文件列表
git diff --name-only branch1..branch2

# 查看未推送的提交
git log origin/main..HEAD

# 查看未合并的分支
git branch --no-merged

# 删除已合并的分支
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d

# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -n 10
```

## GitHub CLI 命令

```bash
# 仓库操作
gh repo create 名称 --public
gh repo clone 用户名/仓库名
gh repo view --web

# PR 操作
gh pr create --title "标题" --body "描述"
gh pr list
gh pr view 123
gh pr merge 123 --squash

# Issue 操作
gh issue create --title "标题"
gh issue list
gh issue view 123
gh issue close 123

# 工作流操作
gh workflow list
gh run list
gh run view 运行ID --log
```
