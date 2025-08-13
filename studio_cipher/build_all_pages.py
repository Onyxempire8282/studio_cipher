#!/usr/bin/env python3
"""
Studio Cipher - Complete All Pages
Build all the remaining HTML pages for the full application
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

def build_all_pages(run_dir):
    """Build all the remaining HTML pages"""
    created = []
    app_dir = run_dir / "claim_cipher_app"
    
    # 1. Mileage Cypher Page
    mileage_cypher = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mileage Cypher - Claim Cipher</title>
    <link rel="stylesheet" href="styles/cipher-core.css">
    <link rel="stylesheet" href="styles/mileage-cypher.css">
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
                <a href="./mileage-cypher.html" class="sidebar-cipher-nav-link sidebar-cipher-nav-link--active">
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
                <a href="./settings-booth.html" class="sidebar-cipher-nav-link">
                    <span>⚙️</span> Settings Booth
                </a>
            </li>
        </ul>
        
        <!-- User info -->
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
            <h1 class="page-cipher-title">🚗 Mileage Cypher</h1>
            <p class="page-cipher-subtitle">Calculate reimbursement with multi-firm rates - No Matter What</p>
        </div>

        <!-- Mileage Calculator -->
        <div class="cipher-card">
            <div class="cipher-card-header">
                <h3 class="cipher-card-title">📏 Trip Calculator</h3>
                <button class="cipher-btn cipher-btn--primary cipher-btn--sm" id="add-trip-btn">
                    ➕ Add Trip
                </button>
            </div>
            <div class="cipher-card-content">
                <div class="mileage-cipher-table">
                    <div class="table-cipher-header">
                        <span>From</span>
                        <span>To</span>
                        <span>Miles</span>
                        <span>Firm</span>
                        <span>Amount</span>
                        <span>Actions</span>
                    </div>
                    
                    <div id="trips-cipher-container">
                        <!-- Trips will be added here dynamically -->
                    </div>
                </div>
                
                <div class="mileage-cipher-total">
                    <h3>💰 Total Reimbursement: <span id="total-amount">$0.00</span></h3>
                </div>
            </div>
        </div>

        <!-- Firm Rates -->
        <div class="cipher-card">
            <div class="cipher-card-header">
                <h3 class="cipher-card-title">🏢 Firm Rates</h3>
            </div>
            <div class="cipher-card-content">
                <div class="firm-rates-cipher-grid">
                    <div class="firm-cipher-rate-card">
                        <h4>State Farm</h4>
                        <div class="rate-cipher-amount">$0.58/mile</div>
                    </div>
                    <div class="firm-cipher-rate-card">
                        <h4>Allstate</h4>
                        <div class="rate-cipher-amount">$0.62/mile</div>
                    </div>
                    <div class="firm-cipher-rate-card">
                        <h4>Progressive</h4>
                        <div class="rate-cipher-amount">$0.55/mile</div>
                    </div>
                    <div class="firm-cipher-rate-card">
                        <h4>Geico</h4>
                        <div class="rate-cipher-amount">$0.56/mile</div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="scripts/cipher-core.js"></script>
    <script src="scripts/mileage-cypher.js"></script>
    <script>
        // Authentication check
        if (localStorage.getItem('cipher_authenticated') !== 'true') {
            window.location.href = './login-cypher.html';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeCipherUserContext();
            setupCipherLogoutHandler();
            initializeMileageCypher();
        });
    </script>
</body>
</html>"""
    
    (app_dir / "mileage-cypher.html").write_text(mileage_cypher, encoding="utf-8")
    created.append("mileage-cypher.html")

    # 2. Route Cypher Page
    route_cypher = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Route Cypher - Claim Cipher</title>
    <link rel="stylesheet" href="styles/cipher-core.css">
    <link rel="stylesheet" href="styles/route-cypher.css">
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
                <a href="./route-cypher.html" class="sidebar-cipher-nav-link sidebar-cipher-nav-link--active">
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
            <h1 class="page-cipher-title">🗺️ Route Cypher</h1>
            <p class="page-cipher-subtitle">Optimize your routes with Google Maps integration</p>
        </div>

        <!-- Route Optimizer -->
        <div class="cipher-grid cipher-grid--2">
            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">📍 Job Selection</h3>
                </div>
                <div class="cipher-card-content">
                    <div class="job-cipher-selection" id="job-selection">
                        <div class="job-cipher-item">
                            <label class="cipher-checkbox">
                                <input type="checkbox" data-job-id="1" data-address="123 Main St, Atlanta, GA">
                                <span class="checkmark"></span>
                                <div class="job-cipher-info">
                                    <h4>CLM-2024-001</h4>
                                    <p>123 Main St, Atlanta, GA</p>
                                </div>
                            </label>
                        </div>
                        <div class="job-cipher-item">
                            <label class="cipher-checkbox">
                                <input type="checkbox" data-job-id="2" data-address="456 Oak Ave, Decatur, GA">
                                <span class="checkmark"></span>
                                <div class="job-cipher-info">
                                    <h4>CLM-2024-002</h4>
                                    <p>456 Oak Ave, Decatur, GA</p>
                                </div>
                            </label>
                        </div>
                        <div class="job-cipher-item">
                            <label class="cipher-checkbox">
                                <input type="checkbox" data-job-id="3" data-address="789 Pine Rd, Marietta, GA">
                                <span class="checkmark"></span>
                                <div class="job-cipher-info">
                                    <h4>CLM-2024-003</h4>
                                    <p>789 Pine Rd, Marietta, GA</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <button class="cipher-btn cipher-btn--primary cipher-btn--full" id="optimize-route-btn" disabled>
                        ⚡ Optimize Route
                    </button>
                </div>
            </div>

            <div class="cipher-card">
                <div class="cipher-card-header">
                    <h3 class="cipher-card-title">📊 Route Results</h3>
                </div>
                <div class="cipher-card-content">
                    <div id="route-cipher-results" style="display: none;">
                        <div class="route-cipher-stats">
                            <div class="route-cipher-stat">
                                <div class="stat-cipher-value" id="total-distance">0 miles</div>
                                <div class="stat-cipher-label">Total Distance</div>
                            </div>
                            <div class="route-cipher-stat">
                                <div class="stat-cipher-value" id="total-time">0 hours</div>
                                <div class="stat-cipher-label">Total Time</div>
                            </div>
                            <div class="route-cipher-stat">
                                <div class="stat-cipher-value" id="total-stops">0 stops</div>
                                <div class="stat-cipher-label">Total Stops</div>
                            </div>
                        </div>
                        
                        <div class="route-cipher-list" id="optimized-route-list">
                            <!-- Optimized route will be shown here -->
                        </div>
                    </div>
                    
                    <div id="route-cipher-placeholder" class="route-cipher-placeholder">
                        <div class="placeholder-cipher-icon">🗺️</div>
                        <p>Select jobs and optimize your route to see results</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="scripts/cipher-core.js"></script>
    <script src="scripts/route-cypher.js"></script>
    <script>
        if (localStorage.getItem('cipher_authenticated') !== 'true') {
            window.location.href = './login-cypher.html';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeCipherUserContext();
            setupCipherLogoutHandler();
            initializeRouteCypher();
        });
    </script>
