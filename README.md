# Diego's Algorithm & Data Science Portfolio

A professional portfolio website showcasing learning challenges in algorithms, data science, and statistical analysis. Built with vanilla HTML, CSS, and JavaScript for GitHub Pages deployment.

## 🚀 Live Site
[Visit Portfolio](https://yourusername.github.io/diego-portfolio)

## 📁 Project Structure
```
diego-portfolio/
├── index.html                          # Main homepage
├── styles.css                          # Global stylesheet
├── main.js                            # Core JavaScript functionality
├── challenge-template.html             # Template for new challenges
├── .prettierrc                        # Code formatting config
├── .gitignore                         # Git ignore rules
├── README.md                          # This file
├── CONTRIBUTING.md                    # Team guidelines
│
├── challenges/                         # Individual challenge folders
│   ├── 2025-01-two-sum-problem/
│   │   ├── index.html                 # Challenge page
│   │   ├── metadata.json             # Challenge data
│   │   ├── solution.py               # Code solution
│   │   ├── diagram.png               # Supporting images
│   │   └── README.md                 # Challenge docs
│   │
│   └── 2025-01-binary-search-algorithm/
│       ├── index.html
│       ├── metadata.json
│       ├── recursive.py
│       ├── iterative.py
│       └── tree-visualization.png
│
├── templates/                          # Automation tools
│   ├── create-challenge.sh            # Challenge creation script
│   └── metadata-template.json         # Metadata template
│
└── docs/                              # Documentation
    ├── STYLE_GUIDE.md
    ├── DEPLOYMENT.md
    └── PROJECT_CHECKLIST.md
```

## 🛠 Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **Vanilla JavaScript** - No frameworks for simplicity
- **GitHub Pages** - Free hosting

## 🎯 Key Features
- ✅ Individual challenge folders for scalability
- ✅ Responsive design (mobile-first)
- ✅ Dark/Light theme toggle
- ✅ Advanced filtering (difficulty + topic)
- ✅ Search functionality
- ✅ SEO-friendly URLs
- ✅ Fast loading (no external dependencies)
- ✅ Professional automation tools

## 📝 Adding New Challenges

### Quick Start (Recommended)
```bash
# Use the automation script
./templates/create-challenge.sh "challenge name" topic difficulty

# Examples:
./templates/create-challenge.sh "binary search" algorithms easy
./templates/create-challenge.sh "linear regression" data-science medium
./templates/create-challenge.sh "hypothesis testing" statistics hard
```

### Manual Method
```bash
# Create folder with timestamp
mkdir challenges/2025-01-your-challenge-name

# Copy template
cp challenge-template.html challenges/2025-01-your-challenge-name/index.html

# Edit and customize
```

### Update Main Page
After creating a challenge:
1. Fill in all `[placeholder]` content in the challenge page
2. Add challenge preview card to `index.html`
3. Update stats counters in About section
4. Test locally before committing

## 🎨 Content Standards

### Challenge Structure
Every challenge includes these sections:
1. **🎯 Problem Description** - Clear problem statement with examples
2. **💡 Small Hint** - Gentle guidance without giving away solution
3. **🚀 My Solution Approach** - Your thinking process and strategy
4. **💻 Code Implementation** - Clean, commented code
5. **🎯 Key Takeaways** - Most important lessons learned
6. **🧠 Problem-Solving Strategies Used** - Mental approach taken
7. **📚 What I Learned** - Technical and conceptual insights

### Naming Convention
```
✅ Good: challenges/2025-01-binary-search-algorithm/
✅ Good: challenges/2025-01-linear-regression-analysis/
✅ Good: challenges/2025-02-merge-sort-optimization/

❌ Bad: challenges/challenge1/
❌ Bad: challenges/MyNewChallenge/
❌ Bad: challenges/binarySearch/
```

### Topics and Difficulty
**Topics:** `algorithms`, `data-science`, `statistics`
**Difficulty:** `easy`, `medium`, `hard`

## 🔧 Development Workflow

### Before You Start
```bash
# Pull latest changes
git pull origin main

# Test the site locally
open index.html  # Mac
start index.html  # Windows
```

### Creating a Challenge
1. Use automation script or create manually
2. Fill in all content (no placeholders left)
3. Add challenge preview to main page
4. Update stats in About section
5. Test everything locally
6. Commit with clear message

### Deployment
- **GitHub Pages deploys automatically** from main branch
- Changes are live within 5-10 minutes
- Test thoroughly before pushing to main

## 📱 Browser Support
- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)  
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Goals
- ⚡ First load: < 2 seconds
- ⚡ Theme toggle: < 0.3 seconds
- ⚡ Filter/Search: < 0.5 seconds
- 📱 Mobile-first responsive design
- 🔍 SEO score: 90+ (Lighthouse)

## 🐛 Common Issues & Solutions

**Theme not saving:**
- Check localStorage is enabled in browser
- Clear browser cache and try again

**Filters not working:**
- Ensure data attributes match filter values exactly
- Check for typos in `data-difficulty` and `data-topic`

**Challenge page not loading:**
- Check folder name matches link in `index.html` exactly
- Verify proper HTML structure
- Ensure all paths use `../../` for deeper nesting

**Styling broken:**
- Verify `../../styles.css` path is correct in challenge pages
- Check for CSS syntax errors
- Ensure proper class names are used

## 🤝 Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📚 Documentation
- [Contributing Guidelines](CONTRIBUTING.md) - Team workflow and standards
- [Style Guide](docs/STYLE_GUIDE.md) - Code and content standards
- [Deployment Guide](docs/DEPLOYMENT.md) - GitHub Pages setup
- [Project Checklist](docs/PROJECT_CHECKLIST.md) - Quick reference

## 🚀 Quick Commands

```bash
# Create new challenge
./templates/create-challenge.sh "challenge name" topic difficulty

# Format code (if prettier is installed)
npx prettier --write .

# Quick commit
git add . && git commit -m "Add [challenge name]" && git push
```

## 📊 Project Stats
- **Challenges**: Update as you add them
- **Topics**: Algorithms, Data Science, Statistics
- **Languages**: Python (primary), JavaScript, R
- **Build time**: ~30 seconds (GitHub Pages)

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact
- **Portfolio**: [Your live site URL]
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

**Built with ❤️ by Diego | Building knowledge one challenge at a time**

## 🎯 Getting Started

1. **Clone the repository**
2. **Create your first challenge**: `./templates/create-challenge.sh "two sum" algorithms easy`
3. **Fill in the content** (replace all placeholders)
4. **Test locally** (open index.html)
5. **Deploy to GitHub Pages**
6. **Start learning and growing!**

This portfolio system is designed to grow with your learning journey. Each challenge becomes a testament to your problem-solving skills and technical growth! 🚀
