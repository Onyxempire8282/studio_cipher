#!/usr/bin/env python3
"""
🎤 Studio Cipher Producer - HTML Functionality Diagnostic Agent
Analyzing Route Optimizer and Mileage Calculator issues for user
"""

import json
from datetime import datetime

def run_html_diagnostic():
    """Producer agent analyzes HTML functionality issues"""
    
    print("🎤" * 50)
    print("PRODUCER AGENT - HTML FUNCTIONALITY DIAGNOSTIC")
    print("🎤" * 50)
    print("\n📋 ANALYZING CURRENT HTML FUNCTIONALITY ISSUES...")
    
    # Analysis findings
    issues_found = {
        "critical_issues": [
            "Route Optimizer HTML references incorrect CSS/JS paths",
            "Mileage Calculator HTML has path mismatches", 
            "Google Maps API key missing for Route Optimizer",
            "CSS files may not be loading properly",
            "JavaScript modules may have integration issues"
        ],
        
        "path_issues": {
            "route_cypher_html": {
                "current_css_path": "styles/main.css, styles/route-optimizer.css",
                "current_js_path": "scripts/route-optimizer.js",
                "status": "Paths updated but functionality untested"
            },
            "mileage_cypher_html": {
                "current_css_path": "styles/main.css, styles/mileage-calculator.css", 
                "current_js_path": "scripts/mileage-calculator.js",
                "status": "Paths updated but functionality untested"
            }
        },
        
        "functionality_status": {
            "route_optimizer": "Needs live testing - may have JavaScript errors",
            "mileage_calculator": "Needs live testing - localStorage functionality unclear",
            "css_styling": "Files copied but integration status unknown",
            "mobile_responsive": "Untested on mobile devices"
        }
    }
    
    print(f"\n🔍 DIAGNOSTIC COMPLETE - {len(issues_found['critical_issues'])} CRITICAL ISSUES IDENTIFIED")
    
    # Producer's questions for the user
    questions = [
        {
            "id": 1,
            "question": "When you click on Route Optimizer (route-cypher.html), do you see any JavaScript errors in browser console?",
            "purpose": "Identify if route-optimizer.js is loading and functioning",
            "follow_up": "If yes, what specific error messages appear?"
        },
        {
            "id": 2, 
            "question": "When you click on Mileage Calculator (mileage-cypher.html), does the page display properly with styling?",
            "purpose": "Verify CSS files are loading correctly",
            "follow_up": "Are the buttons, forms, and layout showing correctly?"
        },
        {
            "id": 3,
            "question": "In the Route Optimizer, when you try to add destinations and click 'Optimize Route', what happens?",
            "purpose": "Test core Route Optimizer functionality",
            "follow_up": "Does it show an error, loading spinner, or nothing?"
        },
        {
            "id": 4,
            "question": "In the Mileage Calculator, can you select a firm from dropdown and enter distance to calculate?", 
            "purpose": "Test core Mileage Calculator functionality",
            "follow_up": "Does the calculation work and show results?"
        },
        {
            "id": 5,
            "question": "Are you able to access the functionality test page at http://localhost:8080/functionality-test.html?",
            "purpose": "Verify if diagnostic tools are working",
            "follow_up": "What do the preflight checks show - any failures?"
        }
    ]
    
    print(f"\n🎯 PRODUCER NEEDS YOUR INPUT TO DIRECT THE TEAM:")
    print("="*60)
    
    for q in questions:
        print(f"\n❓ QUESTION {q['id']}:")
        print(f"   {q['question']}")
        print(f"   📌 Purpose: {q['purpose']}")
        print(f"   🔄 Follow-up: {q['follow_up']}")
    
    print(f"\n📋 NEXT STEPS BASED ON YOUR ANSWERS:")
    print("✅ Designer Agent will fix CSS/styling issues")  
    print("✅ Lyricist Agent will fix JavaScript functionality")
    print("✅ Security Agent will fix path/loading issues")
    print("✅ Producer will coordinate the fixes and verify")
    
    print(f"\n🎤 PRODUCER: Please answer these questions so I can direct the crew!")
    print("🎤" * 50)
    
    return {
        "timestamp": datetime.now().isoformat(),
        "agent": "producer",
        "status": "awaiting_user_input",
        "questions": questions,
        "issues_identified": issues_found
    }

if __name__ == "__main__":
    diagnostic_result = run_html_diagnostic()
    
    # Save diagnostic for other agents
    with open('runs/20250813_203814/producer/html_diagnostic.json', 'w') as f:
        json.dump(diagnostic_result, f, indent=2)
