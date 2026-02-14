#!/bin/bash
# 完整的创建 GitHub 仓库工作流示例

set -e  # 遇到错误立即退出

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== GitHub 仓库创建工作流 ===${NC}\n"

# 1. 检查 gh CLI 是否已安装
echo -e "${BLUE}步骤 1: 检查 GitHub CLI${NC}"
if ! command -v gh &> /dev/null; then
    echo -e "${RED}错误: GitHub CLI (gh) 未安装${NC}"
    echo "请访问 https://cli.github.com/ 安装"
    exit 1
fi
echo -e "${GREEN}✓ GitHub CLI 已安装${NC}\n"

# 2. 检查登录状态
echo -e "${BLUE}步骤 2: 检查登录状态${NC}"
if ! gh auth status &> /dev/null; then
    echo -e "${RED}未登录 GitHub${NC}"
    echo "正在启动登录流程..."
    gh auth login
fi
echo -e "${GREEN}✓ 已登录 GitHub${NC}\n"

# 3. 获取仓库信息
echo -e "${BLUE}步骤 3: 配置仓库信息${NC}"
read -p "仓库名称: " REPO_NAME
read -p "仓库描述: " REPO_DESC
read -p "是否公开? (y/n): " IS_PUBLIC

if [[ "$IS_PUBLIC" == "y" ]]; then
    VISIBILITY="--public"
else
    VISIBILITY="--private"
fi

echo -e "${GREEN}✓ 配置完成${NC}\n"

# 4. 初始化本地仓库（如果还没有）
echo -e "${BLUE}步骤 4: 初始化本地仓库${NC}"
if [ ! -d ".git" ]; then
    git init
    echo -e "${GREEN}✓ Git 仓库已初始化${NC}"
else
    echo -e "${GREEN}✓ Git 仓库已存在${NC}"
fi
echo ""

# 5. 创建 .gitignore
echo -e "${BLUE}步骤 5: 创建 .gitignore${NC}"
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF
    echo -e "${GREEN}✓ .gitignore 已创建${NC}"
else
    echo -e "${GREEN}✓ .gitignore 已存在${NC}"
fi
echo ""

# 6. 创建 README
echo -e "${BLUE}步骤 6: 创建 README.md${NC}"
if [ ! -f "README.md" ]; then
    cat > README.md << EOF
# $REPO_NAME

$REPO_DESC

## 安装

\`\`\`bash
npm install
\`\`\`

## 使用

\`\`\`bash
npm start
\`\`\`

## 许可证

MIT
EOF
    echo -e "${GREEN}✓ README.md 已创建${NC}"
else
    echo -e "${GREEN}✓ README.md 已存在${NC}"
fi
echo ""

# 7. 初始提交
echo -e "${BLUE}步骤 7: 创建初始提交${NC}"
git add .
if git diff --cached --quiet; then
    echo -e "${GREEN}✓ 没有需要提交的更改${NC}"
else
    git commit -m "chore: initial commit"
    echo -e "${GREEN}✓ 初始提交已创建${NC}"
fi
echo ""

# 8. 创建 GitHub 仓库
echo -e "${BLUE}步骤 8: 创建 GitHub 仓库${NC}"
gh repo create "$REPO_NAME" \
    $VISIBILITY \
    --description "$REPO_DESC" \
    --source=. \
    --remote=origin \
    --push

echo -e "${GREEN}✓ 仓库已创建并推送${NC}\n"

# 9. 获取仓库 URL
REPO_URL=$(gh repo view --json url -q .url)
echo -e "${GREEN}=== 完成! ===${NC}"
echo -e "仓库 URL: ${BLUE}$REPO_URL${NC}"
echo -e "\n可用命令:"
echo -e "  ${BLUE}gh repo view --web${NC}  # 在浏览器中打开"
echo -e "  ${BLUE}git push${NC}             # 推送更改"
echo -e "  ${BLUE}gh pr create${NC}         # 创建 Pull Request"
