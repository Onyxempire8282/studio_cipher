// 🎤 Login Cypher JavaScript
// Hip-hop professional authentication system

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎤 Login Cypher initialized');
    
    const loginForm = document.getElementById('login-cypher-form');
    const signupForm = document.getElementById('signup-cypher-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const demoCipherBtn = document.getElementById('demo-cipher-btn');
    const errorCypher = document.getElementById('error-cypher');

    // Form toggle functionality
    if (loginToggle && signupToggle) {
        loginToggle.addEventListener('click', () => showCipherForm('login'));
        signupToggle.addEventListener('click', () => showCipherForm('signup'));
    }

    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCipherLogin();
        });
    }

    // Signup form handler
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCipherSignup();
        });
    }

    // Demo cipher button
    if (demoCipherBtn) {
        demoCipherBtn.addEventListener('click', function() {
            handleDemoCipher();
        });
    }

    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-cipher-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });
});

function showCipherForm(formType) {
    const loginForm = document.getElementById('login-cypher-form');
    const signupForm = document.getElementById('signup-cypher-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');

    if (formType === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginToggle.classList.remove('active');
        signupToggle.classList.add('active');
    }
}

function handleCipherLogin() {
    const email = document.getElementById('login-email').value.toLowerCase();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-cipher').checked;

    console.log('🎤 Attempting cipher login for:', email);

    // Show loading state
    const loginBtn = document.getElementById('login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loadingState = loginBtn.querySelector('.loading-cipher-state');
    
    btnText.style.display = 'none';
    loadingState.style.display = 'flex';
    loginBtn.disabled = true;

    // Simulate authentication delay
    setTimeout(() => {
        if (authenticateCipherUser(email, password)) {
            // Reset login attempts on successful login
            localStorage.removeItem('cipher_login_attempts');
            
            // Set session data
            localStorage.setItem('cipher_authenticated', 'true');
            localStorage.setItem('cipher_user_email', email);
            
            // Check if master admin
            if (email === 'admin@claimcipher.com' && password === 'ClaimCipher2025!') {
                localStorage.setItem('cipher_user_type', 'master');
                console.log('🏆 Master admin login successful');
            } else {
                localStorage.setItem('cipher_user_type', 'user');
                console.log('✅ User login successful');
            }
            
            if (rememberMe) {
                localStorage.setItem('cipher_remember_me', 'true');
            }
            
            // Redirect to command center
            window.location.href = './command-center.html';
        } else {
            handleFailedCipherLogin();
        }
    }, 1500);
}

function handleCipherSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value.toLowerCase();
    const password = document.getElementById('signup-password').value;
    const company = document.getElementById('signup-company').value;

    console.log('🎤 Creating cipher account for:', name);

    // Show loading state
    const signupBtn = document.getElementById('signup-btn');
    const btnText = signupBtn.querySelector('.btn-text');
    const loadingState = signupBtn.querySelector('.loading-cipher-state');
    
    btnText.style.display = 'none';
    loadingState.style.display = 'flex';
    signupBtn.disabled = true;

    // Simulate account creation delay
    setTimeout(() => {
        // Create user account (in production this would be API call)
        const userData = {
            name: name,
            email: email,
            company: company,
            created: new Date().toISOString(),
            type: 'user'
        };

        localStorage.setItem(`cipher_user_${email}`, JSON.stringify(userData));
        
        // Auto login the new user
        localStorage.setItem('cipher_authenticated', 'true');
        localStorage.setItem('cipher_user_type', 'user');
        localStorage.setItem('cipher_user_email', email);
        
        console.log('✅ Cipher account created and logged in');
        window.location.href = './command-center.html';
    }, 2000);
}

function handleDemoCipher() {
    console.log('🎯 Starting demo cipher mode');
    
    const demoBtn = document.getElementById('demo-cipher-btn');
    demoBtn.textContent = '🎵 Initializing Demo...';
    demoBtn.disabled = true;
    
    // Set demo session data
    const demoStartTime = Date.now();
    const demoExpiry = demoStartTime + (7 * 24 * 60 * 60 * 1000); // 7 days
    
    localStorage.setItem('cipher_authenticated', 'true');
    localStorage.setItem('cipher_user_type', 'demo');
    localStorage.setItem('cipher_user_email', 'demo@claimcipher.com');
    localStorage.setItem('cipher_demo_start_time', demoStartTime.toString());
    localStorage.setItem('cipher_demo_expiry', demoExpiry.toString());
    
    // Redirect to command center
    setTimeout(() => {
        window.location.href = './command-center.html';
    }, 1000);
}

function authenticateCipherUser(email, password) {
    // Master admin credentials
    if (email === 'admin@claimcipher.com' && password === 'ClaimCipher2025!') {
        return true;
    }
    
    // Demo credentials
    if (email === 'demo@claimcipher.com' && password === 'demo') {
        return true;
    }
    
    // Check stored users
    const storedUser = localStorage.getItem(`cipher_user_${email}`);
    if (storedUser) {
        // In production, this would verify hashed password
        return true;
    }
    
    return false;
}

function handleFailedCipherLogin() {
    const loginBtn = document.getElementById('login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loadingState = loginBtn.querySelector('.loading-cipher-state');
    const errorCypher = document.getElementById('error-cypher');
    
    // Reset button state
    btnText.style.display = 'flex';
    loadingState.style.display = 'none';
    loginBtn.disabled = false;
    
    // Show error message
    errorCypher.textContent = '❌ Invalid email or password. Try again.';
    errorCypher.style.display = 'block';
    
    // Track failed attempts
    let attempts = parseInt(localStorage.getItem('cipher_login_attempts') || '0');
    attempts++;
    localStorage.setItem('cipher_login_attempts', attempts.toString());
    
    if (attempts >= 5) {
        errorCypher.textContent = '🚫 Too many failed attempts. Try again later.';
        loginBtn.disabled = true;
        setTimeout(() => {
            localStorage.removeItem('cipher_login_attempts');
            loginBtn.disabled = false;
            errorCypher.style.display = 'none';
        }, 300000); // 5 minute lockout
    }
    
    console.log('❌ Cipher login failed');
}

// Export functions for use in HTML
window.showCipherForm = showCipherForm;
window.handleCipherLogin = handleCipherLogin;
window.handleDemoCipher = handleDemoCipher;