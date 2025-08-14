/* 🎨 VISUAL DESIGN VALIDATION TEST - COMPREHENSIVE COLOR CONSISTENCY CHECK */

console.log('🎨 DESIGNER VISUAL CONSISTENCY VALIDATION INITIATED');
console.log('====================================================');

// Visual Design Test Suite
function validateVisualConsistency() {
    const testResults = {
        passed: 0,
        failed: 0,
        issues: []
    };

    // Test 1: Check for consistent background color
    const bodyBg = window.getComputedStyle(document.body).background;
    if (bodyBg.includes('135deg') || bodyBg.includes('linear-gradient')) {
        testResults.passed++;
        console.log('✅ PASS: Unified gradient background detected');
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Background gradient not unified');
    }

    // Test 2: Check for consistent header styling
    const headers = document.querySelectorAll('.command-header, .cipher-header, .top-nav');
    if (headers.length > 0) {
        const headerBg = window.getComputedStyle(headers[0]).background;
        if (headerBg.includes('26, 26, 26') || headerBg.includes('rgba(26')) {
            testResults.passed++;
            console.log('✅ PASS: Unified header background detected');
        } else {
            testResults.failed++;
            testResults.issues.push('❌ FAIL: Header background not unified');
        }
    }

    // Test 3: Check for gold branding color
    const brandElements = document.querySelectorAll('.app-brand, .cipher-logo, h1');
    let goldDetected = false;
    brandElements.forEach(el => {
        const color = window.getComputedStyle(el).color;
        if (color.includes('215') || color.includes('gold')) {
            goldDetected = true;
        }
    });
    
    if (goldDetected) {
        testResults.passed++;
        console.log('✅ PASS: Gold branding color detected');
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Gold branding color missing');
    }

    // Test 4: Check for consistent button styling
    const buttons = document.querySelectorAll('.action-btn, .primary-btn, .cipher-btn--primary');
    let buttonConsistent = false;
    buttons.forEach(btn => {
        const btnBg = window.getComputedStyle(btn).background;
        if (btnBg.includes('gradient') || btnBg.includes('215')) {
            buttonConsistent = true;
        }
    });

    if (buttonConsistent || buttons.length === 0) {
        testResults.passed++;
        console.log('✅ PASS: Button styling unified');
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Button styling inconsistent');
    }

    // Test 5: Check for card consistency
    const cards = document.querySelectorAll('.module-card, .cipher-card, .login-cipher-card');
    let cardConsistent = false;
    cards.forEach(card => {
        const cardBg = window.getComputedStyle(card).background;
        const cardBorder = window.getComputedStyle(card).border;
        if ((cardBg.includes('26, 26, 26') || cardBg.includes('rgba(26')) && 
            (cardBorder.includes('215') || cardBorder.includes('gold'))) {
            cardConsistent = true;
        }
    });

    if (cardConsistent || cards.length === 0) {
        testResults.passed++;
        console.log('✅ PASS: Card styling unified');
    } else {
        testResults.failed++;
        testResults.issues.push('❌ FAIL: Card styling inconsistent');
    }

    // Display Results
    console.log('\n🎯 VISUAL CONSISTENCY TEST RESULTS:');
    console.log(`✅ Tests Passed: ${testResults.passed}`);
    console.log(`❌ Tests Failed: ${testResults.failed}`);
    
    if (testResults.issues.length > 0) {
        console.log('\n🔧 ISSUES TO FIX:');
        testResults.issues.forEach(issue => console.log(issue));
    }

    const successRate = (testResults.passed / (testResults.passed + testResults.failed)) * 100;
    console.log(`\n🏆 VISUAL CONSISTENCY SCORE: ${successRate.toFixed(1)}%`);

    if (successRate >= 90) {
        console.log('🎉 EXCELLENT! Visual consistency achieved!');
        return true;
    } else if (successRate >= 70) {
        console.log('⚠️  GOOD! Minor improvements needed.');
        return false;
    } else {
        console.log('🚨 CRITICAL! Major visual inconsistencies detected.');
        return false;
    }
}

// Auto-run validation on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(validateVisualConsistency, 1000); // Allow styles to load
});

// Export for manual testing
window.validateVisualConsistency = validateVisualConsistency;
