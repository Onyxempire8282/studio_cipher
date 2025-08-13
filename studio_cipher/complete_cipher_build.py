#!/usr/bin/env python3
"""
Studio Cipher - Final JavaScript and Pages
Complete the remaining interactive components
"""

import json
from pathlib import Path
from datetime import datetime

def get_latest_run():
    """Get the most recent run directory"""
    runs_dir = Path("runs")
    run_dirs = [d for d in runs_dir.iterdir() if d.is_dir()]
    latest = sorted(run_dirs, key=lambda x: x.name)[-1]
    return latest

def build_javascript_files(run_dir):
    """Build all the JavaScript files for interactivity"""
    created = []
    app_dir = run_dir / "claim_cipher_app"
    scripts_dir = app_dir / "scripts"
    
    # 1. Mileage Cypher JavaScript
    mileage_js = """// 🚗 Mileage Cypher JavaScript - Calculate that money, no matter what!

let trips = [];
let nextTripId = 1;

const firmRates = {
    'statefarm': 0.58,
    'allstate': 0.62,
    'progressive': 0.55,
    'geico': 0.56,
    'other': 0.60
};

function initializeMileageCypher() {
    console.log('🚗 Initializing Mileage Cypher...');
    
    setupAddTripHandler();
    loadTripsFromStorage();
    updateTotalAmount();
    
    showCipherNotification('Mileage Cypher ready to calculate!', 'success');
}

function setupAddTripHandler() {
    const addTripBtn = document.getElementById('add-trip-btn');
    if (addTripBtn) {
        addTripBtn.addEventListener('click', showAddTripModal);
    }
}

function showAddTripModal() {
    const modal = document.createElement('div');
    modal.className = 'cipher-modal';
    modal.innerHTML = `
        <div class="cipher-modal-content">
            <div class="cipher-modal-header">
                <h3>➕ Add New Trip</h3>
                <button class="cipher-modal-close" id="close-modal">&times;</button>
            </div>
            <div class="cipher-modal-body">
                <div class="cipher-form-group">
                    <label class="cipher-label">From Location</label>
                    <input type="text" class="cipher-input" id="trip-from" placeholder="123 Main St, Atlanta, GA">
                </div>
                <div class="cipher-form-group">
                    <label class="cipher-label">To Location</label>
                    <input type="text" class="cipher-input" id="trip-to" placeholder="456 Oak Ave, Decatur, GA">
                </div>
                <div class="cipher-form-group">
                    <label class="cipher-label">Miles</label>
                    <input type="number" class="cipher-input" id="trip-miles" placeholder="25.5" step="0.1">
                </div>
                <div class="cipher-form-group">
                    <label class="cipher-label">Insurance Firm</label>
                    <select class="cipher-select" id="trip-firm">
                        <option value="statefarm">State Farm ($0.58/mile)</option>
                        <option value="allstate">Allstate ($0.62/mile)</option>
                        <option value="progressive">Progressive ($0.55/mile)</option>
                        <option value="geico">Geico ($0.56/mile)</option>
                        <option value="other">Other ($0.60/mile)</option>
                    </select>
                </div>
            </div>
            <div class="cipher-modal-footer">
                <button class="cipher-btn cipher-btn--ghost" id="cancel-trip">Cancel</button>
                <button class="cipher-btn cipher-btn--primary" id="save-trip">Save Trip</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event handlers
    modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('#cancel-trip').addEventListener('click', () => modal.remove());
    modal.querySelector('#save-trip').addEventListener('click', saveNewTrip);
    
    // Focus first input
    modal.querySelector('#trip-from').focus();
}

function saveNewTrip() {
    const from = document.getElementById('trip-from').value.trim();
    const to = document.getElementById('trip-to').value.trim();
    const miles = parseFloat(document.getElementById('trip-miles').value);
    const firm = document.getElementById('trip-firm').value;
    
    if (!from || !to || !miles || miles <= 0) {
        showCipherNotification('Please fill all fields with valid data', 'error');
        return;
    }
    
    const trip = {
        id: nextTripId++,
        from,
        to,
        miles,
        firm,
        rate: firmRates[firm],
        amount: miles * firmRates[firm],
        created: new Date().toISOString()
    };
    
    trips.push(trip);
    saveTripsToStorage();
    renderTrips();
    updateTotalAmount();
    
    // Close modal
    document.querySelector('.cipher-modal').remove();
    
    showCipherNotification(`Trip added: $${trip.amount.toFixed(2)} calculated!`, 'success');
}

function renderTrips() {
    const container = document.getElementById('trips-cipher-container');
    if (!container) return;
    
    if (trips.length === 0) {
        container.innerHTML = `
            <div class="trips-cipher-empty">
                <div class="empty-cipher-icon">🚗</div>
                <p>No trips added yet. Click "Add Trip" to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = trips.map(trip => `
        <div class="trip-cipher-row" data-trip-id="${trip.id}">
            <span class="trip-cipher-from">${trip.from}</span>
            <span class="trip-cipher-to">${trip.to}</span>
            <span class="trip-cipher-miles">${trip.miles} mi</span>
            <span class="trip-cipher-firm">${getFirmDisplayName(trip.firm)}</span>
            <span class="trip-cipher-amount">$${trip.amount.toFixed(2)}</span>
            <span class="trip-cipher-actions">
                <button class="cipher-btn cipher-btn--ghost cipher-btn--xs" onclick="editTrip(${trip.id})">✏️</button>
                <button class="cipher-btn cipher-btn--danger cipher-btn--xs" onclick="deleteTrip(${trip.id})">🗑️</button>
            </span>
        </div>
    `).join('');
}

function getFirmDisplayName(firm) {
    const names = {
        'statefarm': 'State Farm',
        'allstate': 'Allstate',
        'progressive': 'Progressive',
        'geico': 'Geico',
        'other': 'Other'
    };
    return names[firm] || 'Unknown';
}

function deleteTrip(tripId) {
    if (confirm('Delete this trip? This action cannot be undone.')) {
        trips = trips.filter(trip => trip.id !== tripId);
        saveTripsToStorage();
        renderTrips();
        updateTotalAmount();
        showCipherNotification('Trip deleted successfully', 'success');
    }
}

function updateTotalAmount() {
    const total = trips.reduce((sum, trip) => sum + trip.amount, 0);
    const totalEl = document.getElementById('total-amount');
    if (totalEl) {
        animateCipherNumber(totalEl, total, true);
    }
}

function saveTripsToStorage() {
    localStorage.setItem('cipher_mileage_trips', JSON.stringify(trips));
}

function loadTripsFromStorage() {
    const saved = localStorage.getItem('cipher_mileage_trips');
    if (saved) {
        trips = JSON.parse(saved);
        const maxId = trips.length > 0 ? Math.max(...trips.map(t => t.id)) : 0;
        nextTripId = maxId + 1;
        renderTrips();
    }
}

// Export functions
window.initializeMileageCypher = initializeMileageCypher;
window.deleteTrip = deleteTrip;

console.log('🚗 Mileage Cypher JavaScript loaded - Calculate that money!');"""
    
    (scripts_dir / "mileage-cypher.js").write_text(mileage_js, encoding="utf-8")
    created.append("scripts/mileage-cypher.js")

    # 2. Route Cypher JavaScript  
    route_js = """// 🗺️ Route Cypher JavaScript - Optimize those routes like a pro!

let selectedJobs = [];
let optimizedRoute = null;

function initializeRouteCypher() {
    console.log('🗺️ Initializing Route Cypher...');
    
    setupJobSelection();
    setupRouteOptimization();
    
    showCipherNotification('Route Cypher ready to optimize!', 'success');
}

function setupJobSelection() {
    const checkboxes = document.querySelectorAll('#job-selection input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedJobs);
    });
}

function updateSelectedJobs() {
    const checkboxes = document.querySelectorAll('#job-selection input[type="checkbox"]:checked');
    selectedJobs = Array.from(checkboxes).map(cb => ({
        id: cb.dataset.jobId,
        address: cb.dataset.address,
        claimNumber: cb.closest('.job-cipher-item').querySelector('h4').textContent
    }));
    
    const optimizeBtn = document.getElementById('optimize-route-btn');
    if (optimizeBtn) {
        optimizeBtn.disabled = selectedJobs.length < 2;
        optimizeBtn.textContent = selectedJobs.length < 2 
            ? 'Select at least 2 jobs' 
            : `⚡ Optimize ${selectedJobs.length} stops`;
    }
    
    console.log('🎯 Selected jobs:', selectedJobs.length);
}

function setupRouteOptimization() {
    const optimizeBtn = document.getElementById('optimize-route-btn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', optimizeRoute);
    }
}

function optimizeRoute() {
    if (selectedJobs.length < 2) {
        showCipherNotification('Select at least 2 jobs to optimize route', 'warning');
        return;
    }
    
    showCipherNotification('Optimizing route...', 'info');
    
    // Simulate route optimization (in real app, would call Google Maps API)
    setTimeout(() => {
        const optimized = simulateRouteOptimization(selectedJobs);
        displayOptimizedRoute(optimized);
        showCipherNotification('Route optimized successfully!', 'success');
    }, 1500);
}

function simulateRouteOptimization(jobs) {
    // Simple simulation - in real app would use Google Maps API
    const shuffled = [...jobs].sort(() => Math.random() - 0.5);
    const totalDistance = Math.floor(Math.random() * 50) + 20;
    const totalTime = (totalDistance / 25) + (jobs.length * 0.5); // Rough estimate
    
    return {
        jobs: shuffled,
        totalDistance,
        totalTime: Math.round(totalTime * 10) / 10,
        totalStops: jobs.length,
        estimatedSavings: Math.floor(Math.random() * 30) + 10
    };
}

function displayOptimizedRoute(route) {
    optimizedRoute = route;
    
    // Update stats
    document.getElementById('total-distance').textContent = `${route.totalDistance} miles`;
    document.getElementById('total-time').textContent = `${route.totalTime} hours`;
    document.getElementById('total-stops').textContent = `${route.totalStops} stops`;
    
    // Show route list
    const routeList = document.getElementById('optimized-route-list');
    const placeholder = document.getElementById('route-cipher-placeholder');
    const results = document.getElementById('route-cipher-results');
    
    if (routeList && placeholder && results) {
        routeList.innerHTML = route.jobs.map((job, index) => `
            <div class="route-cipher-stop">
                <div class="route-stop-number">${index + 1}</div>
                <div class="route-stop-info">
                    <h4>${job.claimNumber}</h4>
                    <p>${job.address}</p>
                </div>
                <div class="route-stop-actions">
                    <button class="cipher-btn cipher-btn--outline cipher-btn--xs">📍 Navigate</button>
                </div>
            </div>
        `).join('');
        
        placeholder.style.display = 'none';
        results.style.display = 'block';
    }
    
    // Animate the stats
    setTimeout(() => {
        animateCipherNumber(document.querySelector('#total-distance').parentNode.querySelector('.stat-cipher-value'), route.totalDistance);
        animateCipherNumber(document.querySelector('#total-time').parentNode.querySelector('.stat-cipher-value'), route.totalTime);
        animateCipherNumber(document.querySelector('#total-stops').parentNode.querySelector('.stat-cipher-value'), route.totalStops);
    }, 100);
}

function exportRoute() {
    if (!optimizedRoute) {
        showCipherNotification('No route to export', 'warning');
        return;
    }
    
    const routeData = {
        date: new Date().toISOString(),
        totalDistance: optimizedRoute.totalDistance,
        totalTime: optimizedRoute.totalTime,
        stops: optimizedRoute.jobs
    };
    
    const blob = new Blob([JSON.stringify(routeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cipher-route-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showCipherNotification('Route exported successfully!', 'success');
}

// Export functions
window.initializeRouteCypher = initializeRouteCypher;
window.exportRoute = exportRoute;

console.log('🗺️ Route Cypher JavaScript loaded - Optimize those routes!');"""
    
    (scripts_dir / "route-cypher.js").write_text(route_js, encoding="utf-8")
    created.append("scripts/route-cypher.js")

    # 3. Jobs Studio JavaScript
    jobs_js = """// 📱 Jobs Studio JavaScript - Manage those jobs like a boss!

let jobs = [];
let activeFilter = 'all';

function initializeJobsStudio() {
    console.log('📱 Initializing Jobs Studio...');
    
    loadDemoJobs();
    setupJobFilters();
    setupJobActions();
    renderJobs();
    
    showCipherNotification('Jobs Studio ready for business!', 'success');
}

function loadDemoJobs() {
    // Load demo jobs or from localStorage
    const saved = localStorage.getItem('cipher_jobs');
    if (saved) {
        jobs = JSON.parse(saved);
    } else {
        jobs = [
            {
                id: 1,
                claimNumber: 'CLM-2024-001',
                insured: 'John Smith',
                address: '123 Main St, Atlanta, GA',
                status: 'scheduled',
                priority: 'high',
                created: new Date(Date.now() - 86400000).toISOString(),
                photos: [],
                notes: ''
            },
            {
                id: 2,
                claimNumber: 'CLM-2024-002', 
                insured: 'Jane Doe',
                address: '456 Oak Ave, Decatur, GA',
                status: 'in-progress',
                priority: 'medium',
                created: new Date(Date.now() - 172800000).toISOString(),
                photos: ['photo1.jpg', 'photo2.jpg'],
                notes: 'Water damage inspection in progress'
            },
            {
                id: 3,
                claimNumber: 'CLM-2024-003',
                insured: 'Bob Johnson',
                address: '789 Pine Rd, Marietta, GA', 
                status: 'completed',
                priority: 'low',
                created: new Date(Date.now() - 259200000).toISOString(),
                photos: ['photo3.jpg', 'photo4.jpg', 'photo5.jpg'],
                notes: 'Roof inspection completed, minimal damage'
            }
        ];
        saveJobs();
    }
}

function setupJobFilters() {
    const filterBtns = document.querySelectorAll('.filter-cipher-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            activeFilter = this.dataset.filter;
            renderJobs();
        });
    });
}

function setupJobActions() {
    const newJobBtn = document.getElementById('new-job-btn');
    if (newJobBtn) {
        newJobBtn.addEventListener('click', showNewJobModal);
    }
}

function renderJobs() {
    const jobsList = document.getElementById('jobs-list');
    if (!jobsList) return;
    
    const filteredJobs = activeFilter === 'all' 
        ? jobs 
        : jobs.filter(job => job.status === activeFilter);
    
    if (filteredJobs.length === 0) {
        jobsList.innerHTML = `
            <div class="jobs-cipher-empty">
                <div class="empty-cipher-icon">📱</div>
                <p>No ${activeFilter === 'all' ? '' : activeFilter} jobs found</p>
            </div>
        `;
        return;
    }
    
    jobsList.innerHTML = filteredJobs.map(job => `
        <div class="job-cipher-card" data-job-id="${job.id}" data-status="${job.status}">
            <div class="job-cipher-header">
                <h4>${job.claimNumber}</h4>
                <span class="cipher-badge cipher-badge--${getStatusBadgeType(job.status)}">${formatStatus(job.status)}</span>
            </div>
            <div class="job-cipher-details">
                <p><strong>Insured:</strong> ${job.insured}</p>
                <p><strong>Address:</strong> ${job.address}</p>
                <p><strong>Priority:</strong> ${job.priority}</p>
                <p><strong>Photos:</strong> ${job.photos.length} uploaded</p>
            </div>
            <div class="job-cipher-actions">
                ${getJobActionButtons(job)}
            </div>
        </div>
    `).join('');
    
    // Add event listeners to action buttons
    addJobActionListeners();
}

function getStatusBadgeType(status) {
    const types = {
        'scheduled': 'warning',
        'in-progress': 'info', 
        'completed': 'success'
    };
    return types[status] || 'secondary';
}

function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function getJobActionButtons(job) {
    switch(job.status) {
        case 'scheduled':
            return `
                <button class="cipher-btn cipher-btn--outline cipher-btn--sm edit-job-btn" data-job-id="${job.id}">📝 Edit</button>
                <button class="cipher-btn cipher-btn--primary cipher-btn--sm start-job-btn" data-job-id="${job.id}">🎤 Start</button>
            `;
        case 'in-progress':
            return `
                <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-photos-btn" data-job-id="${job.id}">📱 Photos (${job.photos.length})</button>
                <button class="cipher-btn cipher-btn--success cipher-btn--sm complete-job-btn" data-job-id="${job.id}">✅ Complete</button>
            `;
        case 'completed':
            return `
                <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-report-btn" data-job-id="${job.id}">📄 Report</button>
                <button class="cipher-btn cipher-btn--ghost cipher-btn--sm archive-job-btn" data-job-id="${job.id}">📦 Archive</button>
            `;
        default:
            return `<button class="cipher-btn cipher-btn--outline cipher-btn--sm">View</button>`;
    }
}

function addJobActionListeners() {
    // Start job buttons
    document.querySelectorAll('.start-job-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.dataset.jobId);
            startJob(jobId);
        });
    });
    
    // Complete job buttons  
    document.querySelectorAll('.complete-job-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.dataset.jobId);
            completeJob(jobId);
        });
    });
    
    // View photos buttons
    document.querySelectorAll('.view-photos-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.dataset.jobId);
            viewJobPhotos(jobId);
        });
    });
}

function startJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = 'in-progress';
        job.startedAt = new Date().toISOString();
        saveJobs();
        renderJobs();
        showCipherNotification(`Started job ${job.claimNumber}`, 'success');
    }
}

function completeJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = 'completed';
        job.completedAt = new Date().toISOString();
        saveJobs();
        renderJobs();
        showCipherNotification(`Completed job ${job.claimNumber}`, 'success');
    }
}

function viewJobPhotos(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        showCipherNotification(`Viewing ${job.photos.length} photos for ${job.claimNumber}`, 'info');
        // In real app, would open photo viewer
    }
}

function showNewJobModal() {
    showCipherNotification('New job creation - PRO feature', 'info');
    // In real app, would show job creation modal
}

function saveJobs() {
    localStorage.setItem('cipher_jobs', JSON.stringify(jobs));
}

// Export functions
window.initializeJobsStudio = initializeJobsStudio;

console.log('📱 Jobs Studio JavaScript loaded - Manage those jobs!');"""
    
    (scripts_dir / "jobs-studio.js").write_text(jobs_js, encoding="utf-8")
    created.append("scripts/jobs-studio.js")

    return created

