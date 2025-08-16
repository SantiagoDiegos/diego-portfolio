// content-loader.js - Dynamic content loading system
class ContentLoader {
    constructor() {
        this.cache = new Map();
        this.loadedSections = new Set();
    }

    // Load content from external files
    async loadContent(elementId, contentPath, cache = true) {
        try {
            // Check cache first
            if (cache && this.cache.has(contentPath)) {
                document.getElementById(elementId).innerHTML = this.cache.get(contentPath);
                return;
            }

            // Fetch content
            const response = await fetch(contentPath);
            if (!response.ok) throw new Error(`Failed to load ${contentPath}`);

            const content = await response.text();

            // Cache if requested
            if (cache) {
                this.cache.set(contentPath, content);
            }

            // Insert content
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = content;
                this.loadedSections.add(elementId);

                // Trigger custom event for any section-specific initialization
                element.dispatchEvent(new CustomEvent('contentLoaded', {
                    detail: { section: elementId, path: contentPath }
                }));
            }

        } catch (error) {
            console.error(`Error loading content for ${elementId}:`, error);

            // Fallback: show error message
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `
                    <div class="content-error">
                        <p>Content temporarily unavailable. Please refresh the page.</p>
                    </div>
                `;
            }
        }
    }

    // Load multiple content sections
    async loadMultipleContent(contentMap) {
        const promises = Object.entries(contentMap).map(([elementId, contentPath]) =>
            this.loadContent(elementId, contentPath)
        );

        await Promise.all(promises);
    }

    // Preload content for faster navigation
    async preloadContent(contentPaths) {
        const promises = contentPaths.map(async (path) => {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const content = await response.text();
                    this.cache.set(path, content);
                }
            } catch (error) {
                console.warn(`Preload failed for ${path}:`, error);
            }
        });

        await Promise.allSettled(promises);
    }

    // Check if section is loaded
    isSectionLoaded(sectionId) {
        return this.loadedSections.has(sectionId);
    }

    // Clear cache (useful for development)
    clearCache() {
        this.cache.clear();
        this.loadedSections.clear();
    }
}

// Initialize content loader
const contentLoader = new ContentLoader();

// Configuration for your portfolio sections
const CONTENT_CONFIG = {
    // Sections to load dynamically
    sections: {
        'about-content': 'content/about.html',
        'skills-content': 'content/skills.html',
        'experience-content': 'content/experience.html'
    },

    // Content to preload for better UX
    preload: [
        'content/about.html',
        'content/skills.html'
    ],

    // Critical content that should stay inline
    critical: ['hero', 'navigation']
};

// Auto-load content when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load all configured sections
        await contentLoader.loadMultipleContent(CONTENT_CONFIG.sections);

        // Preload additional content
        if (CONTENT_CONFIG.preload.length > 0) {
            contentLoader.preloadContent(CONTENT_CONFIG.preload);
        }

        console.log('✅ All content loaded successfully');

    } catch (error) {
        console.error('❌ Error loading content:', error);
    }
});

// Utility function to load content on demand (for lazy loading)
function loadSectionOnDemand(sectionId, contentPath) {
    // Only load if not already loaded
    if (!contentLoader.isSectionLoaded(sectionId)) {
        contentLoader.loadContent(sectionId, contentPath);
    }
}

// Intersection Observer for lazy loading (optional performance boost)
function setupLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const contentPath = entry.target.dataset.contentPath;

                if (contentPath && !contentLoader.isSectionLoaded(sectionId)) {
                    loadSectionOnDemand(sectionId, contentPath);
                    observer.unobserve(entry.target); // Stop observing once loaded
                }
            }
        });
    }, {
        rootMargin: '100px' // Load content 100px before it comes into view
    });

    // Observe sections with data-content-path attribute
    document.querySelectorAll('[data-content-path]').forEach(section => {
        observer.observe(section);
    });
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', setupLazyLoading);
}

// Development helper functions
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Clear cache on page reload during development
    window.addEventListener('beforeunload', () => {
        contentLoader.clearCache();
    });

    // Global helper for debugging
    window.contentLoader = contentLoader;

    console.log('🛠️ Development mode: contentLoader available globally');
    console.log('💡 Use contentLoader.clearCache() to refresh content');
}
