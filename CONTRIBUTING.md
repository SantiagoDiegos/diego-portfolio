# Contributing Guidelines

Thank you for contributing to Diego's Portfolio! This guide will help you understand our standards and workflow.

## 🎯 Content Quality Standards

### Challenge Content Requirements
Every challenge submission must be **complete and thoughtful**. We prioritize quality over quantity.

**Required Sections (All Must Be Filled):**
- [ ] Problem Description (with examples and constraints)
- [ ] Small Hint (guidance without spoilers)
- [ ] Solution Approach (your thinking process)
- [ ] Code Implementation (clean, commented)
- [ ] Key Takeaways (specific insights)
- [ ] Problem-Solving Strategies (mental approach)
- [ ] What I Learned (technical + conceptual)

### Writing Quality Checklist
- [ ] **Clear and conversational** tone
- [ ] **Specific examples** rather than vague statements
- [ ] **Personal insights** - what did YOU learn?
- [ ] **Proper grammar** and spelling
- [ ] **Code is tested** and actually works
- [ ] **Honest reflection** - include struggles and "aha" moments

## 📂 File Organization

### Naming Conventions

**Challenge Folders:**
```
Format: challenges/YYYY-MM-descriptive-name/
Examples:
✅ challenges/2025-01-two-sum-problem/
✅ challenges/2025-01-binary-search-recursive/  
✅ challenges/2025-01-linear-regression-analysis/
✅ challenges/2025-02-k-means-clustering-sklearn/

❌ challenges/challenge1/
❌ challenges/TwoSum/
❌ challenges/my-new-challenge/
```

**Topics (must use exactly these):**
- `algorithms`
- `data-science`
- `statistics`
- `machine-learning` (if we add this category)

**Difficulty Levels:**
- `easy` - Can be solved in 15-30 minutes
- `medium` - Requires 30-90 minutes of thought
- `hard` - Complex, multi-step, or advanced concepts

### File Placement
```
✅ Individual folders: challenges/2025-01-two-sum-problem/index.html
❌ Root directory: challenges/two-sum-problem.html
```

## 💻 Code Standards

### Python Code Style
```python
# ✅ GOOD - Clean, documented, tested
def binary_search(arr, target):
    """
    Search for target in sorted array using binary search.

    Args:
        arr: Sorted list of integers
        target: Value to search for

    Returns:
        Index of target if found, -1 otherwise

    Time: O(log n), Space: O(1)
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Test the function
test_arr = [1, 3, 5, 7, 9, 11]
assert binary_search(test_arr, 7) == 3
assert binary_search(test_arr, 12) == -1
```

### What Makes Code "Good"
- [ ] **Clear variable names** (`left, right` not `l, r`)
- [ ] **Docstrings** with Args, Returns, Time/Space complexity
- [ ] **Comments** explaining non-obvious logic
- [ ] **Consistent formatting** (follow PEP 8 for Python)
- [ ] **Working examples** with test cases
- [ ] **Edge cases mentioned** (empty arrays, single elements, etc.)

## 🔄 Workflow Process

### 1. Before Starting
```bash
# Pull latest changes
git pull origin main

# Test site locally
open index.html  # Mac
start index.html # Windows
```

### 2. Creating a Challenge
```bash
# Use automation script (recommended)
./templates/create-challenge.sh "dijkstra algorithm" algorithms medium

# This creates complete folder with all templates ready
# Just fill in the [placeholder] content!

# Manual method:
mkdir challenges/2025-01-your-challenge-name/
cp challenge-template.html challenges/2025-01-your-challenge-name/index.html
# Edit and customize
```

### 3. Quality Check
**Self-Review Checklist:**
- [ ] All `[PLACEHOLDER]` text replaced
- [ ] Challenge link works from main page
- [ ] Back button works
- [ ] Theme toggle works
- [ ] Search finds your challenge
- [ ] Filters work correctly
- [ ] No broken links
- [ ] Code examples are formatted properly
- [ ] Mobile responsive (test on phone)