def build_additional_pages(run_dir):
    """Build the remaining HTML pages"""
    created = []
    app_dir = run_dir / "claim_cipher_app"
    
    # 1. Firms Directory Page
    firms_directory = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firms Directory - Claim Cipher</title>
    <link rel="stylesheet" href="styles/cipher-core.css">
</head>
<body class="cipher-dark-theme">
    <!-- Sidebar Cypher -->
    <nav class="cipher-sidebar" id="cipher-sidebar">
        <div class="sidebar-cipher-header">
            <div class="sidebar-cipher-logo">
                <a href="./command-center.html">🎤 Claim Cipher</a>
            </div>
        </div>
        
        <ul class="sidebar-cipher-nav">
            <li class="sidebar-cipher-nav-item">
                <a href="./command-center.html" class="sidebar-cipher-nav-link">
                    <span>📊</span> Command Center
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./mileage-cypher.html" class="sidebar-cipher-nav-link">
                    <span>🚗</span> Mileage Cypher
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./route-cypher.html" class="sidebar-cipher-nav-link">
                    <span>🗺️</span> Route Cypher
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./jobs-studio.html" class="sidebar-cipher-nav-link">
                    <span>📱</span> Jobs Studio
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./firms-directory.html" class="sidebar-cipher-nav-link sidebar-cipher-nav-link--active">
                    <span>🏢</span> Firms Directory
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./settings-booth.html" class="sidebar-cipher-nav-link">
                    <span>⚙️</span> Settings Booth
                </a>
            </li>
        </ul>
        
        <div class="sidebar-cipher-footer">
            <div class="sidebar-cipher-user" id="sidebar-user">
                <div class="user-cipher-avatar" id="user-avatar">DU</div>
                <div class="user-cipher-info">
                    <div class="user-cipher-name" id="user-name">Demo User</div>
                    <div class="user-cipher-role" id="user-role">Demo Mode</div>
                </div>
            </div>
            <button class="sidebar-cipher-logout cipher-btn cipher-btn--ghost cipher-btn--sm" id="logout-btn">
                <span>🚪</span> Sign Out
            </button>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-cipher-content">
        <div class="page-cipher-header">
            <h1 class="page-cipher-title">🏢 Firms Directory</h1>
            <p class="page-cipher-subtitle">Manage insurance firm contacts and rates</p>
        </div>

        <!-- Firms Grid -->
        <div class="cipher-grid cipher-grid--3">
            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">State Farm</h3>
                    <span class="cipher-badge cipher-badge--success">Active</span>
                </div>
                <div class="cipher-card-content">
                    <div class="firm-cipher-details">
                        <p><strong>Mileage Rate:</strong> $0.58/mile</p>
                        <p><strong>Contact:</strong> claims@statefarm.com</p>
                        <p><strong>Phone:</strong> 1-800-STATE-FARM</p>
                        <p><strong>Portal:</strong> <a href="#" class="cipher-link">Login</a></p>
                    </div>
                </div>
            </div>

            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">Allstate</h3>
                    <span class="cipher-badge cipher-badge--success">Active</span>
                </div>
                <div class="cipher-card-content">
                    <div class="firm-cipher-details">
                        <p><strong>Mileage Rate:</strong> $0.62/mile</p>
                        <p><strong>Contact:</strong> adjusters@allstate.com</p>
                        <p><strong>Phone:</strong> 1-800-ALLSTATE</p>
                        <p><strong>Portal:</strong> <a href="#" class="cipher-link">Login</a></p>
                    </div>
                </div>
            </div>

            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">Progressive</h3>
                    <span class="cipher-badge cipher-badge--success">Active</span>
                </div>
                <div class="cipher-card-content">
                    <div class="firm-cipher-details">
                        <p><strong>Mileage Rate:</strong> $0.55/mile</p>
                        <p><strong>Contact:</strong> claims@progressive.com</p>
                        <p><strong>Phone:</strong> 1-800-PROGRESSIVE</p>
                        <p><strong>Portal:</strong> <a href="#" class="cipher-link">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="scripts/cipher-core.js"></script>
    <script>
        if (localStorage.getItem('cipher_authenticated') !== 'true') {
            window.location.href = './login-cypher.html';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeCipherUserContext();
            setupCipherLogoutHandler();
            showCipherNotification('Firms Directory loaded', 'success');
        });
    </script>
