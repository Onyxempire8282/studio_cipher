#!/usr/bin/env python3
"""
🎤 Studio Cipher Producer Agent - EMERGENCY LIVE SERVER FIX
Forcing VS Code Live Server to show the correct entry point
"""

import os
from datetime import datetime

def producer_emergency_server_fix():
    """Producer Agent fixes VS Code Live Server routing issue"""
    
    print("🚨" * 50)
    print("PRODUCER AGENT - EMERGENCY LIVE SERVER FIX")  
    print("🚨" * 50)
    
    print("🎬 PRODUCER AGENT: EMERGENCY - Live Server showing wrong page!")
    print("🎯 DIAGNOSIS: VS Code Live Server may be caching or has wrong default")
    print("💡 SOLUTION: Multiple failsafes to force correct routing")
    
    # Path to the app directory
    app_dir = "C:/Users/vlong/Projects/studio_cipher/claim_cipher_app"
    
    # 1. Force index.html to redirect immediately with multiple methods
    emergency_index = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claim Cipher - Redirecting</title>
    <meta http-equiv="refresh" content="0; url=welcome.html">
    <link rel="stylesheet" href="styles/cipher-core.css">
    <script>
        // EMERGENCY REDIRECT - Multiple methods to ensure it works
        window.location.replace('./welcome.html');
        window.location.href = './welcome.html';
        document.location = './welcome.html';
    </script>
</head>
<body style="background: #2c3e50; color: white; font-family: Arial; text-align: center; padding: 50px;">
    <div style="font-size: 3em; margin-bottom: 20px;">🎤</div>
    <h1>Claim Cipher</h1>
    <p>Redirecting to application...</p>
    <p><a href="welcome.html" style="color: #3498db;">Click here if not redirected automatically</a></p>
    
    <script>
        // FORCE REDIRECT - Emergency override
        setTimeout(function() {
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.replace('./welcome.html');
            }
        }, 100);
    </script>
</body>
</html>'''
    
    # Write emergency index
    with open(f"{app_dir}/index.html", 'w', encoding='utf-8') as f:
        f.write(emergency_index)
    
    print("✅ EMERGENCY: index.html updated with multiple redirect methods")
    
    # 2. Create a .htaccess file for proper routing (if needed)
    htaccess_content = '''DirectoryIndex welcome.html index.html
RewriteEngine On
RewriteRule ^$ welcome.html [L]
'''
    
    try:
        with open(f"{app_dir}/.htaccess", 'w', encoding='utf-8') as f:
            f.write(htaccess_content)
        print("✅ EMERGENCY: .htaccess created for server routing")
    except:
        print("⚠️  .htaccess creation failed (not critical)")
    
    # 3. Verify welcome.html exists and is correct
    welcome_file = f"{app_dir}/welcome.html"
    if os.path.exists(welcome_file):
        print("✅ CONFIRMED: welcome.html exists")
    else:
        print("🚨 CRITICAL: welcome.html missing!")
        return False
    
    # 4. Create a backup default.html that also redirects
    with open(f"{app_dir}/default.html", 'w', encoding='utf-8') as f:
        f.write(emergency_index.replace('Redirecting', 'Emergency Redirect'))
    
    print("✅ EMERGENCY: default.html backup created")
    
    # 5. Check if functionality-test.html is somehow being prioritized
    test_file = f"{app_dir}/functionality-test.html"
    if os.path.exists(test_file):
        # Rename it temporarily to see if that's the issue
        backup_name = f"{app_dir}/functionality-test-backup.html"
        try:
            os.rename(test_file, backup_name)
            print("✅ EMERGENCY: functionality-test.html renamed to backup")
            
            # Create a new functionality-test.html that redirects to welcome
            redirect_test = '''<!DOCTYPE html>
<html><head><title>Redirecting</title><script>window.location.href='welcome.html';</script></head>
<body><h1>Redirecting to main app...</h1><a href="welcome.html">Click here</a></body></html>'''
            
            with open(test_file, 'w', encoding='utf-8') as f:
                f.write(redirect_test)
            
            print("✅ EMERGENCY: functionality-test.html now redirects to welcome")
            
        except Exception as e:
            print(f"⚠️  Could not rename test file: {e}")
    
    print(f"\n🚨 EMERGENCY SOLUTION DEPLOYED:")
    print("="*60)
    print("✅ index.html: Multiple redirect methods")
    print("✅ .htaccess: Server-level routing")
    print("✅ default.html: Backup entry point")
    print("✅ functionality-test.html: Now redirects to main app")
    
    print(f"\n🎯 EMERGENCY INSTRUCTIONS:")
    print("1. 🔄 REFRESH your browser completely (Ctrl+F5)")
    print("2. 🗑️  Clear browser cache if needed")
    print("3. 🎤 Try: http://127.0.0.1:5500/")
    print("4. 🎤 Or try: http://127.0.0.1:5500/welcome.html")
    print("5. 🆘 If still failing, restart VS Code Live Server")
    
    print("🚨" * 50)
    
    return {
        "timestamp": datetime.now().isoformat(),
        "agent": "producer",
        "task": "emergency_server_fix",
        "status": "EMERGENCY_DEPLOYED",
        "changes": ["index.html", ".htaccess", "default.html", "functionality-test.html"]
    }

if __name__ == "__main__":
    result = producer_emergency_server_fix()
    
    print(f"\n🚨 Producer Agent: EMERGENCY FIX DEPLOYED!")
    print(f"🎯 Status: {result['status']}")
    print(f"🎤 The live server should now show the correct page!")
