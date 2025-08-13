// 🏠 Command Center JavaScript - Professional Hip-Hop Dashboard

let statsData = {
    miles: 0,
    routes: 0,
    jobs: 0,
    earnings: 0
};

function initializeCommandCenter() {
    console.log('🏠 Initializing Command Center Dashboard...');
    
    loadDashboardData();
    animateStats();
    setupQuickActions();
    loadRecentActivity();
    
    showCipherNotification('Command Center ready for action!', 'success');
}

function loadDashboardData() {
    // Load from localStorage or generate demo data
    const demoData = generateCipherDemoData();
    statsData = demoData.stats;
    
    // Update DOM elements
    updateStatsDisplay();
}

function updateStatsDisplay() {
    const statsElements = {
        miles: document.querySelector('[data-stat="miles"] .command-stat-value'),
        routes: document.querySelector('[data-stat="routes"] .command-stat-value'), 
        jobs: document.querySelector('[data-stat="jobs"] .command-stat-value'),
        earnings: document.querySelector('[data-stat="earnings"] .command-stat-value')
    };
    
    // Animate each stat
    if (statsElements.miles) animateCipherNumber(statsElements.miles, statsData.miles);
    if (statsElements.routes) animateCipherNumber(statsElements.routes, statsData.routes);
    if (statsElements.jobs) animateCipherNumber(statsElements.jobs, statsData.jobs);
    if (statsElements.earnings) animateCipherNumber(statsElements.earnings, statsData.earnings, true);
}

function animateStats() {
    // Add staggered animation to stat cards
    const statCards = document.querySelectorAll('.command-stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'cardSlideUp 0.6s ease-out';
        }, index * 100);
    });
}

function setupQuickActions() {
    const quickActions = document.querySelectorAll('.command-quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }, 100);
        });
    });
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    if (!activityList) return;
    
    const activities = [
        {
            icon: '🚗',
            text: 'Added trip: Atlanta → Decatur',
            time: '2 hours ago',
            type: 'mileage'
        },
        {
            icon: '🗺️',
            text: 'Optimized route with 5 stops',
            time: '4 hours ago', 
            type: 'route'
        },
        {
            icon: '📱',
            text: 'Completed job CLM-2024-001',
            time: '6 hours ago',
            type: 'job'
        },
        {
            icon: '💰',
            text: 'Earned $245 in mileage reimbursement',
            time: '1 day ago',
            type: 'earnings'
        }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="command-activity-item" data-type="${activity.type}">
            <div class="command-activity-icon">${activity.icon}</div>
            <div class="command-activity-content">
                <div class="command-activity-text">${activity.text}</div>
                <div class="command-activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for activity items
    const activityItems = activityList.querySelectorAll('.command-activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.dataset.type;
            navigateToPage(type);
        });
    });
}

function navigateToPage(type) {
    const pageMap = {
        'mileage': './mileage-cypher.html',
        'route': './route-cypher.html', 
        'job': './jobs-studio.html',
        'earnings': './mileage-cypher.html'
    };
    
    const page = pageMap[type];
    if (page) {
        showCipherNotification(`Navigating to ${type} page...`, 'info');
        setTimeout(() => {
            window.location.href = page;
        }, 500);
    }
}

function refreshDashboard() {
    showCipherNotification('Refreshing dashboard data...', 'info');
    
    setTimeout(() => {
        loadDashboardData();
        showCipherNotification('Dashboard refreshed!', 'success');
    }, 1000);
}

// Export functions
window.initializeCommandCenter = initializeCommandCenter;
window.refreshDashboard = refreshDashboard;

console.log('🏠 Command Center JavaScript loaded - Dashboard ready!');