</body>
</html>"""
    
    (app_dir / "firms-directory.html").write_text(firms_directory, encoding="utf-8")
    created.append("firms-directory.html")

    # 2. Settings Booth Page  
    settings_booth = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings Booth - Claim Cipher</title>
    <link rel="stylesheet" href="styles/cipher-core.css">
</head>
<body class="cipher-dark-theme">
    <!-- Sidebar Cypher -->
    <nav class="cipher-sidebar" id="cipher-sidebar">
        <div class="sidebar-cipher-header">
            <div class="sidebar-cipher-logo">
                <a href="./command-center.html">🎤 Claim Cipher</a>
            </div>
        </div>
        
        <ul class="sidebar-cipher-nav">
            <li class="sidebar-cipher-nav-item">
                <a href="./command-center.html" class="sidebar-cipher-nav-link">
                    <span>📊</span> Command Center
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./mileage-cypher.html" class="sidebar-cipher-nav-link">
                    <span>🚗</span> Mileage Cypher
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./route-cypher.html" class="sidebar-cipher-nav-link">
                    <span>🗺️</span> Route Cypher
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./jobs-studio.html" class="sidebar-cipher-nav-link">
                    <span>📱</span> Jobs Studio
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./firms-directory.html" class="sidebar-cipher-nav-link">
                    <span>🏢</span> Firms Directory
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./settings-booth.html" class="sidebar-cipher-nav-link sidebar-cipher-nav-link--active">
                    <span>⚙️</span> Settings Booth
                </a>
            </li>
        </ul>
        
        <div class="sidebar-cipher-footer">
            <div class="sidebar-cipher-user" id="sidebar-user">
                <div class="user-cipher-avatar" id="user-avatar">DU</div>
                <div class="user-cipher-info">
                    <div class="user-cipher-name" id="user-name">Demo User</div>
                    <div class="user-cipher-role" id="user-role">Demo Mode</div>
                </div>
            </div>
            <button class="sidebar-cipher-logout cipher-btn cipher-btn--ghost cipher-btn--sm" id="logout-btn">
                <span>🚪</span> Sign Out
            </button>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-cipher-content">
        <div class="page-cipher-header">
            <h1 class="page-cipher-title">⚙️ Settings Booth</h1>
            <p class="page-cipher-subtitle">Customize your cipher experience</p>
        </div>

        <div class="cipher-grid cipher-grid--2">
            <!-- Profile Settings -->
            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">👤 Profile Settings</h3>
                </div>
                <div class="cipher-card-content">
                    <div class="cipher-form-group">
                        <label class="cipher-label">Display Name</label>
                        <input type="text" class="cipher-input" value="Demo User" readonly>
                    </div>
                    <div class="cipher-form-group">
                        <label class="cipher-label">Email</label>
                        <input type="email" class="cipher-input" value="demo@claimcipher.com" readonly>
                    </div>
                    <div class="cipher-form-group">
                        <label class="cipher-label">License Number</label>
                        <input type="text" class="cipher-input" value="DEMO-2024" readonly>
                    </div>
                </div>
            </div>

            <!-- App Preferences -->
            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">🎨 App Preferences</h3>
                </div>
                <div class="cipher-card-content">
                    <div class="cipher-form-group">
                        <label class="cipher-label">Theme</label>
                        <select class="cipher-select">
                            <option value="dark" selected>Dark Mode (Default)</option>
                            <option value="light">Light Mode</option>
                            <option value="auto">Auto (System)</option>
                        </select>
                    </div>
                    <div class="cipher-form-group">
                        <label class="cipher-label">Default View</label>
                        <select class="cipher-select">
                            <option value="dashboard" selected>Command Center</option>
                            <option value="jobs">Jobs Studio</option>
                            <option value="mileage">Mileage Cypher</option>
                        </select>
                    </div>
                    <div class="cipher-form-group">
                        <label class="cipher-checkbox-label">
                            <input type="checkbox" class="cipher-checkbox" checked>
                            <span>Enable notifications</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Data Management -->
        <div class="cipher-card">
            <div class="cipher-card-header">
                <h3 class="cipher-card-title">💾 Data Management</h3>
            </div>
            <div class="cipher-card-content">
                <div class="cipher-grid cipher-grid--4">
                    <button class="cipher-btn cipher-btn--outline">📤 Export Data</button>
                    <button class="cipher-btn cipher-btn--outline">📥 Import Data</button>
                    <button class="cipher-btn cipher-btn--warning">🗑️ Clear Cache</button>
                    <button class="cipher-btn cipher-btn--danger">💣 Reset All</button>
                </div>
            </div>
        </div>
    </main>

    <script src="scripts/cipher-core.js"></script>
    <script>
        if (localStorage.getItem('cipher_authenticated') !== 'true') {
            window.location.href = './login-cypher.html';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeCipherUserContext();
            setupCipherLogoutHandler();
            showCipherNotification('Settings Booth loaded', 'success');
        });
    </script>
</body>
</html>"""
    
    (app_dir / "settings-booth.html").write_text(settings_booth, encoding="utf-8")
    created.append("settings-booth.html")

    return created

