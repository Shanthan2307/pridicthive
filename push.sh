#!/bin/bash

# PredictHive - Push to GitHub Script
# Usage: ./push.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
    echo "❌ Error: GitHub username required"
    echo "Usage: ./push.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

USERNAME=$1
REPO_NAME="predicthive"

echo "🚀 Pushing PredictHive to GitHub..."
echo "📦 Repository: https://github.com/$USERNAME/$REPO_NAME"
echo ""

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' already exists. Removing..."
    git remote remove origin
fi

# Add remote
echo "➕ Adding remote repository..."
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"

# Show remote
echo "✅ Remote added:"
git remote -v

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository at:"
    echo "   https://github.com/$USERNAME/$REPO_NAME"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Add repository topics (nextjs, react, typescript, galaga)"
    echo "   2. Add a description"
    echo "   3. Enable GitHub Pages (optional)"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. Repository exists on GitHub"
    echo "   2. You have push access"
    echo "   3. Your GitHub credentials are correct"
fi
