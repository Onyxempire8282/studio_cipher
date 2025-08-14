/* 🌟 GLASSMORPHISM VALIDATION SYSTEM */
/* Ensures universal frosted glass effects are applied correctly */

console.log('🌟 GLASSMORPHISM VALIDATION INITIATED');
console.log('=====================================');

function validateGlassmorphism() {
    const testResults = {
        passed: 0,
        failed: 0,
        issues: [],
        glassElements: 0
    };

    // Test 1: Check for backdrop-filter support and usage
    const glassElements = document.querySelectorAll('*');
    let backdropFilterCount = 0;
    
    glassElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.backdropFilter && styles.backdropFilter !== 'none') {
            backdropFilterCount++;
        }
    });

    testResults.glassElements = backdropFilterCount;
    
    if (backdropFilterCount > 0) {
        testResults.passed++;
        console.log(`✨ PASS: ${backdropFilterCount} glassmorphism elements detected`);
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: No glassmorphism effects detected');
    }

    // Test 2: Check for frosted glass cards
    const cards = document.querySelectorAll('.module-card, .cipher-card, .login-cipher-card');
    let glassCardCount = 0;
    
    cards.forEach(card => {
        const styles = window.getComputedStyle(card);
        if (styles.backdropFilter.includes('blur') && 
            styles.background.includes('rgba')) {
            glassCardCount++;
        }
    });

    if (glassCardCount > 0 || cards.length === 0) {
        testResults.passed++;
        console.log(`✨ PASS: ${glassCardCount} frosted glass cards detected`);
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Glass cards not properly styled');
    }

    // Test 3: Check for glassmorphism headers
    const headers = document.querySelectorAll('.command-header, .cipher-header, .top-nav, header');
    let glassHeaderCount = 0;
    
    headers.forEach(header => {
        const styles = window.getComputedStyle(header);
        if (styles.backdropFilter.includes('blur')) {
            glassHeaderCount++;
        }
    });

    if (glassHeaderCount > 0 || headers.length === 0) {
        testResults.passed++;
        console.log(`✨ PASS: ${glassHeaderCount} frosted glass headers detected`);
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Glass headers not properly styled');
    }

    // Test 4: Check for glassmorphism forms
    const forms = document.querySelectorAll('.form-cipher-container, .login-form, input');
    let glassFormCount = 0;
    
    forms.forEach(form => {
        const styles = window.getComputedStyle(form);
        if (styles.backdropFilter && styles.backdropFilter !== 'none') {
            glassFormCount++;
        }
    });

    if (glassFormCount > 0 || forms.length === 0) {
        testResults.passed++;
        console.log(`✨ PASS: ${glassFormCount} frosted glass form elements detected`);
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Glass form elements not properly styled');
    }

    // Test 5: Check for proper glassmorphism background
    const bodyStyles = window.getComputedStyle(document.body);
    if (bodyStyles.background.includes('linear-gradient') || 
        bodyStyles.background.includes('135deg')) {
        testResults.passed++;
        console.log('✨ PASS: Glassmorphism background gradient detected');
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Glassmorphism background not applied');
    }

    // Display Results
    console.log('\n🌟 GLASSMORPHISM VALIDATION RESULTS:');
    console.log(`✨ Tests Passed: ${testResults.passed}`);
    console.log(`❌ Tests Failed: ${testResults.failed}`);
    console.log(`🔮 Total Glass Elements: ${testResults.glassElements}`);
    
    if (testResults.issues.length > 0) {
        console.log('\n🔧 ISSUES TO FIX:');
        testResults.issues.forEach(issue => console.log(issue));
    }

    const glassScore = (testResults.passed / (testResults.passed + testResults.failed)) * 100;
    console.log(`\n🏆 GLASSMORPHISM SCORE: ${glassScore.toFixed(1)}%`);

    if (glassScore >= 90) {
        console.log('🌟 EXCELLENT! Perfect glassmorphism implementation!');
        if (testResults.glassElements >= 10) {
            console.log('🔮 BONUS: Rich glassmorphism density achieved!');
        }
        return true;
    } else if (glassScore >= 70) {
        console.log('✨ GOOD! Minor glassmorphism improvements needed.');
        return false;
    } else {
        console.log('🚨 CRITICAL! Glassmorphism effects not properly implemented.');
        return false;
    }
}

// Auto-run glassmorphism validation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(validateGlassmorphism, 1500); // Allow all styles to load
});

// Export for manual testing
window.validateGlassmorphism = validateGlassmorphism;

// Visual glassmorphism indicator
function addGlassmorphismIndicator() {
    const indicator = document.createElement('div');
    indicator.innerHTML = '🌟 Glassmorphism Active';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 8px;
        padding: 8px 12px;
        color: rgba(255, 215, 0, 0.9);
        font-size: 12px;
        font-weight: 600;
        z-index: 9999;
        animation: glassPulse 2s ease-in-out infinite;
    `;
    
    // Add pulsing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glassPulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(indicator);
    
    // Remove indicator after 5 seconds
    setTimeout(() => indicator.remove(), 5000);
}

// Add indicator when glassmorphism loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addGlassmorphismIndicator, 500);
});
