#!/usr/bin/env python3
"""
🔒 Studio Cipher Security Agent - COMMAND CENTER SECURITY
Adding authentication, session management, and security features
"""

import os
from datetime import datetime

def security_command_center():
    """Security Agent adds authentication and security to Command Center"""
    
    print("🔒" * 50)
    print("SECURITY AGENT - COMMAND CENTER SECURITY")  
    print("🔒" * 50)
    
    print("🔒 SECURITY AGENT: Securing Command Center!")
    print("🎯 MISSION: Authentication, session management, secure navigation")
    print("🛡️ APPROACH: Session validation, secure logout, auth guards")
    
    app_dir = "C:/Users/vlong/Projects/studio_cipher/claim_cipher_app"
    
    print("🔍 Security Agent: Adding security features to Command Center...")
    
    # Create security enhancement JavaScript
    security_js = '''// 🔒 Security Agent: Command Center Security Enhancement
// Authentication and session management for dashboard

class CommandCenterSecurity {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.warningTimeout = 25 * 60 * 1000; // 25 minutes
        
        this.initializeSecurity();
        console.log('🔒 Security Agent: Command Center security initialized');
    }
    
    initializeSecurity() {
        // Verify authentication on load
        this.verifyAuthentication();
        
        // Setup session monitoring
        this.setupSessionMonitoring();
        
        // Setup security event listeners
        this.setupSecurityListeners();
        
        // Initialize secure navigation
        this.initializeSecureNavigation();
        
        // Setup periodic security checks
        this.startSecurityMonitoring();
    }
    
    verifyAuthentication() {
        console.log('🔒 Security Agent: Verifying user authentication...');
        
        const authToken = localStorage.getItem('cc_auth_token');
        const userSession = localStorage.getItem('cc_user_session');
        
        if (!authToken && !userSession) {
            console.warn('🔒 Security Agent: No authentication found');
            this.redirectToLogin('No active session found');
            return false;
        }
        
        // Validate session
        if (userSession) {
            try {
                const session = JSON.parse(userSession);
                
                // Check if session is expired
                if (this.isSessionExpired(session)) {
                    console.warn('🔒 Security Agent: Session expired');
                    this.handleSessionExpiry();
                    return false;
                }
                
                // Update last activity
                this.updateLastActivity();
                
                console.log('🔒 Security Agent: Authentication verified successfully');
                return true;
                
            } catch (e) {
                console.error('🔒 Security Agent: Error parsing session:', e);
                this.redirectToLogin('Invalid session data');
                return false;
            }
        }
        
        return true;
    }
    
    isSessionExpired(session) {
        if (!session.lastActivity) {
            return false; // No timestamp means don't expire
        }
        
        const now = Date.now();
        const lastActivity = new Date(session.lastActivity).getTime();
        const timeDiff = now - lastActivity;
        
        return timeDiff > this.sessionTimeout;
    }
    
    updateLastActivity() {
        const userSession = localStorage.getItem('cc_user_session');
        if (userSession) {
            try {
                const session = JSON.parse(userSession);
                session.lastActivity = new Date().toISOString();
                localStorage.setItem('cc_user_session', JSON.stringify(session));
            } catch (e) {
                console.error('🔒 Security Agent: Error updating activity:', e);
            }
        }
    }
    
    setupSessionMonitoring() {
        // Update activity on user interaction
        const events = ['click', 'keydown', 'scroll', 'mousemove'];
        
        let activityTimer;
        
        events.forEach(eventType => {
            document.addEventListener(eventType, () => {
                clearTimeout(activityTimer);
                activityTimer = setTimeout(() => {
                    this.updateLastActivity();
                }, 1000); // Update every second of activity
            }, true);
        });
        
        // Setup session warning timer
        setTimeout(() => {
            this.showSessionWarning();
        }, this.warningTimeout);
        
        // Setup session expiry timer
        setTimeout(() => {
            this.handleSessionExpiry();
        }, this.sessionTimeout);
    }
    
    showSessionWarning() {
        const warningModal = this.createSecurityModal(
            '⚠️ Session Warning',
            `
            <div style="padding: 20px; text-align: center;">
                <p style="margin-bottom: 20px; color: #f39c12;">
                    Your session will expire in 5 minutes due to inactivity.
                </p>
                <p style="margin-bottom: 20px; color: #7f8c8d;">
                    Click "Stay Logged In" to extend your session.
                </p>
                <div>
                    <button onclick="commandCenterSecurity.extendSession()" 
                            style="background: #27ae60; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 5px;">
                        Stay Logged In
                    </button>
                    <button onclick="commandCenterSecurity.secureLogout()" 
                            style="background: #e74c3c; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 5px;">
                        Logout Now
                    </button>
                </div>
            </div>
            `,
            false // Don't allow closing by clicking outside
        );
        
        document.body.appendChild(warningModal);
    }
    
    extendSession() {
        console.log('🔒 Security Agent: Session extended by user');
        
        // Update session timestamp
        this.updateLastActivity();
        
        // Close warning modal
        const modal = document.querySelector('.security-modal-overlay');
        if (modal) {
            modal.remove();
        }
        
        // Reset timers
        setTimeout(() => {
            this.showSessionWarning();
        }, this.warningTimeout);
        
        setTimeout(() => {
            this.handleSessionExpiry();
        }, this.sessionTimeout);
        
        // Show confirmation
        this.showSecurityNotification('Session extended successfully', 'success');
        
        // Log activity
        if (window.commandCenter) {
            window.commandCenter.logActivity('Session extended by user', 'auth');
        }
    }
    
    handleSessionExpiry() {
        console.warn('🔒 Security Agent: Session expired - forcing logout');
        
        this.showSecurityNotification('Session expired. Redirecting to login...', 'warning');
        
        // Clear all session data
        this.clearAllSessionData();
        
        // Log activity
        if (window.commandCenter) {
            window.commandCenter.logActivity('Session expired - auto logout', 'auth');
        }
        
        // Redirect after brief delay
        setTimeout(() => {
            this.redirectToLogin('Session expired');
        }, 2000);
    }
    
    secureLogout() {
        console.log('🔒 Security Agent: Secure logout initiated');
        
        // Show logout confirmation
        const confirmed = confirm('Are you sure you want to logout?');
        
        if (confirmed) {
            // Log activity
            if (window.commandCenter) {
                window.commandCenter.logActivity('User initiated secure logout', 'auth');
            }
            
            // Clear all session data
            this.clearAllSessionData();
            
            this.showSecurityNotification('Logging out securely...', 'info');
            
            // Redirect after cleanup
            setTimeout(() => {
                this.redirectToLogin('User logout');
            }, 1500);
        }
    }
    
    clearAllSessionData() {
        // Clear authentication data
        localStorage.removeItem('cc_auth_token');
        localStorage.removeItem('cc_user_session');
        
        // Clear sensitive cached data
        localStorage.removeItem('cc_route_export');
        localStorage.removeItem('cc_quick_route');
        localStorage.removeItem('cc_quick_mileage');
        
        // Keep non-sensitive data like firms and settings
        console.log('🔒 Security Agent: Session data cleared');
    }
    
    redirectToLogin(reason = '') {
        console.log(`🔒 Security Agent: Redirecting to login - ${reason}`);
        
        // Store redirect reason for login page
        sessionStorage.setItem('login_redirect_reason', reason);
        
        // Redirect to login
        window.location.replace('login-cypher.html');
    }
    
    setupSecurityListeners() {
        // Prevent multiple tab login issues
        window.addEventListener('storage', (e) => {
            if (e.key === 'cc_user_session' && !e.newValue) {
                console.warn('🔒 Security Agent: Session cleared in another tab');
                this.redirectToLogin('Session cleared in another tab');
            }
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Page became visible - verify session
                if (!this.verifyAuthentication()) {
                    return; // Will redirect if invalid
                }
            }
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.verifyAuthentication();
        });
    }
    
    initializeSecureNavigation() {
        // Intercept all navigation attempts
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function(...args) {
            if (window.commandCenterSecurity) {
                window.commandCenterSecurity.updateLastActivity();
            }
            return originalPushState.apply(history, args);
        };
        
        history.replaceState = function(...args) {
            if (window.commandCenterSecurity) {
                window.commandCenterSecurity.updateLastActivity();
            }
            return originalReplaceState.apply(history, args);
        };
        
        // Secure all module links
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip external links and anchors
                if (href.startsWith('http') || href.startsWith('#')) {
                    return;
                }
                
                // Verify authentication before navigation
                if (!this.verifyAuthentication()) {
                    e.preventDefault();
                    return;
                }
                
                this.updateLastActivity();
            });
        });
    }
    
    startSecurityMonitoring() {
        // Check authentication every 5 minutes
        setInterval(() => {
            if (!this.verifyAuthentication()) {
                console.warn('🔒 Security Agent: Periodic auth check failed');
            }
        }, 5 * 60 * 1000);
        
        // Monitor for suspicious activity
        let rapidClickCount = 0;
        let rapidClickTimer;
        
        document.addEventListener('click', () => {
            rapidClickCount++;
            
            clearTimeout(rapidClickTimer);
            rapidClickTimer = setTimeout(() => {
                rapidClickCount = 0;
            }, 1000);
            
            // If too many clicks in short time, it might be automated
            if (rapidClickCount > 20) {
                console.warn('🔒 Security Agent: Suspicious rapid clicking detected');
                this.showSecurityNotification('Unusual activity detected', 'warning');
            }
        });
    }
    
    // Security utility functions
    createSecurityModal(title, content, allowOutsideClose = true) {
        const modal = document.createElement('div');
        modal.className = 'security-modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(8px);
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            border: 2px solid #e74c3c;
        `;
        
        modalContent.innerHTML = `
            <div style="padding: 20px; border-bottom: 1px solid #eee; background: #e74c3c; color: white;">
                <h2 style="margin: 0;">${title}</h2>
            </div>
            ${content}
        `;
        
        modal.appendChild(modalContent);
        
        // Handle outside clicks
        if (allowOutsideClose) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
        
        return modal;
    }
    
    showSecurityNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `security-notification security-notification-${type}`;
        
        const colors = {
            info: '#3498db',
            success: '#27ae60', 
            warning: '#f39c12',
            error: '#e74c3c'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 99998;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            border-left: 4px solid rgba(255, 255, 255, 0.3);
            font-weight: 600;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span style="margin-right: 10px;">${type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Public security methods
    getCurrentUser() {
        const userSession = localStorage.getItem('cc_user_session');
        if (userSession) {
            try {
                return JSON.parse(userSession);
            } catch (e) {
                console.error('🔒 Security Agent: Error parsing user session:', e);
            }
        }
        return null;
    }
    
    isUserAuthenticated() {
        return this.verifyAuthentication();
    }
    
    getSessionTimeRemaining() {
        const session = this.getCurrentUser();
        if (!session || !session.lastActivity) {
            return this.sessionTimeout; // Full time if no activity recorded
        }
        
        const now = Date.now();
        const lastActivity = new Date(session.lastActivity).getTime();
        const elapsed = now - lastActivity;
        
        return Math.max(0, this.sessionTimeout - elapsed);
    }
    
    formatTimeRemaining(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize Security when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Security Agent: Initializing Command Center security...');
    window.commandCenterSecurity = new CommandCenterSecurity();
});

// Add security status to system status section
function addSecurityStatus() {
    const statusSection = document.querySelector('.activity-section:last-child');
    if (statusSection && window.commandCenterSecurity) {
        const timeRemaining = window.commandCenterSecurity.getSessionTimeRemaining();
        const timeFormatted = window.commandCenterSecurity.formatTimeRemaining(timeRemaining);
        
        const securityDiv = document.createElement('div');
        securityDiv.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-top: 10px;';
        securityDiv.innerHTML = `
            <span>Session Time</span>
            <span class="status-indicator status-online">${timeFormatted}</span>
        `;
        
        const statusGrid = statusSection.querySelector('div[style*="grid"]');
        if (statusGrid) {
            statusGrid.appendChild(securityDiv);
        }
    }
}

// Add security status after initialization
setTimeout(addSecurityStatus, 1000);'''
    
    # Write the security enhancement JavaScript
    scripts_dir = f"{app_dir}/scripts"
    if not os.path.exists(scripts_dir):
        os.makedirs(scripts_dir)
    
    security_js_path = f"{scripts_dir}/command-center-security.js"
    with open(security_js_path, 'w', encoding='utf-8') as f:
        f.write(security_js)
    
    print("✅ Security Agent: Command Center security JavaScript created")
    
    # Integrate security script into HTML
    command_center_path = f"{app_dir}/command-center.html"
    
    with open(command_center_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Add security script before the main command center script
    security_script_tag = '    <script src="scripts/command-center-security.js"></script>\n    <script src="scripts/command-center.js"></script>'
    
    # Replace the existing script tag
    html_content = html_content.replace(
        '    <script src="scripts/command-center.js"></script>',
        security_script_tag
    )
    
    # Add security styling
    security_css = '''
    /* Security Agent: Security-specific styling */
    .security-notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .security-modal-overlay .modal-content {
        border: 2px solid #e74c3c;
    }
    
    .session-warning {
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    .security-indicator {
        position: relative;
    }
    
    .security-indicator::after {
        content: '🔒';
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 0.8em;
        opacity: 0.7;
    }
    '''
    
    # Add security CSS to the HTML
    html_content = html_content.replace(
        '</style>\n</head>',
        security_css + '\n    </style>\n</head>'
    )
    
    # Write updated HTML
    with open(command_center_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✅ Security Agent: Security features integrated into Command Center")
    
    print("🔒 SECURITY FEATURES IMPLEMENTED:")
    print("   • User authentication verification on page load")
    print("   • Session timeout management (30 minutes)")
    print("   • Session warning system (5-minute warning)")
    print("   • Secure logout with data clearing")
    print("   • Activity monitoring and session extension")
    print("   • Cross-tab session management")
    print("   • Secure navigation with auth guards")
    print("   • Suspicious activity monitoring")
    print("   • Session time display in system status")
    print("   • Automatic redirect to login on expiry")
    print("   • Security notifications and modal system")
    
    print(f"\n🔒 Security Agent: Security implementation complete!")
    print("🎯 Ready for Producer Agent final integration...")
    
    print("🔒" * 50)
    
    return {
        "timestamp": datetime.now().isoformat(),
        "agent": "security",
        "task": "command_center_security",
        "status": "SECURITY_COMPLETE",
        "features": [
            "Authentication verification",
            "Session timeout management",
            "Session warning system",
            "Secure logout",
            "Activity monitoring",
            "Cross-tab session sync",
            "Secure navigation guards",
            "Suspicious activity detection"
        ]
    }

if __name__ == "__main__":
    result = security_command_center()
    
    print(f"\n🔒 Security Agent: Command Center secured!")
    print(f"🎯 Status: {result['status']}")
    print(f"🎤 Producer Agent: Ready for final integration and testing!")