def build_css_files(run_dir):
    """Build additional CSS files for styling"""
    created = []
    app_dir = run_dir / "claim_cipher_app"
    styles_dir = app_dir / "styles"
    
    # Modal styles
    modal_css = """/* 🎤 Cipher Modal Styles */
.cipher-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.cipher-modal-content {
    background: var(--cipher-bg-secondary);
    border-radius: var(--cipher-radius-lg);
    border: 1px solid var(--cipher-bg-accent);
    min-width: 400px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
}

.cipher-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--cipher-space-lg);
    border-bottom: 1px solid var(--cipher-bg-accent);
}

.cipher-modal-header h3 {
    margin: 0;
    color: var(--cipher-gold);
}

.cipher-modal-close {
    background: none;
    border: none;
    color: var(--cipher-text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cipher-modal-close:hover {
    color: var(--cipher-text-primary);
}

.cipher-modal-body {
    padding: var(--cipher-space-lg);
}

.cipher-modal-footer {
    display: flex;
    gap: var(--cipher-space-md);
    padding: var(--cipher-space-lg);
    border-top: 1px solid var(--cipher-bg-accent);
    justify-content: flex-end;
}

/* Notification styles */
.cipher-notification {
    animation: slideInRight 0.3s ease;
}

.cipher-notification-icon {
    font-size: 1.2rem;
}

.cipher-notification-message {
    font-weight: var(--cipher-font-weight-medium);
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}"""
    
    (styles_dir / "cipher-modal.css").write_text(modal_css, encoding="utf-8")
    created.append("styles/cipher-modal.css")

    return created