</body>
</html>"""
    
    (app_dir / "route-cypher.html").write_text(route_cypher, encoding="utf-8")
    created.append("route-cypher.html")

    # 3. Jobs Studio Page
    jobs_studio = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jobs Studio - Claim Cipher</title>
    <link rel="stylesheet" href="styles/cipher-core.css">
    <link rel="stylesheet" href="styles/jobs-studio.css">
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
                <a href="./jobs-studio.html" class="sidebar-cipher-nav-link sidebar-cipher-nav-link--active">
                    <span>📱</span> Jobs Studio
                    <span class="cipher-badge cipher-badge--pro">PRO</span>
                </a>
            </li>
            <li class="sidebar-cipher-nav-item">
                <a href="./firms-directory.html" class="sidebar-cipher-nav-link">
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
            <h1 class="page-cipher-title">📱 Jobs Studio</h1>
            <p class="page-cipher-subtitle">Manage field inspections and sync photos from mobile devices</p>
            <span class="cipher-badge cipher-badge--pro">PRO FEATURE</span>
        </div>

        <!-- Statistics Cards -->
        <div class="cipher-grid cipher-grid--4 mb-4">
            <div class="cipher-card">
                <div class="cipher-card-content">
                    <div class="cipher-kpi">
                        <div class="cipher-kpi-value">3</div>
                        <div class="cipher-kpi-label">Active Jobs</div>
                    </div>
                </div>
            </div>
            <div class="cipher-card">
                <div class="cipher-card-content">
                    <div class="cipher-kpi">
                        <div class="cipher-kpi-value">12</div>
                        <div class="cipher-kpi-label">Photos Synced</div>
                    </div>
                </div>
            </div>
            <div class="cipher-card">
                <div class="cipher-card-content">
                    <div class="cipher-kpi">
                        <div class="cipher-kpi-value">8</div>
                        <div class="cipher-kpi-label">Completed Today</div>
                    </div>
                </div>
            </div>
            <div class="cipher-card">
                <div class="cipher-card-content">
                    <div class="cipher-kpi">
                        <div class="cipher-kpi-value">97%</div>
                        <div class="cipher-kpi-label">Sync Success</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jobs Management -->
        <div class="cipher-card">
            <div class="cipher-card-header">
                <h3 class="cipher-card-title">🎵 Job Management</h3>
                <div class="jobs-cipher-actions">
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm" id="filter-jobs-btn">
                        🔍 Filter
                    </button>
                    <button class="cipher-btn cipher-btn--primary cipher-btn--sm" id="new-job-btn">
                        ➕ New Job
                    </button>
                </div>
            </div>
            <div class="cipher-card-content">
                <div class="jobs-cipher-filters mb-4">
                    <button class="cipher-btn cipher-btn--outline filter-cipher-btn active" data-filter="all">All</button>
                    <button class="cipher-btn cipher-btn--outline filter-cipher-btn" data-filter="scheduled">Scheduled</button>
                    <button class="cipher-btn cipher-btn--outline filter-cipher-btn" data-filter="in-progress">In Progress</button>
                    <button class="cipher-btn cipher-btn--outline filter-cipher-btn" data-filter="completed">Completed</button>
                </div>

                <div class="jobs-cipher-list" id="jobs-list">
                    <div class="job-cipher-card" data-status="scheduled">
                        <div class="job-cipher-header">
                            <h4>CLM-2024-001</h4>
                            <span class="cipher-badge cipher-badge--warning">Scheduled</span>
                        </div>
                        <div class="job-cipher-details">
                            <p><strong>Insured:</strong> John Smith</p>
                            <p><strong>Address:</strong> 123 Main St, Atlanta, GA</p>
                            <p><strong>Priority:</strong> High</p>
                        </div>
                        <div class="job-cipher-actions">
                            <button class="cipher-btn cipher-btn--outline cipher-btn--sm">📝 Edit</button>
                            <button class="cipher-btn cipher-btn--primary cipher-btn--sm">🎤 Start</button>
                        </div>
                    </div>

                    <div class="job-cipher-card" data-status="in-progress">
                        <div class="job-cipher-header">
                            <h4>CLM-2024-002</h4>
                            <span class="cipher-badge cipher-badge--info">In Progress</span>
                        </div>
                        <div class="job-cipher-details">
                            <p><strong>Insured:</strong> Jane Doe</p>
                            <p><strong>Address:</strong> 456 Oak Ave, Decatur, GA</p>
                            <p><strong>Priority:</strong> Medium</p>
                        </div>
                        <div class="job-cipher-actions">
                            <button class="cipher-btn cipher-btn--outline cipher-btn--sm">📱 View Photos</button>
                            <button class="cipher-btn cipher-btn--success cipher-btn--sm">✅ Complete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="scripts/cipher-core.js"></script>
    <script src="scripts/jobs-studio.js"></script>
    <script>
        if (localStorage.getItem('cipher_authenticated') !== 'true') {
            window.location.href = './login-cypher.html';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeCipherUserContext();
            setupCipherLogoutHandler();
            initializeJobsStudio();
        });
    </script>
</body>
</html>"""
    
    (app_dir / "jobs-studio.html").write_text(jobs_studio, encoding="utf-8")
    created.append("jobs-studio.html")

    # 4. Add more CSS and JavaScript files
    styles_dir = app_dir / "styles"
    scripts_dir = app_dir / "scripts"

    # Additional CSS for sidebar navigation
    sidebar_css = """/* 🎤 Cipher Sidebar Styles */
.cipher-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: var(--cipher-bg-secondary);
  border-right: 1px solid var(--cipher-bg-accent);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.sidebar-cipher-header {
  padding: var(--cipher-space-lg);
  border-bottom: 1px solid var(--cipher-bg-accent);
}

.sidebar-cipher-logo a {
  font-size: 1.5rem;
  font-weight: var(--cipher-font-weight-bold);
  color: var(--cipher-gold);
  text-decoration: none;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.sidebar-cipher-nav {
  flex: 1;
  padding: var(--cipher-space-lg) 0;
}

.sidebar-cipher-nav-item {
  list-style: none;
}

.sidebar-cipher-nav-link {
  display: flex;
  align-items: center;
  gap: var(--cipher-space-md);
  padding: var(--cipher-space-md) var(--cipher-space-lg);
  color: var(--cipher-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.sidebar-cipher-nav-link:hover {
  background: var(--cipher-bg-accent);
  color: var(--cipher-text-primary);
  border-left-color: var(--cipher-gold);
}

.sidebar-cipher-nav-link--active {
  background: var(--cipher-bg-accent);
  color: var(--cipher-gold);
  border-left-color: var(--cipher-gold);
}

.sidebar-cipher-footer {
  padding: var(--cipher-space-lg);
  border-top: 1px solid var(--cipher-bg-accent);
}

.sidebar-cipher-user {
  display: flex;
  align-items: center;
  gap: var(--cipher-space-md);
  margin-bottom: var(--cipher-space-md);
}

.user-cipher-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--cipher-gold);
  color: var(--cipher-bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--cipher-font-weight-bold);
}

.user-cipher-info {
  flex: 1;
}

.user-cipher-name {
  font-weight: var(--cipher-font-weight-medium);
  color: var(--cipher-text-primary);
}

.user-cipher-role {
  font-size: 0.875rem;
  color: var(--cipher-text-muted);
}

.sidebar-cipher-logout {
  width: 100%;
}

.main-cipher-content {
  margin-left: 280px;
  padding: var(--cipher-space-xl);
  min-height: 100vh;
}

.page-cipher-header {
  margin-bottom: var(--cipher-space-xl);
}

.page-cipher-title {
  font-size: 2.5rem;
  font-weight: var(--cipher-font-weight-bold);
  color: var(--cipher-gold);
  margin-bottom: var(--cipher-space-sm);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.page-cipher-subtitle {
  font-size: 1.1rem;
  color: var(--cipher-text-secondary);
  margin-bottom: var(--cipher-space-md);
}

/* Stats Grid */
.stats-cipher-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--cipher-space-lg);
  margin-bottom: var(--cipher-space-xl);
}

.stat-cipher-card {
  background: var(--cipher-bg-secondary);
  border-radius: var(--cipher-radius-lg);
  padding: var(--cipher-space-lg);
  border: 1px solid var(--cipher-bg-accent);
  text-align: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.stat-cipher-card:hover {
  transform: translateY(-4px);
  border-color: var(--cipher-electric-blue);
}

.cipher-kpi-value {
  font-size: 2.5rem;
  font-weight: var(--cipher-font-weight-bold);
  color: var(--cipher-electric-blue);
  margin-bottom: var(--cipher-space-xs);
}

.cipher-kpi-label {
  color: var(--cipher-text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Demo Notice */
.demo-cipher-notice {
  background: linear-gradient(135deg, var(--cipher-warning), #ff6b35);
  color: var(--cipher-bg-primary);
  padding: var(--cipher-space-md) var(--cipher-space-lg);
  border-radius: var(--cipher-radius-md);
  margin-bottom: var(--cipher-space-lg);
  display: flex;
  align-items: center;
  gap: var(--cipher-space-md);
}

.demo-cipher-notice-icon {
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .cipher-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .cipher-sidebar.open {
    transform: translateX(0);
  }
  
  .main-cipher-content {
    margin-left: 0;
    padding: var(--cipher-space-lg);
  }
  
  .page-cipher-title {
    font-size: 2rem;
  }
  
  .stats-cipher-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-cipher-grid {
    grid-template-columns: 1fr;
  }
  
  .main-cipher-content {
    padding: var(--cipher-space-md);
  }
  
  .cipher-kpi-value {
    font-size: 2rem;
  }
}"""
    
    (styles_dir / "sidebar-cipher.css").write_text(sidebar_css, encoding="utf-8")
    created.append("styles/sidebar-cipher.css")

    # Core JavaScript functions
    cipher_core_js = """// 🎤 Cipher Core JavaScript Functions
// Shared utilities for the hip-hop professional cipher experience

// Initialize cipher user context across all pages
function initializeCipherUserContext() {
    const userType = localStorage.getItem('cipher_user_type') || 'demo';
    const userEmail = localStorage.getItem('cipher_user_email') || 'demo@claimcipher.com';
    const userName = userType === 'demo' ? 'Demo User' : userEmail.split('@')[0];
    
    // Set user type attribute on body
    document.body.setAttribute('data-cipher-user-type', userType);
    
    // Update user display elements
    const userNameEl = document.getElementById('user-name');
    const userRoleEl = document.getElementById('user-role');
    const userAvatarEl = document.getElementById('user-avatar');
    
    if (userNameEl) userNameEl.textContent = userName;
    if (userRoleEl) userRoleEl.textContent = userType === 'demo' ? 'Demo Mode' : 'Pro User';
    if (userAvatarEl) userAvatarEl.textContent = userName.substring(0, 2).toUpperCase();
    
    // Show demo notice if needed
    if (userType === 'demo') {
        const demoNotice = document.getElementById('demo-notice');
        if (demoNotice) {
            demoNotice.style.display = 'flex';
        }
    }
    
    console.log(`🎤 Cipher user context initialized: ${userType}`);
}

// Setup logout handler
function setupCipherLogoutHandler() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            console.log('🚪 User signing out of cipher');
            
            // Clear all cipher session data
            localStorage.removeItem('cipher_authenticated');
            localStorage.removeItem('cipher_user_type');
            localStorage.removeItem('cipher_user_email');
            localStorage.removeItem('cipher_demo_start_time');
            localStorage.removeItem('cipher_demo_expiry');
            localStorage.removeItem('cipher_remember_me');
            
            // Redirect to login
            window.location.href = './login-cypher.html';
        });
    }
}

// Animate numbers for stats
function animateCipherNumber(element, targetValue, isCurrency = false, duration = 1000) {
    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60 FPS
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        const displayValue = isCurrency 
            ? `$${Math.floor(currentValue).toLocaleString()}` 
            : Math.floor(currentValue).toLocaleString();
            
        element.textContent = displayValue;
    }, 16);
}

// Show cipher notification
function showCipherNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `cipher-notification cipher-notification--${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    notification.innerHTML = `
        <span class="cipher-notification-icon">${icon}</span>
        <span class="cipher-notification-message">${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Position and show
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--cipher-bg-secondary);
        color: var(--cipher-text-primary);
        padding: var(--cipher-space-md);
        border-radius: var(--cipher-radius-md);
        border: 1px solid var(--cipher-${type === 'info' ? 'electric-blue' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'danger'});
        display: flex;
        align-items: center;
        gap: var(--cipher-space-sm);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Format relative time
function formatCipherTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

// Generate sample data for demo mode
function generateCipherDemoData() {
    return {
        stats: {
            miles: Math.floor(Math.random() * 500) + 100,
            routes: Math.floor(Math.random() * 30) + 5,
            jobs: Math.floor(Math.random() * 100) + 20,
            earnings: Math.floor(Math.random() * 3000) + 1000
        },
        jobs: [
            {
                id: 1,
                claimNumber: 'CLM-2024-001',
                insured: 'John Smith',
                address: '123 Main St, Atlanta, GA',
                status: 'scheduled',
                priority: 'high',
                created: new Date(Date.now() - 86400000) // 1 day ago
            },
            {
                id: 2,
                claimNumber: 'CLM-2024-002',
                insured: 'Jane Doe',
                address: '456 Oak Ave, Decatur, GA',
                status: 'in-progress',
                priority: 'medium',
                created: new Date(Date.now() - 172800000) // 2 days ago
            }
        ],
        routes: [
            {
                id: 1,
                name: 'Downtown Route',
                date: 'Aug 9',
                stops: 8,
                miles: 47,
                hours: 3.2,
                status: 'completed'
            },
            {
                id: 2,
                name: 'Northside Loop',
                date: 'Aug 8',
                stops: 12,
                miles: 63,
                hours: 4.1,
                status: 'completed'
            }
        ]
    };
}

// Export functions globally
window.initializeCipherUserContext = initializeCipherUserContext;
window.setupCipherLogoutHandler = setupCipherLogoutHandler;
window.animateCipherNumber = animateCipherNumber;
window.showCipherNotification = showCipherNotification;
window.formatCipherTime = formatCipherTime;
window.generateCipherDemoData = generateCipherDemoData;

console.log('🎤 Cipher Core JavaScript loaded - No Matter What!');"""
    
    (scripts_dir / "cipher-core.js").write_text(cipher_core_js, encoding="utf-8")
    created.append("scripts/cipher-core.js")

    return created

