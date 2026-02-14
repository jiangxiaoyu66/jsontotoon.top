# GitHub 高级工作流和最佳实践

## Git Flow 工作流

### 分支模型

```
main (生产环境)
  ├── develop (开发环境)
  │   ├── feature/用户认证
  │   ├── feature/支付集成
  │   └── feature/新功能
  ├── release/v1.0.0 (发布准备)
  └── hotfix/紧急修复 (紧急修复)
```

### 工作流程

1. **功能开发**
   ```bash
   # 从 develop 创建 feature 分支
   git checkout develop
   git pull origin develop
   git checkout -b feature/新功能

   # 开发并提交
   git add .
   git commit -m "feat: 添加新功能"

   # 推送并创建 PR
   git push -u origin feature/新功能
   gh pr create --base develop --title "添加新功能"
   ```

2. **发布准备**
   ```bash
   # 从 develop 创建 release 分支
   git checkout develop
   git checkout -b release/v1.0.0

   # 更新版本号、修复 bug
   git commit -m "chore: 准备 v1.0.0 发布"

   # 合并到 main 和 develop
   git checkout main
   git merge release/v1.0.0
   git tag -a v1.0.0 -m "版本 1.0.0"
   git push origin main --tags

   git checkout develop
   git merge release/v1.0.0
   git push origin develop
   ```

3. **紧急修复**
   ```bash
   # 从 main 创建 hotfix 分支
   git checkout main
   git checkout -b hotfix/紧急修复

   # 修复并提交
   git commit -m "fix: 修复紧急问题"

   # 合并回 main 和 develop
   git checkout main
   git merge hotfix/紧急修复
   git tag -a v1.0.1 -m "版本 1.0.1"
   git push origin main --tags

   git checkout develop
   git merge hotfix/紧急修复
   git push origin develop
   ```

## GitHub Flow 工作流（简化版）

### 分支模型

```
main (始终可部署)
  ├── feature/功能A
  ├── feature/功能B
  └── fix/修复C
```

### 工作流程

1. **创建分支**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/新功能
   ```

2. **开发和提交**
   ```bash
   # 频繁提交
   git add .
   git commit -m "feat: 实现部分功能"
   git push -u origin feature/新功能
   ```

3. **创建 Pull Request**
   ```bash
   gh pr create --title "添加新功能" --body "详细描述"
   ```

4. **代码审查和讨论**
   ```bash
   # 查看 PR 评论
   gh pr view 123

   # 根据反馈修改
   git add .
   git commit -m "fix: 根据审查意见修改"
   git push
   ```

5. **合并和部署**
   ```bash
   # 合并 PR
   gh pr merge 123 --squash --delete-branch
   ```

## Trunk-Based Development

### 特点

- 所有开发直接在 main 分支或短期分支（<2天）
- 频繁集成，持续部署
- 使用 feature flags 控制功能发布

### 工作流程

```bash
# 创建短期分支
git checkout -b short-lived-feature

# 快速开发（<2天）
git add .
git commit -m "feat: 快速实现"

# 立即合并
git checkout main
git merge short-lived-feature
git push origin main

# 删除分支
git branch -d short-lived-feature
```

## 提交信息规范

### Conventional Commits

格式：`<类型>(<范围>): <描述>`

**类型：**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例：**
```bash
git commit -m "feat(auth): 添加 OAuth 登录"
git commit -m "fix(api): 修复用户查询错误"
git commit -m "docs: 更新 README"
git commit -m "refactor(utils): 简化日期处理逻辑"
```

### 详细提交信息

```bash
git commit -m "feat(auth): 添加 OAuth 登录

- 集成 Google OAuth 2.0
- 添加用户会话管理
- 实现自动刷新 token

Closes #123"
```

## 代码审查最佳实践

### 创建高质量 PR

```bash
# 1. 确保分支最新
git checkout main
git pull origin main
git checkout feature/新功能
git rebase main

# 2. 清理提交历史
git rebase -i main

# 3. 运行测试
npm test

# 4. 创建详细的 PR
gh pr create \
  --title "feat: 添加用户认证系统" \
  --body "## 变更内容
- 实现 JWT 认证
- 添加登录/注册接口
- 集成密码加密

## 测试
- [x] 单元测试通过
- [x] 集成测试通过
- [x] 手动测试完成

## 截图
![登录页面](screenshot.png)

Closes #123" \
  --reviewer user1,user2 \
  --label enhancement
```

### 审查 PR

```bash
# 检出 PR 到本地
gh pr checkout 123

# 运行测试
npm test

# 查看更改
gh pr diff 123

# 提供反馈
gh pr review 123 --comment --body "建议：
1. 添加错误处理
2. 优化性能
3. 补充单元测试"

