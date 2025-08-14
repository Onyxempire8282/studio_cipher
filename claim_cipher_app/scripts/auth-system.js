/**
 * 🎵 Lyricist Agent: Authentication System
 * Login, session management, and navigation guards
 */

class AuthenticationSystem {
    constructor() {
        this.init();
    }

    init() {
        console.log('🎵 Lyricist: Authentication system initializing...');
        this.setupLoginForm();
        this.checkAuthOnLoad();
    }

    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
            console.log('🎵 Lyricist: Login form handler attached');
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        console.log('🎵 Lyricist: Login attempt started');
        
        const email = document.getElementById('email')?.value || '';
        const password = document.getElementById('password')?.value || '';
        
        if (!email || !password) {
            this.showError('Please enter both email and password');
            return;
        }
        
        const loginBtn = document.querySelector('.login-btn, [type="submit"]');
        if (loginBtn) {
            loginBtn.textContent = '🎵 Logging in...';
            loginBtn.disabled = true;
        }
        
        try {
            // Simulate login process
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Store login state
            localStorage.setItem('cc_user_logged_in', 'true');
            localStorage.setItem('cc_user_email', email);
            localStorage.setItem('cc_login_timestamp', Date.now().toString());
            
            console.log('🎵 Lyricist: Login successful for', email);
            
            // Redirect to dashboard
            window.location.href = 'command-center.html';
            
        } catch (error) {
            console.error('🎵 Lyricist: Login error', error);
            this.showError('Login failed. Please try again.');
        } finally {
            if (loginBtn) {
                loginBtn.textContent = '🎤 Login';
                loginBtn.disabled = false;
            }
        }
    }

    checkAuthOnLoad() {
        const isLoggedIn = localStorage.getItem('cc_user_logged_in') === 'true';
        const currentPage = window.location.pathname.split('/').pop();
        
        // Pages that require authentication
        const protectedPages = ['command-center.html', 'settings-booth.html', 'route-cypher.html', 'mileage-cypher.html'];
        
        if (protectedPages.includes(currentPage) && !isLoggedIn) {
            console.log('🎵 Lyricist: Authentication required, redirecting to login');
            window.location.href = 'login-cypher.html';
            return false;
        }
        
        // If on login page and already logged in, redirect to dashboard
        if (currentPage === 'login-cypher.html' && isLoggedIn) {
            console.log('🎵 Lyricist: Already logged in, redirecting to dashboard');
            window.location.href = 'command-center.html';
            return false;
        }
        
        return true;
    }

    logout() {
        localStorage.removeItem('cc_user_logged_in');
        localStorage.removeItem('cc_user_email');
        localStorage.removeItem('cc_login_timestamp');
        
        console.log('🎵 Lyricist: User logged out');
        window.location.href = 'login-cypher.html';
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError') || document.createElement('div');
        errorDiv.id = 'loginError';
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #ff4444;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            text-align: center;
        `;
        
        const form = document.getElementById('loginForm');
        if (form && !document.getElementById('loginError')) {
            form.insertBefore(errorDiv, form.firstChild);
        }
        
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthenticationSystem();
    console.log('🎵 Lyricist: Authentication system ready');
});

// Global logout function
function logout() {
    if (window.authSystem) {
        window.authSystem.logout();
    }
}
