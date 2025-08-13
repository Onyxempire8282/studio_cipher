#!/usr/bin/env python3
"""
Studio Cipher Progress Tracker
Check completion status of your hip-hop development crew
"""

from pathlib import Path
import json
from datetime import datetime

def check_progress(run_id=None):
    """Check progress of a specific run or the latest run"""
    
    runs_dir = Path("runs")
    
    if not run_id:
        # Get the latest run
        run_dirs = [d for d in runs_dir.iterdir() if d.is_dir()]
        if not run_dirs:
            print("❌ No runs found. Start a mission first!")
            return
        
        run_dir = max(run_dirs, key=lambda x: x.name)
        run_id = run_dir.name
    else:
        run_dir = runs_dir / run_id
    
    print("🎤" * 30)
    print("STUDIO CIPHER - PROGRESS CHECK")
    print("🎤" * 30)
    print(f"\n📁 Checking Run: {run_id}")
    print(f"📂 Location: {run_dir}")
    
    if not run_dir.exists():
        print(f"❌ Run {run_id} not found!")
        return
    
    # Load mission details
    mission_file = run_dir / "mission.json"
    if mission_file.exists():
        with open(mission_file) as f:
            mission = json.load(f)
        
        print(f"\n🎯 MISSION: {mission['goal']}")
        print("\n" + "="*60)
        print("DELIVERABLES PROGRESS")
        print("="*60)
        
        total_deliverables = 0
        completed_deliverables = 0
        
        # Check each category of deliverables
        for category, items in mission['deliverables'].items():
            print(f"\n📦 {category.upper()}:")
            category_dir = run_dir / category
            
            for item in items:
                total_deliverables += 1
                item_file = category_dir / item if not item.startswith("src/") else run_dir / item
                
                if item_file.exists() or (category_dir / Path(item).name).exists():
                    print(f"  ✅ {item}")
                    completed_deliverables += 1
                else:
                    print(f"  ⏳ {item}")
        
        # Calculate completion percentage
        if total_deliverables > 0:
            completion_pct = (completed_deliverables / total_deliverables) * 100
            print(f"\n📊 PROGRESS: {completed_deliverables}/{total_deliverables} ({completion_pct:.1f}%)")
            
            # Progress bar
            bar_length = 30
            filled = int(bar_length * completion_pct / 100)
            bar = "█" * filled + "░" * (bar_length - filled)
            print(f"🎵 [{bar}] {completion_pct:.1f}%")
            
            if completion_pct == 100:
                print("\n🎉 MISSION COMPLETE! 🎉")
                print("🚀 Your Claim Cipher browser app is ready!")
            elif completion_pct >= 75:
                print("\n🔥 Almost there! Final touches in progress...")
            elif completion_pct >= 50:
                print("\n💪 Good progress! Agents are dropping verses...")
            elif completion_pct >= 25:
                print("\n🎤 Getting started! Crew is warming up...")
            else:
                print("\n⏰ Just getting started! Patience, fam...")
        
        # Check acceptance criteria
        print(f"\n📋 ACCEPTANCE CRITERIA:")
        for i, criteria in enumerate(mission['acceptance'], 1):
            print(f"  {i}. {criteria}")
        
        # Show next steps
        print(f"\n🎵 WHAT'S HAPPENING:")
        if completion_pct < 100:
            print("  → Agents working in parallel")
            print("  → Check back in a few minutes")
            print(f"  → Run: python check_progress.py {run_id}")
        else:
            print("  → All deliverables complete!")
            print("  → Review the output files")
            print("  → Deploy your app!")
    
    else:
        print("❌ Mission file not found!")
    
    print("\n" + "🎤" * 30)

def list_runs():
    """List all available runs"""
    runs_dir = Path("runs")
    run_dirs = [d for d in runs_dir.iterdir() if d.is_dir()]
    
    if not run_dirs:
        print("❌ No runs found.")
        return
    
    print("🎤 AVAILABLE RUNS:")
    for run_dir in sorted(run_dirs, reverse=True):
        mission_file = run_dir / "mission.json"
        if mission_file.exists():
            with open(mission_file) as f:
                mission = json.load(f)
            print(f"  📁 {run_dir.name} - {mission['goal'][:50]}...")
        else:
            print(f"  📁 {run_dir.name}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) == 1:
        # No arguments - check latest run
        check_progress()
    elif sys.argv[1] == "list":
        list_runs()
    else:
        # Specific run ID provided
        check_progress(sys.argv[1])
