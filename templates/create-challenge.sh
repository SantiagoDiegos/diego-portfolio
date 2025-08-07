#!/bin/bash

# Diego's Portfolio - Challenge Creation Script
# Usage: ./create-challenge.sh "binary search algorithm" algorithms easy

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Check if required arguments are provided
if [ $# -lt 3 ]; then
    print_error "Usage: $0 \"challenge-name\" topic difficulty"
    echo ""
    echo "Examples:"
    echo "  $0 \"binary search algorithm\" algorithms easy"
    echo "  $0 \"linear regression analysis\" data-science medium"
    echo "  $0 \"customer segmentation\" data-science hard"
    echo ""
    echo "Topics: algorithms, data-science, statistics"
    echo "Difficulty: easy, medium, hard"
    exit 1
fi

# Get arguments
CHALLENGE_NAME="$1"
TOPIC="$2"
DIFFICULTY="$3"

# Validate topic
if [[ ! "$TOPIC" =~ ^(algorithms|data-science|statistics)$ ]]; then
    print_error "Invalid topic. Use: algorithms, data-science, or statistics"
    exit 1
fi

# Validate difficulty
if [[ ! "$DIFFICULTY" =~ ^(easy|medium|hard)$ ]]; then
    print_error "Invalid difficulty. Use: easy, medium, or hard"
    exit 1
fi

# Generate folder name with timestamp
DATE=$(date +%Y-%m)
FOLDER_NAME="${DATE}-$(echo "$CHALLENGE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"
CHALLENGE_PATH="challenges/$FOLDER_NAME"

print_info "Creating challenge: $CHALLENGE_NAME"
print_info "Folder: $FOLDER_NAME"
print_info "Topic: $TOPIC | Difficulty: $DIFFICULTY"

# Check if folder already exists
if [ -d "$CHALLENGE_PATH" ]; then
    print_error "Challenge folder already exists: $CHALLENGE_PATH"
    exit 1
fi

# Create challenge directory
mkdir -p "$CHALLENGE_PATH"
print_success "Created directory: $CHALLENGE_PATH"

# Create index.html from template
cat > "$CHALLENGE_PATH/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CHALLENGE_TITLE_PLACEHOLDER - Diego's Portfolio</title>
    <link rel="stylesheet" href="../../styles.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">Diego's Portfolio</div>
                <nav>
                    <ul>
                        <li><a href="../../index.html">Home</a></li>
                        <li><a href="../../index.html#about">About</a></li>
                        <li><a href="../../index.html#challenges">Challenges</a></li>
                        <li><button class="theme-toggle" onclick="toggleTheme()">🌓</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <div class="challenge-detail">
                <a href="../../index.html#challenges" class="back-link">
                    ← Back to Challenges
                </a>

                <div class="challenge-detail-header">
                    <h1 class="challenge-detail-title">CHALLENGE_TITLE_PLACEHOLDER</h1>
                    <div class="challenge-detail-meta">
                        <span class="badge difficulty-DIFFICULTY_PLACEHOLDER">DIFFICULTY_UPPER_PLACEHOLDER</span>
                        <span class="badge topic-TOPIC_PLACEHOLDER">TOPIC_UPPER_PLACEHOLDER</span>
                        <span class="challenge-date">DATE_PLACEHOLDER</span>
                    </div>
                    <p class="challenge-detail-description">
                        [Brief description of the challenge/problem]
                    </p>
                </div>

                <div class="challenge-section">
                    <h2>🎯 Problem Description</h2>
                    <p>
                        [Detailed problem description with examples, constraints, etc.]
                    </p>
                </div>

                <div class="challenge-section">
                    <h2>💡 Small Hint</h2>
                    <p>
                        [Your hint for approaching this problem]
                    </p>
                </div>

                <div class="challenge-section">
                    <h2>🚀 My Solution Approach</h2>
                    <p>
                        [Explain your approach, reasoning, and algorithm steps]
                    </p>
                </div>

                <div class="challenge-section">
                    <h2>💻 Code Implementation</h2>
                    <div class="code-block">
<pre>[YOUR CODE HERE]</pre>
                    </div>
                </div>

                <div class="challenge-section">
                    <h2>🎯 Key Takeaways</h2>
                    <p>
                        [What were the most important insights or lessons?]
                    </p>
                    <ul>
                        <li>[Key takeaway 1]</li>
                        <li>[Key takeaway 2]</li>
                        <li>[Key takeaway 3]</li>
                    </ul>
                </div>

                <div class="challenge-section">
                    <h2>🧠 Problem-Solving Strategies Used</h2>
                    <ul>
                        <li>[Strategy 1 you used]</li>
                        <li>[Strategy 2 you used]</li>
                        <li>[Strategy 3 you used]</li>
                    </ul>
                    <p>
                        [Explain your mental approach to solving this]
                    </p>
                </div>

                <div class="challenge-section">
                    <h2>📚 What I Learned</h2>
                    <p>
                        [What new concepts, techniques, or insights did you gain?]
                    </p>

                    <p><strong>Technical learnings:</strong></p>
                    <ul>
                        <li>[Technical lesson 1]</li>
                        <li>[Technical lesson 2]</li>
                    </ul>

                    <p><strong>Problem-solving insights:</strong></p>
                    <ul>
                        <li>[Insight 1]</li>
                        <li>[Insight 2]</li>
                    </ul>
                </div>

            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Diego. Building knowledge one challenge at a time.</p>
        </div>
    </footer>

    <script>
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
        });
    </script>
</body>
</html>
EOF

# Replace placeholders in index.html
CURRENT_DATE=$(date +"%b %d, %Y")
TOPIC_UPPER=$(echo "$TOPIC" | tr '[:lower:]' '[:upper:]')
DIFFICULTY_UPPER=$(echo "$DIFFICULTY" | tr '[:lower:]' '[:upper:]')

