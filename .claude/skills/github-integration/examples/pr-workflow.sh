#!/bin/bash
# Pull Request 完整工作流示例

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=== Pull Request 工作流 ===${NC}\n"

# 1. 确保在正确的分支
echo -e "${BLUE}步骤 1: 检查当前分支${NC}"
CURRENT_BRANCH=$(git branch --show-current)
echo "当前分支: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" == "main" ] || [ "$CURRENT_BRANCH" == "master" ]; then
    echo -e "${YELLOW}警告: 你在主分支上${NC}"
    read -p "是否创建新的功能分支? (y/n): " CREATE_BRANCH

    if [ "$CREATE_BRANCH" == "y" ]; then
        read -p "新分支名称 (例如: feature/新功能): " BRANCH_NAME
        git checkout -b "$BRANCH_NAME"
        echo -e "${GREEN}✓ 已创建并切换到分支: $BRANCH_NAME${NC}"
    fi
fi
echo ""

# 2. 更新主分支
echo -e "${BLUE}步骤 2: 更新主分支${NC}"
MAIN_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)
echo "主分支: $MAIN_BRANCH"

git fetch origin
git merge origin/$MAIN_BRANCH
echo -e "${GREEN}✓ 已同步最新代码${NC}\n"

# 3. 查看更改
echo -e "${BLUE}步骤 3: 查看更改${NC}"
git status
echo ""

# 4. 运行测试
echo -e "${BLUE}步骤 4: 运行测试${NC}"
if [ -f "package.json" ]; then
    if grep -q '"test"' package.json; then
        echo "运行测试..."
        npm test || {
            echo -e "${YELLOW}警告: 测试失败${NC}"
            read -p "是否继续? (y/n): " CONTINUE
            if [ "$CONTINUE" != "y" ]; then
                exit 1
            fi
        }
        echo -e "${GREEN}✓ 测试通过${NC}"
    fi
fi
echo ""

# 5. 提交更改
echo -e "${BLUE}步骤 5: 提交更改${NC}"
if ! git diff --cached --quiet; then
    echo "已暂存的文件:"
    git diff --cached --name-only
    echo ""
    read -p "提交信息: " COMMIT_MSG
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✓ 已提交${NC}"
elif ! git diff --quiet; then
    echo "未暂存的更改:"
    git diff --name-only
    echo ""
    read -p "是否暂存所有更改? (y/n): " STAGE_ALL
    if [ "$STAGE_ALL" == "y" ]; then
        git add .
        read -p "提交信息: " COMMIT_MSG
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✓ 已提交${NC}"
    fi
else
    echo -e "${GREEN}✓ 没有需要提交的更改${NC}"
fi
echo ""

# 6. 推送分支
echo -e "${BLUE}步骤 6: 推送到远程${NC}"
CURRENT_BRANCH=$(git branch --show-current)
git push -u origin "$CURRENT_BRANCH"
echo -e "${GREEN}✓ 已推送到 origin/$CURRENT_BRANCH${NC}\n"

# 7. 创建 Pull Request
echo -e "${BLUE}步骤 7: 创建 Pull Request${NC}"
read -p "PR 标题: " PR_TITLE
read -p "PR 描述: " PR_DESC
read -p "是否为草稿 PR? (y/n): " IS_DRAFT

if [ "$IS_DRAFT" == "y" ]; then
    DRAFT_FLAG="--draft"
else
    DRAFT_FLAG=""
fi

# 询问是否添加审阅者
read -p "添加审阅者 (用逗号分隔，留空跳过): " REVIEWERS
if [ -n "$REVIEWERS" ]; then
    REVIEWER_FLAG="--reviewer $REVIEWERS"
else
    REVIEWER_FLAG=""
fi

# 询问是否添加标签
read -p "添加标签 (用逗号分隔，留空跳过): " LABELS
if [ -n "$LABELS" ]; then
    LABEL_FLAG="--label $LABELS"
else
    LABEL_FLAG=""
fi

# 创建 PR
gh pr create \
    --title "$PR_TITLE" \
    --body "$PR_DESC" \
    $DRAFT_FLAG \
    $REVIEWER_FLAG \
    $LABEL_FLAG

echo -e "${GREEN}✓ Pull Request 已创建${NC}\n"

# 8. 显示 PR 信息
echo -e "${BLUE}步骤 8: PR 信息${NC}"
PR_NUMBER=$(gh pr view --json number -q .number)
PR_URL=$(gh pr view --json url -q .url)

echo -e "PR #$PR_NUMBER"
echo -e "URL: ${BLUE}$PR_URL${NC}"
echo ""

# 9. 后续操作提示
echo -e "${GREEN}=== 完成! ===${NC}"
echo -e "\n可用命令:"
echo -e "  ${BLUE}gh pr view --web${NC}           # 在浏览器中查看"
echo -e "  ${BLUE}gh pr checks${NC}               # 查看 CI 状态"
echo -e "  ${BLUE}gh pr diff${NC}                 # 查看差异"
echo -e "  ${BLUE}gh pr ready${NC}                # 标记为准备审查"
echo -e "  ${BLUE}gh pr merge --squash${NC}       # 合并 PR"