# 批准或请求更改
gh pr review 123 --approve
gh pr review 123 --request-changes --body "需要修复安全问题"
```

## 冲突解决策略

### Rebase 策略（推荐）

```bash
# 更新主分支
git checkout main
git pull origin main

# 切换到功能分支
git checkout feature/新功能

# Rebase 到最新的 main
git rebase main

# 如果有冲突，解决后继续
git add .
git rebase --continue

# 强制推送（因为历史被重写）
git push --force-with-lease
```

### Merge 策略

```bash
# 更新主分支
git checkout main
git pull origin main

# 合并到功能分支
git checkout feature/新功能
git merge main

# 解决冲突
git add .
git commit -m "merge: 解决与 main 的冲突"

# 推送
git push
```

## 大型仓库优化

### 浅克隆

```bash
# 只克隆最近的提交
git clone --depth 1 https://github.com/用户名/仓库名.git

# 只克隆特定分支
git clone --single-branch --branch main https://github.com/用户名/仓库名.git
```

### Sparse Checkout

```bash
# 只检出特定目录
git clone --filter=blob:none --sparse https://github.com/用户名/仓库名.git
cd 仓库名
git sparse-checkout init --cone
git sparse-checkout set src/components
```

### Git LFS（大文件存储）

```bash
# 安装 Git LFS
git lfs install

# 跟踪大文件
git lfs track "*.psd"
git lfs track "*.mp4"

# 提交 .gitattributes
git add .gitattributes
git commit -m "chore: 配置 Git LFS"
```

## 安全实践

### 保护敏感信息

```bash
# 使用 .gitignore
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "secrets/" >> .gitignore

# 如果已经提交了敏感文件
git rm --cached .env
git commit -m "chore: 移除敏感文件"

# 从历史中完全删除（使用 BFG Repo-Cleaner）
bfg --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### 签名提交

```bash
# 配置 GPG 密钥
git config --global user.signingkey 你的密钥ID

# 签名提交
git commit -S -m "feat: 添加新功能"

# 默认签名所有提交
git config --global commit.gpgsign true

# 验证签名
git log --show-signature
```

### 保护分支

```bash
# 使用 GitHub CLI 设置分支保护
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ci/test"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2}'
```

## Monorepo 管理

### 使用子模块

```bash
# 添加子模块
git submodule add https://github.com/用户名/库名.git path/to/submodule

# 克隆包含子模块的仓库
git clone --recurse-submodules https://github.com/用户名/仓库名.git

# 更新子模块
git submodule update --remote --merge
```

### 使用 Git Worktree

```bash
# 创建新的工作树
git worktree add ../feature-branch feature/新功能

# 列出所有工作树
git worktree list

# 删除工作树
git worktree remove ../feature-branch
```

## 自动化工作流

### Git Hooks

```bash
# 创建 pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
npm run lint
npm test
EOF

chmod +x .git/hooks/pre-commit

# 使用 Husky 管理 hooks
npm install --save-dev husky
npx husky install
npx husky add .git/hooks/pre-commit "npm test"
```

### GitHub Actions 集成

```yaml
# .github/workflows/pr-checks.yml
name: PR Checks
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
      - name: Run linter
        run: npm run lint
```

## 团队协作技巧

### Code Owners

```bash
# 创建 CODEOWNERS 文件
cat > .github/CODEOWNERS << 'EOF'
# 默认所有者
* @team-lead

# 前端代码
/src/components/ @frontend-team

# 后端代码
/src/api/ @backend-team

# 文档
/docs/ @tech-writer
EOF
```

### Issue 和 PR 模板

```bash
# 创建 Issue 模板
mkdir -p .github/ISSUE_TEMPLATE
cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: 报告一个 bug
---

## 描述
简要描述 bug

## 重现步骤
1. 步骤 1
2. 步骤 2

## 预期行为
应该发生什么

## 实际行为
实际发生了什么

## 环境
- OS:
- 浏览器:
- 版本:
EOF

# 创建 PR 模板
cat > .github/pull_request_template.md << 'EOF'
## 变更内容
描述这个 PR 的变更

## 相关 Issue
Closes #

## 测试
- [ ] 单元测试
- [ ] 集成测试
- [ ] 手动测试

## 截图
（如果适用）
EOF
```

## 性能优化技巧

### 加速 Git 操作

```bash
# 启用文件系统监控
git config core.fsmonitor true

# 启用并行索引
git config core.preloadindex true

# 启用多线程
git config pack.threads 0

# 启用增量 repack
git config repack.usedeltabaseoffset true
```

### 清理仓库

```bash
# 清理不必要的文件
git gc --aggressive --prune=now

# 查看仓库大小
git count-objects -vH

# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -n 10
```