### 4. Commit Standards
**Commit Message Format:**
```
Add [challenge-name] challenge

- Brief description of the problem
- Key techniques used
- Any special notes

Example:
Add binary search implementation challenge

- Covers both recursive and iterative approaches
- Includes time/space complexity analysis  
- Added comprehensive test cases
```

**Good Commit Messages:**
```
✅ Add merge sort algorithm challenge
✅ Fix filter bug for data-science category
✅ Update README with new naming conventions
✅ Improve mobile responsiveness for challenge cards
```

**Bad Commit Messages:**
```
❌ new challenge
❌ fix stuff
❌ update
❌ wip
```

## 🎨 Design Guidelines

### Visual Consistency
- **Use existing CSS classes** - don't create new ones unless necessary
- **Follow the color scheme** - don't introduce new colors
- **Maintain spacing** - use consistent padding/margins
- **Icons** - stick to emoji for simplicity (🎯, 💡, 🚀, etc.)

### Content Structure
**Challenge Preview Cards (in index.html):**
```html
<div class="challenge-preview-card" data-difficulty="easy" data-topic="algorithms">
    <div class="challenge-header">
        <div>
            <h3 class="challenge-title">Descriptive Title</h3>
            <div class="challenge-meta">
                <span class="badge difficulty-easy">EASY</span>
                <span class="badge topic-algorithms">ALGORITHMS</span>
            </div>
        </div>
        <div class="challenge-date">MMM DD, YYYY</div>
    </div>

    <p class="challenge-description">One sentence problem summary.</p>

    <div class="challenge-preview">
        <div class="preview-section">
            <strong>Strategy:</strong> Brief strategy description
        </div>
        <div class="preview-section">
            <strong>Key Learning:</strong> Main insight gained
        </div>
    </div>

    <div class="challenge-actions">
        <a href="challenges/2025-01-your-challenge-name/" class="read-more-btn">Read Full Solution →</a>
    </div>
</div>
```

## 🧪 Testing Checklist

**Before Submitting:**
- [ ] **Desktop browsers** - Chrome, Firefox, Safari, Edge
- [ ] **Mobile devices** - iOS Safari, Chrome Mobile
- [ ] **All links work** (navigation, back buttons, external links)
- [ ] **Themes toggle** properly (light/dark)
- [ ] **Filters work** (difficulty and topic)
- [ ] **Search finds** your challenge
- [ ] **Stats update** correctly in About section
- [ ] **Responsive design** looks good on all screen sizes
- [ ] **Load time** is reasonable (< 3 seconds)

## 🚫 Common Mistakes to Avoid

### Content Issues
- **Generic descriptions** - "This is a good problem" vs "This problem teaches hash map optimization"
- **Missing personal insights** - Include YOUR learning journey
- **Copy-paste solutions** - Write it in your own words
- **No examples** - Always include concrete examples
- **Vague takeaways** - Be specific about what you learned

### Technical Issues
- **Wrong data attributes** - `data-difficulty="Easy"` should be `data-difficulty="easy"`
- **Broken links** - Always test links after creating new folders
- **Missing updates** - Forgetting to update stats in index.html
- **Inconsistent naming** - Mixing camelCase and kebab-case

### Process Issues
- **Skipping testing** - Always test before committing
- **Large commits** - Keep commits focused and atomic
- **No documentation** - Update README when adding new features
- **Direct to main** - Consider using branches for large changes

## 🆘 Getting Help

**Stuck on something?**
1. Check this guide first
2. Look at existing challenges as examples
3. Check the README.md
4. Test in a fresh browser (incognito mode)
5. Ask for help with specific questions

**Questions to Include When Asking for Help:**
- What specifically are you trying to do?
- What did you expect to happen?
- What actually happened?
- What have you already tried?
- Include relevant code snippets

## 🎯 Quality Over Quantity

We'd rather have **5 excellent challenges** than 20 mediocre ones. Each challenge should:
- Teach something valuable
- Show genuine learning and reflection
- Be well-written and tested
- Follow our standards consistently

**Remember:** This portfolio represents professional work. Every challenge should be something you're proud to show potential employers or collaborators.

---

**Questions?** Open an issue or reach out directly. Let's build something amazing together! 🚀
