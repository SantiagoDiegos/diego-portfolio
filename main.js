// Global variables for filtering
let currentDifficultyFilter = 'all';
let currentTopicFilter = 'all';

// Initialize the page
function initializePage() {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Filter challenges by difficulty
function filterByDifficulty(difficulty) {
    currentDifficultyFilter = difficulty;
    updateFilterButtons('difficulty', difficulty);
    applyFilters();
}

// Filter challenges by topic
function filterByTopic(topic) {
    currentTopicFilter = topic;
    updateFilterButtons('topic', topic);
    applyFilters();
}

// Update active filter button styling
function updateFilterButtons(type, active) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        // Check if this button belongs to the current filter type
        const isDifficultyBtn = btn.onclick && btn.onclick.toString().includes('filterByDifficulty');
        const isTopicBtn = btn.onclick && btn.onclick.toString().includes('filterByTopic');

        if ((type === 'difficulty' && isDifficultyBtn) || (type === 'topic' && isTopicBtn)) {
            btn.classList.remove('active');

            // Add active class to the clicked button
            if (btn.onclick.toString().includes(`'${active}'`)) {
                btn.classList.add('active');
            }
        }
    });
}

// Apply all filters (difficulty, topic, and search)
function applyFilters() {
    const searchTerm = document.querySelector('.search-box')?.value.toLowerCase() || '';
    const cards = document.querySelectorAll('.challenge-preview-card');

    cards.forEach(card => {
        const title = card.querySelector('.challenge-title').textContent.toLowerCase();
        const description = card.querySelector('.challenge-description').textContent.toLowerCase();

        // Check search match
        const matchesSearch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);

        // Check difficulty filter
        const matchesDifficulty = currentDifficultyFilter === 'all' || card.dataset.difficulty === currentDifficultyFilter;

        // Check topic filter
        const matchesTopic = currentTopicFilter === 'all' || card.dataset.topic === currentTopicFilter;

        // Show/hide card based on all filters
        if (matchesSearch && matchesDifficulty && matchesTopic) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Search functionality
function filterChallenges() {
    applyFilters();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Instructions for adding new challenges (shown in console)
console.log(`
🚀 How to add new challenges to your portfolio:

1. **Use the automation script** (Recommended):
   ./templates/create-challenge.sh "challenge name" topic difficulty

   Example:
   ./templates/create-challenge.sh "binary search" algorithms easy

2. **Manual method**:
   - Create folder: challenges/YYYY-MM-challenge-name/
   - Copy challenge-template.html to folder as index.html
   - Fill in all [placeholder] content
   - Add challenge preview card to main index.html

3. **Update main page**:
   - Add challenge preview card to index.html
   - Update stats in About section
   - Test locally before pushing

📁 **File Structure**:
├── index.html          (main page)
├── styles.css          (stylesheet)
├── main.js            (this file)
├── challenges/        (individual challenge folders)
│   └── YYYY-MM-name/
│       ├── index.html
│       ├── metadata.json
│       ├── solution.py
│       └── images...
└── templates/         (automation tools)

🎨 **Customization**:
- Update your GitHub/LinkedIn URLs in index.html
- Modify the "About Me" section
- Add new topics by updating CSS and filter buttons
- Customize colors in the CSS :root variables
`);