def main():
    print("🎤🔥 BUILDING FINAL COMPONENTS - COMPLETE THE CIPHER! 🔥🎤")
    print("=" * 75)
    
    latest_run = get_latest_run()
    print(f"📁 Working in: {latest_run}")
    
    print("🎵 Building JavaScript components...")
    js_created = build_javascript_files(latest_run)
    
    print("🎵 Building additional pages...")
    pages_created = build_additional_pages(latest_run)
    
    print("🎵 Building CSS components...")
    css_created = build_css_files(latest_run)
    
    all_created = js_created + pages_created + css_created
    
    print(f"\n✅ Created {len(all_created)} final files:")
    for item in all_created:
        print(f"  🎤 {item}")
    
    print("\n🎯 FINAL CIPHER APPLICATION STRUCTURE:")
    print("=" * 55)
    print("🏠 HTML PAGES:")
    print("  🎤 index.html - Loading screen")
    print("  🎤 login-cypher.html - Authentication")
    print("  🎤 command-center.html - Main dashboard")
    print("  🎤 mileage-cypher.html - Mileage calculator")
    print("  🎤 route-cypher.html - Route optimization")
    print("  🎤 jobs-studio.html - Job management")
    print("  🎤 firms-directory.html - Insurance firms")
    print("  🎤 settings-booth.html - User preferences")
    
    print("\n🎨 CSS STYLES:")
    print("  🎤 cipher-core.css - Master styles")
    print("  🎤 sidebar-cipher.css - Navigation")
    print("  🎤 cipher-modal.css - Modal components")
    
    print("\n⚡ JAVASCRIPT:")
    print("  🎤 login-cypher.js - Authentication")
    print("  🎤 cipher-core.js - Shared utilities")
    print("  🎤 mileage-cypher.js - Trip calculator")
    print("  🎤 route-cypher.js - Route optimizer")
    print("  🎤 jobs-studio.js - Job manager")
    
    print("\n🚀 READY TO DROP THE MIC!")
    print("🎵 Navigate to: runs/[latest]/claim_cipher_app/")
    print("🎵 Open index.html in your browser")
    print("🎵 Login: demo@claimcipher.com / demo")
    
    print(f"\n🎤 Complete Professional Hip-Hop Insurance App - No Matter What!")

if __name__ == "__main__":
    main()