sed -i.bak "s/CHALLENGE_TITLE_PLACEHOLDER/$CHALLENGE_NAME/g" "$CHALLENGE_PATH/index.html"
sed -i.bak "s/DIFFICULTY_PLACEHOLDER/$DIFFICULTY/g" "$CHALLENGE_PATH/index.html"
sed -i.bak "s/DIFFICULTY_UPPER_PLACEHOLDER/$DIFFICULTY_UPPER/g" "$CHALLENGE_PATH/index.html"
sed -i.bak "s/TOPIC_PLACEHOLDER/$TOPIC/g" "$CHALLENGE_PATH/index.html"
sed -i.bak "s/TOPIC_UPPER_PLACEHOLDER/$TOPIC_UPPER/g" "$CHALLENGE_PATH/index.html"
sed -i.bak "s/DATE_PLACEHOLDER/$CURRENT_DATE/g" "$CHALLENGE_PATH/index.html"

# Remove backup file
rm "$CHALLENGE_PATH/index.html.bak"

print_success "Created index.html"

# Create metadata.json
cat > "$CHALLENGE_PATH/metadata.json" << EOF
{
  "id": "$FOLDER_NAME",
  "title": "$CHALLENGE_NAME",
  "topic": "$TOPIC",
  "difficulty": "$DIFFICULTY",
  "date": "$(date +%Y-%m-%d)",
  "description": "[Brief description of the challenge/problem]",
  "tags": ["[tag1]", "[tag2]", "[tag3]"],
  "languages": ["python"],
  "timeComplexity": "[e.g., O(n)]",
  "spaceComplexity": "[e.g., O(1)]",
  "estimatedTime": "[e.g., 30 minutes]",
  "keyInsights": [
    "[Key insight 1]",
    "[Key insight 2]",
    "[Key insight 3]"
  ],
  "relatedChallenges": [],
  "resources": [],
  "files": {
    "solution": "solution.py",
    "diagram": null,
    "testCases": null
  },
  "status": "in-progress",
  "lastUpdated": "$(date +%Y-%m-%d)"
}
EOF

print_success "Created metadata.json"

# Create placeholder solution file
cat > "$CHALLENGE_PATH/solution.py" << 'EOF'
# Solution for CHALLENGE_TITLE_PLACEHOLDER
# Author: Diego
# Date: DATE_PLACEHOLDER

def solution():
    """
    [Brief description of what this function does]

    Args:
        [parameter descriptions]

    Returns:
        [return value description]

    Time Complexity: [e.g., O(n)]
    Space Complexity: [e.g., O(1)]
    """
    # Your solution here
    pass

# Test cases
if __name__ == "__main__":
    # Add test cases here
    print("Running tests...")
EOF

# Replace placeholders in solution.py
sed -i.bak "s/CHALLENGE_TITLE_PLACEHOLDER/$CHALLENGE_NAME/g" "$CHALLENGE_PATH/solution.py"
sed -i.bak "s/DATE_PLACEHOLDER/$CURRENT_DATE/g" "$CHALLENGE_PATH/solution.py"
rm "$CHALLENGE_PATH/solution.py.bak"

print_success "Created solution.py template"

# Create README for the challenge
cat > "$CHALLENGE_PATH/README.md" << EOF
# $CHALLENGE_NAME

**Topic:** $TOPIC
**Difficulty:** $DIFFICULTY
**Date:** $CURRENT_DATE

## Files in this directory:
- \`index.html\` - Main challenge page
- \`metadata.json\` - Challenge metadata and configuration
- \`solution.py\` - Python solution (template)
- \`README.md\` - This file

## Adding content:
1. Fill in all \`[placeholder]\` text in index.html
2. Update metadata.json with accurate information
3. Implement your solution in solution.py
4. Add any diagrams or supporting files
5. Update the main index.html with challenge preview

## Adding to main page:
Add this challenge card to the main index.html:

\`\`\`html
<div class="challenge-preview-card" data-difficulty="$DIFFICULTY" data-topic="$TOPIC">
    <div class="challenge-header">
        <div>
            <h3 class="challenge-title">$CHALLENGE_NAME</h3>
            <div class="challenge-meta">
                <span class="badge difficulty-$DIFFICULTY">$DIFFICULTY_UPPER</span>
                <span class="badge topic-$TOPIC">$TOPIC_UPPER</span>
            </div>
        </div>
        <div class="challenge-date">$CURRENT_DATE</div>
    </div>

    <p class="challenge-description">[Brief description here]</p>

    <div class="challenge-preview">
        <div class="preview-section">
            <strong>Strategy:</strong> [Your strategy here]
        </div>
        <div class="preview-section">
            <strong>Key Learning:</strong> [Main insight]
        </div>
    </div>

    <div class="challenge-actions">
        <a href="challenges/$FOLDER_NAME/" class="read-more-btn">Read Full Solution →</a>
    </div>
</div>
\`\`\`
EOF

print_success "Created README.md"

# Final instructions
echo ""
print_success "Challenge created successfully! 🎉"
echo ""
print_info "Next steps:"
echo "  1. Edit $CHALLENGE_PATH/index.html (replace all [placeholder] text)"
echo "  2. Update $CHALLENGE_PATH/metadata.json with accurate info"
echo "  3. Implement your solution in $CHALLENGE_PATH/solution.py"
echo "  4. Add challenge preview to main index.html (see README.md)"
echo "  5. Update stats in the About section"
echo ""
print_info "Challenge URL will be: https://yourusername.github.io/portfolio/challenges/$FOLDER_NAME/"
echo ""
print_warning "Don't forget to test locally before committing!"
echo ""
