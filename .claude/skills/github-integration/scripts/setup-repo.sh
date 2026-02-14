#!/bin/bash
# 自动化仓库初始化脚本
# 用途: 快速设置新项目的 GitHub 仓库，包含最佳实践配置

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 显示帮助信息
show_help() {
    cat << EOF
用法: $0 [选项]

自动化 GitHub 仓库初始化脚本

选项:
    -n, --name NAME         仓库名称 (必需)
    -d, --desc DESC         仓库描述
    -p, --private           创建私有仓库 (默认: 公开)
    -t, --type TYPE         项目类型: node, python, go, rust (默认: node)
    -l, --license LICENSE   许可证类型: MIT, Apache-2.0, GPL-3.0 (默认: MIT)
    -h, --help              显示此帮助信息

示例:
    $0 --name my-project --desc "我的项目" --type node
    $0 -n my-app -d "我的应用" -p -t python

EOF
}

# 默认值
REPO_NAME=""
REPO_DESC=""
IS_PRIVATE=false
PROJECT_TYPE="node"
LICENSE="MIT"

# 解析命令行参数
while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--name)
            REPO_NAME="$2"
            shift 2
            ;;
        -d|--desc)
            REPO_DESC="$2"
            shift 2
            ;;
        -p|--private)
            IS_PRIVATE=true
            shift
            ;;
        -t|--type)
            PROJECT_TYPE="$2"
            shift 2
            ;;
        -l|--license)
            LICENSE="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}错误: 未知选项 $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# 验证必需参数
if [ -z "$REPO_NAME" ]; then
    echo -e "${RED}错误: 必须指定仓库名称${NC}"
    show_help
    exit 1
fi

echo -e "${BLUE}=== GitHub 仓库自动化初始化 ===${NC}\n"

# 1. 检查依赖
echo -e "${BLUE}[1/10] 检查依赖${NC}"
if ! command -v gh &> /dev/null; then
    echo -e "${RED}错误: 未安装 GitHub CLI${NC}"
    exit 1
fi
if ! command -v git &> /dev/null; then
    echo -e "${RED}错误: 未安装 Git${NC}"
    exit 1
fi
echo -e "${GREEN}✓ 依赖检查通过${NC}\n"

# 2. 检查登录状态
echo -e "${BLUE}[2/10] 检查 GitHub 登录状态${NC}"
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}未登录，启动登录流程...${NC}"
    gh auth login
fi
echo -e "${GREEN}✓ 已登录${NC}\n"

# 3. 初始化 Git 仓库
echo -e "${BLUE}[3/10] 初始化 Git 仓库${NC}"
if [ ! -d ".git" ]; then
    git init
    echo -e "${GREEN}✓ Git 仓库已初始化${NC}"
else
    echo -e "${YELLOW}⚠ Git 仓库已存在${NC}"
fi
echo ""

# 4. 创建 .gitignore
echo -e "${BLUE}[4/10] 创建 .gitignore${NC}"
case $PROJECT_TYPE in
    node)
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Production
build/
dist/
.next/
out/

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
pnpm-debug.log*
EOF
        ;;
    python)
        cat > .gitignore << 'EOF'
# Byte-compiled / optimized
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
venv/
env/
ENV/

# Distribution
dist/
build/
*.egg-info/

# Testing
.pytest_cache/
.coverage
htmlcov/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Environment
.env
EOF
        ;;
    go)
        cat > .gitignore << 'EOF'
# Binaries
*.exe
*.exe~
*.dll
*.so
*.dylib
bin/

# Test binary
*.test

# Output
*.out

# Vendor
vendor/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Environment
.env
EOF
        ;;
    rust)
        cat > .gitignore << 'EOF'
# Build
target/
Cargo.lock

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Environment
.env
EOF
        ;;
esac
echo -e "${GREEN}✓ .gitignore 已创建 ($PROJECT_TYPE)${NC}\n"

# 5. 创建 README
echo -e "${BLUE}[5/10] 创建 README.md${NC}"
cat > README.md << EOF
# $REPO_NAME

$REPO_DESC

## 安装

\`\`\`bash
# 安装依赖
EOF

case $PROJECT_TYPE in
    node)
        echo "npm install" >> README.md
        ;;
    python)
        echo "pip install -r requirements.txt" >> README.md
        ;;
    go)
        echo "go mod download" >> README.md
        ;;
    rust)
        echo "cargo build" >> README.md
        ;;
esac

cat >> README.md << EOF
\`\`\`

## 使用

\`\`\`bash
# 运行项目
EOF

case $PROJECT_TYPE in
    node)
        echo "npm start" >> README.md
        ;;
    python)
        echo "python main.py" >> README.md
        ;;
    go)
        echo "go run main.go" >> README.md
        ;;
    rust)
        echo "cargo run" >> README.md
        ;;
esac

cat >> README.md << EOF
\`\`\`

## 开发

\`\`\`bash
# 运行测试
EOF

case $PROJECT_TYPE in
    node)
        echo "npm test" >> README.md
        ;;
    python)
        echo "pytest" >> README.md
        ;;
    go)
        echo "go test ./..." >> README.md
        ;;
    rust)
        echo "cargo test" >> README.md
        ;;
esac

cat >> README.md << EOF
\`\`\`

## 许可证

$LICENSE
EOF

echo -e "${GREEN}✓ README.md 已创建${NC}\n"

# 6. 创建 LICENSE
echo -e "${BLUE}[6/10] 创建 LICENSE${NC}"
case $LICENSE in
    MIT)
        cat > LICENSE << EOF
MIT License

Copyright (c) $(date +%Y)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
        ;;
esac
echo -e "${GREEN}✓ LICENSE 已创建 ($LICENSE)${NC}\n"

# 7. 创建 GitHub Actions 工作流
echo -e "${BLUE}[7/10] 创建 GitHub Actions 工作流${NC}"
mkdir -p .github/workflows

case $PROJECT_TYPE in
    node)
        cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
EOF
        ;;
esac
echo -e "${GREEN}✓ GitHub Actions 工作流已创建${NC}\n"

# 8. 初始提交
echo -e "${BLUE}[8/10] 创建初始提交${NC}"
git add .
git commit -m "chore: initial commit with project setup"
echo -e "${GREEN}✓ 初始提交已创建${NC}\n"

# 9. 创建 GitHub 仓库
echo -e "${BLUE}[9/10] 创建 GitHub 仓库${NC}"
if [ "$IS_PRIVATE" = true ]; then
    VISIBILITY="--private"
else
    VISIBILITY="--public"
fi

gh repo create "$REPO_NAME" \
    $VISIBILITY \
    --description "$REPO_DESC" \
    --source=. \
    --remote=origin \
    --push

echo -e "${GREEN}✓ GitHub 仓库已创建并推送${NC}\n"

# 10. 配置分支保护（可选）
echo -e "${BLUE}[10/10] 配置完成${NC}"
REPO_URL=$(gh repo view --json url -q .url)

echo -e "${GREEN}=== 完成! ===${NC}\n"
echo -e "仓库信息:"
echo -e "  名称: ${BLUE}$REPO_NAME${NC}"
echo -e "  URL: ${BLUE}$REPO_URL${NC}"
echo -e "  类型: ${BLUE}$PROJECT_TYPE${NC}"
echo -e "  许可证: ${BLUE}$LICENSE${NC}"
echo -e "\n后续步骤:"
echo -e "  1. ${BLUE}gh repo view --web${NC}  # 在浏览器中查看"
echo -e "  2. 配置分支保护规则"
echo -e "  3. 添加协作者"
echo -e "  4. 配置 Secrets 和环境变量"
