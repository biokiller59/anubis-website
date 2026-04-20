// ===================================
// SCRIPTS PAGE FUNCTIONALITY
// ===================================

// Import scripts from data file
const allScripts = typeof anubisScripts !== 'undefined' ? anubisScripts : [];

class ScriptsPageManager {
    constructor() {
        this.scripts = allScripts;
        this.filteredScripts = [...this.scripts];
        this.currentFilter = 'all';
        this.currentSort = 'popular';
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupSort();
        this.setupSearch();

        // Check URL for category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            // Find and activate the corresponding filter button
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                if (btn.dataset.category === categoryParam) {
                    btn.classList.add('active');
                    // Remove active from "All" button
                    filterButtons.forEach(b => {
                        if (b.dataset.category === 'all') {
                            b.classList.remove('active');
                        }
                    });
                }
            });
            // Apply the filter
            this.filterByCategory(categoryParam);
        } else {
            this.render();
        }
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Filter scripts
                const category = btn.dataset.category;
                this.filterByCategory(category);
            });
        });
    }

    setupSort() {
        const sortSelect = document.getElementById('sort-select');

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortScripts(e.target.value);
            });
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');

        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchScripts(e.target.value);
                }, 300);
            });
        }
    }

    filterByCategory(category) {
        this.currentFilter = category;

        if (category === 'all') {
            this.filteredScripts = [...this.scripts];
        } else {
            this.filteredScripts = this.scripts.filter(s => s.category === category);
        }

        this.sortScripts(this.currentSort);
    }

    sortScripts(sortBy) {
        this.currentSort = sortBy;

        switch(sortBy) {
            case 'popular':
            case 'downloads':
                this.filteredScripts.sort((a, b) => {
                    const aDownloads = parseInt(a.downloads.replace('K', '000'));
                    const bDownloads = parseInt(b.downloads.replace('K', '000'));
                    return bDownloads - aDownloads;
                });
                break;
            case 'rating':
                this.filteredScripts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredScripts.sort((a, b) => b.id - a.id);
                break;
        }

        this.render();
    }

    searchScripts(query) {
        query = query.toLowerCase();

        if (query === '') {
            this.filterByCategory(this.currentFilter);
            return;
        }

        this.filteredScripts = this.scripts.filter(script => {
            return script.title.toLowerCase().includes(query) ||
                   script.description.toLowerCase().includes(query) ||
                   script.category.toLowerCase().includes(query);
        });

        this.render();
    }

    render() {
        const grid = document.getElementById('scripts-grid');
        const noResults = document.getElementById('no-results');

        if (!grid) return;

        // Clear current scripts
        grid.innerHTML = '';

        // Show/hide no results message
        if (this.filteredScripts.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'flex';
            return;
        } else {
            grid.style.display = 'grid';
            noResults.style.display = 'none';
        }

        // Render filtered scripts
        this.filteredScripts.forEach((script, index) => {
            const card = this.createScriptCard(script, index);
            grid.appendChild(card);
        });

        // Reinitialize card effects
        setTimeout(() => {
            if (typeof initCardEffects === 'function') {
                initCardEffects();
            }
        }, 100);
    }

    createScriptCard(script, index) {
        const card = document.createElement('div');
        card.className = 'script-card';
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <div class="card-glow"></div>
            <div class="card-header">
                <div class="card-icon">${script.icon}</div>
                <span class="card-badge">${script.category}</span>
            </div>
            <h3 class="card-title">${script.title}</h3>
            <p class="card-description">${script.description}</p>
            <div class="card-stats">
                <div class="stat">
                    <span class="stat-icon">⭐</span>
                    <span class="stat-value">${script.rating}</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">📥</span>
                    <span class="stat-value">${script.downloads}</span>
                </div>
            </div>
            <button class="card-button" data-script-id="${script.id}">View Script</button>
        `;

        // Add click handler
        const button = card.querySelector('.card-button');
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.viewScript(script.id);
        });

        return card;
    }

    viewScript(scriptId) {
        const script = this.scripts.find(s => s.id === scriptId);
        if (!script) return;

        this.showScriptModal(script);
    }

    showScriptModal(script) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'script-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">✕</button>
                <div class="modal-header">
                    <div class="modal-icon">${script.icon}</div>
                    <div>
                        <h2 class="modal-title">${script.title}</h2>
                        <span class="modal-badge">${script.category}</span>
                    </div>
                </div>
                <p class="modal-description">${script.description}</p>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <span class="stat-icon">⭐</span>
                        <span>${script.rating} Rating</span>
                    </div>
                    <div class="modal-stat">
                        <span class="stat-icon">📥</span>
                        <span>${script.downloads} Downloads</span>
                    </div>
                </div>
                <div class="code-container">
                    <div class="code-header">
                        <span>Script Code</span>
                        <button class="copy-button">Copy Code</button>
                    </div>
                    <pre class="code-block"><code>${this.escapeHtml(script.code)}</code></pre>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        closeBtn.addEventListener('click', () => this.closeModal(modal));
        overlay.addEventListener('click', () => this.closeModal(modal));

        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Copy button handler
        const copyBtn = modal.querySelector('.copy-button');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(script.code).then(() => {
                copyBtn.textContent = '✓ Copied!';
                copyBtn.style.background = '#32ff78';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy Code';
                    copyBtn.style.background = '';
                }, 2000);
            });
        });
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ScriptsPageManager();
    console.log('✨ Scripts page initialized!');
});
