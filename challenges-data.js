// challenges-data.js - Your challenge data
const challengesData = [
    {
        id: "two-sum-problem",
        title: "Two Sum Problem",
        difficulty: "easy",
        topic: "algorithms",
        date: "2025-01-15",
        description: "Given an array of integers and a target sum, find two numbers that add up to the target.",
        strategy: "Hash map for O(1) complement lookups",
        keyLearning: "Space-time tradeoffs in algorithm design",
        url: "challenges/2025-08-two-sum-problem/",
        tags: ["array", "hash-map", "leetcode"]
    }
    // Add more challenges here as you create them!
];

// Challenge management class
class ChallengeManager {
    constructor(data) {
        this.challenges = data;
        this.currentPage = 1;
        this.challengesPerPage = 6;
        this.currentFilters = {
            difficulty: 'all',
            topic: 'all',
            search: ''
        };
    }

    // Get filtered challenges
    getFilteredChallenges() {
        return this.challenges.filter(challenge => {
            const matchesDifficulty = this.currentFilters.difficulty === 'all' ||
                                    challenge.difficulty === this.currentFilters.difficulty;

            const matchesTopic = this.currentFilters.topic === 'all' ||
                               challenge.topic === this.currentFilters.topic;

            const matchesSearch = this.currentFilters.search === '' ||
                                challenge.title.toLowerCase().includes(this.currentFilters.search.toLowerCase()) ||
                                challenge.description.toLowerCase().includes(this.currentFilters.search.toLowerCase()) ||
                                challenge.tags.some(tag => tag.toLowerCase().includes(this.currentFilters.search.toLowerCase()));

            return matchesDifficulty && matchesTopic && matchesSearch;
        });
    }

    // Get challenges for current page
    getPaginatedChallenges() {
        const filtered = this.getFilteredChallenges();
        const startIndex = (this.currentPage - 1) * this.challengesPerPage;
        const endIndex = startIndex + this.challengesPerPage;
        return filtered.slice(startIndex, endIndex);
    }

    // Get total pages
    getTotalPages() {
        const filtered = this.getFilteredChallenges();
        return Math.ceil(filtered.length / this.challengesPerPage);
    }

    // Generate challenge card HTML
    generateChallengeCard(challenge) {
        return `
            <div class="challenge-preview-card" data-difficulty="${challenge.difficulty}" data-topic="${challenge.topic}">
                <div class="challenge-header">
                    <div>
                        <h3 class="challenge-title">${challenge.title}</h3>
                        <div class="challenge-meta">
                            <span class="badge difficulty-${challenge.difficulty}">${challenge.difficulty.toUpperCase()}</span>
                            <span class="badge topic-${challenge.topic}">${challenge.topic.toUpperCase().replace('-', ' ')}</span>
                        </div>
                    </div>
                    <div class="challenge-date">${this.formatDate(challenge.date)}</div>
                </div>
                <p class="challenge-description">${challenge.description}</p>
                <div class="challenge-preview">
                    <div class="preview-section">
                        <strong>Strategy:</strong> ${challenge.strategy}
                    </div>
                    <div class="preview-section">
                        <strong>Key Learning:</strong> ${challenge.keyLearning}
                    </div>
                </div>
                <div class="challenge-tags">
                    ${challenge.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <div class="challenge-actions">
                    <a href="${challenge.url}" class="read-more-btn">Read Full Solution →</a>
                </div>
            </div>
        `;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Render challenges grid
    renderChallenges() {
        const grid = document.getElementById('challenges-grid');
        if (!grid) return;

        const challenges = this.getPaginatedChallenges();

        if (challenges.length === 0) {
            grid.innerHTML = `
                <div class="no-challenges">
                    <h3>No challenges found</h3>
                    <p>Try adjusting your search or filters.</p>
                    <button onclick="challengeManager.clearFilters()" class="clear-filters-btn">Clear Filters</button>
                </div>
            `;
            this.hideElements(['pagination', 'results-count']);
            return;
        }

        grid.innerHTML = challenges.map(challenge => this.generateChallengeCard(challenge)).join('');
        this.renderPagination();
        this.updateResultsCount();
    }

    // Render pagination
    renderPagination() {
        const totalPages = this.getTotalPages();
        const paginationContainer = document.getElementById('pagination');

        if (!paginationContainer || totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination">';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button onclick="challengeManager.goToPage(${this.currentPage - 1})" class="page-btn">← Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === this.currentPage ? 'active' : '';
            paginationHTML += `<button onclick="challengeManager.goToPage(${i})" class="page-btn ${isActive}">${i}</button>`;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button onclick="challengeManager.goToPage(${this.currentPage + 1})" class="page-btn">Next →</button>`;
        }

        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;
    }

    // Update results count
    updateResultsCount() {
        const totalChallenges = this.getFilteredChallenges().length;
        const startResult = (this.currentPage - 1) * this.challengesPerPage + 1;
        const endResult = Math.min(this.currentPage * this.challengesPerPage, totalChallenges);

        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = `Showing ${startResult}-${endResult} of ${totalChallenges} challenges`;
        }
    }

    // Helper method to hide elements
    hideElements(ids) {
        ids.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
    }

    // Navigation and filtering methods
    goToPage(page) {
        this.currentPage = page;
        this.renderChallenges();
        document.getElementById('challenges').scrollIntoView({ behavior: 'smooth' });
    }

    filterByDifficulty(difficulty) {
        this.currentFilters.difficulty = difficulty;
        this.currentPage = 1;
        this.renderChallenges();
    }

    filterByTopic(topic) {
        this.currentFilters.topic = topic;
        this.currentPage = 1;
        this.renderChallenges();
    }

    searchChallenges(searchTerm) {
        this.currentFilters.search = searchTerm;
        this.currentPage = 1;
        this.renderChallenges();
    }

    clearFilters() {
        this.currentFilters = {
            difficulty: 'all',
            topic: 'all',
            search: ''
        };
        this.currentPage = 1;

        // Reset UI elements
        const difficultyFilter = document.getElementById('difficulty-filter');
        const topicFilter = document.getElementById('topic-filter');
        const searchInput = document.getElementById('search-input');

        if (difficultyFilter) difficultyFilter.value = 'all';
        if (topicFilter) topicFilter.value = 'all';
        if (searchInput) searchInput.value = '';

        this.renderChallenges();
    }

    // Get challenge statistics
    getStatistics() {
        const stats = {
            total: this.challenges.length,
            byDifficulty: { easy: 0, medium: 0, hard: 0 },
            byTopic: {}
        };

        this.challenges.forEach(challenge => {
            // Count by difficulty
            if (stats.byDifficulty.hasOwnProperty(challenge.difficulty)) {
                stats.byDifficulty[challenge.difficulty]++;
            }

            // Count by topic
            stats.byTopic[challenge.topic] = (stats.byTopic[challenge.topic] || 0) + 1;
        });

        return stats;
    }
}

// Initialize the challenge manager
const challengeManager = new ChallengeManager(challengesData);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on a page with challenges
    if (document.getElementById('challenges-grid')) {
        challengeManager.renderChallenges();

        // Setup search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                challengeManager.searchChallenges(e.target.value);
            });
        }

        // Update statistics
        const stats = challengeManager.getStatistics();
        const updateElement = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        };

        updateElement('total-challenges', stats.total);
        updateElement('easy-challenges', stats.byDifficulty.easy);
        updateElement('medium-challenges', stats.byDifficulty.medium);
        updateElement('hard-challenges', stats.byDifficulty.hard);
    }
});
