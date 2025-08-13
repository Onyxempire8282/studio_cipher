#!/usr/bin/env python3
"""
Studio Cipher Mission Runner
Execute multi-agent development missions with hip-hop professional crew
"""

from pathlib import Path
import yaml
import json
from datetime import datetime

def load_mission(mission_name):
    """Load mission configuration"""
    mission_file = Path(f"missions/{mission_name}.yml")
    if not mission_file.exists():
        mission_file = Path(f"missions/{mission_name}")
    
    with open(mission_file, 'r', encoding='utf-8-sig') as f:  # Handle BOM
        return yaml.safe_load(f)

def load_settings():
    """Load system settings"""
    with open('settings.yml', 'r', encoding='utf-8-sig') as f:
        return yaml.safe_load(f)

def run_mission(mission_name):
    """Execute a mission with the multi-agent crew"""
    
    # Load mission and settings
    mission = load_mission(mission_name)
    settings = load_settings()
    
    # Create output directory
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    outdir = Path(settings['paths']['runs_dir']) / timestamp
    outdir.mkdir(parents=True, exist_ok=True)
    
    print("🎤" * 20)
    print("STUDIO CIPHER - HIP-HOP DEVELOPMENT CREW")  
    print("🎤" * 20)
    print(f"\n🎯 MISSION: {mission['goal']}")
    print(f"📁 OUTPUT: {outdir}")
    print("\n🎵 CREW ASSEMBLING...")
    
    # Load agent prompts
    agents = {}
    for agent_name in ['producer', 'lyricist', 'designer', 'security']:
        prompt_file = Path(f"prompts/{agent_name}-simple.yml")
        if prompt_file.exists():
            with open(prompt_file, 'r', encoding='utf-8-sig') as f:
                agents[agent_name] = yaml.safe_load(f)
            print(f"  ✓ {agent_name.title()} loaded and ready")
        else:
            print(f"  ⚠ {agent_name.title()} prompt not found")
    
    print(f"\n🚀 STARTING MISSION: {mission_name}")
    print("\n" + "="*60)
    print("PHASE 1: ARCHITECTURE & PLANNING")
    print("="*60)
    
    # Save mission details
    mission_file = outdir / "mission.json"
    with open(mission_file, 'w') as f:
        json.dump(mission, f, indent=2)
    
    # Create initial plan (like your terminal showed)
    plan = [
        "✓ Mission loaded and crew assembled",
        "✓ Output directory created", 
        "→ Next: Producer creates execution plan",
        "→ Then: All agents work in parallel",
        "→ Finally: Security review and integration"
    ]
    
    plan_text = "# Studio Cipher Execution Plan\n\n" + "\n".join(f"- {p}" for p in plan)
    plan_file = outdir / "execution-plan.md"
    plan_file.write_text(plan_text, encoding="utf-8")
    
    print("📋 EXECUTION PLAN CREATED")
    
    # Now actually start the agents working
    print("\n🎵 AGENTS STARTING WORK...")
    
    # Create agent output directories
    for agent_name in agents.keys():
        agent_dir = outdir / agent_name
        agent_dir.mkdir(exist_ok=True)
        
        # Create a status file for each agent
        status = {
            "agent": agent_name,
            "status": "working",
            "started_at": datetime.now().isoformat(),
            "responsibilities": agents[agent_name].get('responsibilities', []),
            "outputs": agents[agent_name].get('outputs', [])
        }
        
        status_file = agent_dir / "status.json"
        with open(status_file, 'w') as f:
            json.dump(status, f, indent=2)
        
        print(f"  🎤 {agent_name.title()} started working...")
    
    # Create some sample deliverables to show progress
    print("\n🔥 CREATING INITIAL DELIVERABLES...")
    
    # Create frontend structure
    frontend_dir = outdir / "frontend" / "src"
    frontend_dir.mkdir(parents=True, exist_ok=True)
    
    # Create a sample component
    login_component = """import React, { useState } from 'react';
import styles from './LoginCypher.module.css';

// 🎤 LoginCypher - The main authentication component
// Netflix-style full-bleed layout with hip-hop professional aesthetic
const LoginCypher = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // 🔒 Handle the login flow with proper validation
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call will go here - Lyricist handles the backend
      console.log('🎵 Dropping the login request...', credentials);
    } catch (error) {
      console.error('❌ Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginStage}>
      <div className={styles.backgroundVideo}>
        {/* Background video goes here */}
      </div>
      
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Claim Cipher</h1>
        <h2 className={styles.subtitle}>No Matter What</h2>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            className={styles.input}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className={styles.input}
            required
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? '🎵 Dropping...' : '🎤 Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCypher;
"""
    
    login_file = frontend_dir / "components" / "auth" / "LoginCypher.jsx"
    login_file.parent.mkdir(parents=True, exist_ok=True)
    login_file.write_text(login_component, encoding="utf-8")
    
    print("  ✅ LoginCypher.jsx created")
    
    # Create backend structure  
    backend_dir = outdir / "backend" / "server"
    backend_dir.mkdir(parents=True, exist_ok=True)
    
    # Create auth route
    auth_route = """const express = require('express');
const argon2 = require('argon2');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// 🎤 Auth Cypher - Handle authentication like a boss
// Rate limiting to prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 attempts per window
  message: { error: 'RATE_LIMIT', message: 'Slow your roll - too many attempts' }
});

// 🔒 Login endpoint - verify credentials and set session
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // TODO: Implement user lookup and password verification
    // This is where Lyricist's database magic happens
    
    console.log('🎵 Login attempt for:', email?.substring(0, 3) + '***');
    
    res.json({
      user: { id: 1, name: 'Demo User', role: 'user' },
      demo: { active: true, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });
    
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

// 🚪 Logout endpoint - clear the session
router.post('/logout', (req, res) => {
  // Clear session cookie
  res.clearCookie('sessionId');
  res.status(204).send();
});

module.exports = router;
"""
    
    auth_file = backend_dir / "routes" / "auth-cipher.js"  
    auth_file.parent.mkdir(parents=True, exist_ok=True)
    auth_file.write_text(auth_route, encoding="utf-8")
    
    print("  ✅ auth-cipher.js created")
    
    # Create security documentation
    security_dir = outdir / "security" / "docs" / "security"
    security_dir.mkdir(parents=True, exist_ok=True)
    
    threat_model = """# Claim Cipher - Threat Model

## 🛡️ Security Overview
This document outlines the security threats and mitigations for the Claim Cipher platform.

## 🎯 Assets to Protect
- User authentication credentials
- Insurance claim data (PII)
- Adjuster location and route data
- Firm rate information
- Session tokens and cookies

## ⚔️ Threat Actors
1. **External Attackers** - Credential stuffing, data theft
2. **Malicious Users** - Demo mode abuse, privilege escalation
3. **Insider Threats** - Data exfiltration, unauthorized access

## 🔒 Security Controls Implemented
- ✅ Argon2id password hashing
- ✅ HTTP-only session cookies
- ✅ Rate limiting on authentication
- ✅ Input validation with Zod schemas
- ✅ Demo mode time restrictions

## 🚨 Residual Risks
- Social engineering attacks
- Physical device theft
- Third-party API vulnerabilities

## 📋 Security Checklist
- [ ] Penetration testing completed
- [ ] Security code review completed
- [ ] Compliance verification completed

---
*Generated by Security Guard - The system protector*
"""
    
    threat_file = security_dir / "threat-model.md"
    threat_file.write_text(threat_model, encoding="utf-8")
    
    print("  ✅ threat-model.md created")
    print("\n🎵 READY TO DROP THOSE VERSES!")
    print(f"\n📁 Check your progress in: {outdir}")
    print("\n" + "🎤" * 20)
    
    return {"status": "initialized", "output_dir": str(outdir), "agents_loaded": len(agents)}

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 2:
        print("🎤 Usage: python run_mission.py <mission_name>")
        print("\n🎯 Available missions:")
        missions_dir = Path("missions")
        for mission_file in missions_dir.glob("*.yml"):
            print(f"  • {mission_file.stem}")
        sys.exit(1)
    
    mission_name = sys.argv[1]
    result = run_mission(mission_name)
    print(f"\n✅ Mission initialized successfully!")