def main():
    print("🎤🔥 BUILDING ALL REMAINING PAGES - COMPLETE CIPHER EXPERIENCE 🔥🎤")
    print("=" * 75)
    
    latest_run = get_latest_run()
    print(f"📁 Working in: {latest_run}")
    print("🎵 Building all remaining HTML pages...")
    
    created = build_all_pages(latest_run)
    
    print(f"\n✅ Created {len(created)} additional files:")
    for item in created:
        print(f"  🎤 {item}")
    
    print("\n🎯 COMPLETE CIPHER APPLICATION NOW INCLUDES:")
    print("=" * 55)
    print("🎤 login-cypher.html - Hip-hop authentication")
    print("🎤 command-center.html - Main dashboard")  
    print("🎤 mileage-cypher.html - Mileage calculator")
    print("🎤 route-cypher.html - Route optimization")
    print("🎤 jobs-studio.html - Job management")
    print("🎨 sidebar-cipher.css - Navigation styling")
    print("⚡ cipher-core.js - Shared utilities")
    
    print("\n🚀 TO RUN THE COMPLETE APPLICATION:")
    print("1. Navigate to: runs/[latest]/claim_cipher_app/")
    print("2. Open index.html in your browser")
    print("3. Login with demo@claimcipher.com / demo")
    print("4. Navigate between all pages using the sidebar")
    
    print("\n🎵 FEATURES NOW COMPLETE:")
    print("✅ Full navigation between all pages")
    print("✅ Consistent hip-hop naming convention")
    print("✅ Netflix-style dark theme across all pages")
    print("✅ Mobile-responsive design")
    print("✅ Demo mode with sample data")
    print("✅ Professional sidebar navigation")
    print("✅ Complete user session management")
    
    print(f"\n🎤 No Matter What - Complete cipher application delivered!")
    print("🎵 Studio Cipher brings the full hip-hop professional experience!")

if __name__ == "__main__":
    main()
