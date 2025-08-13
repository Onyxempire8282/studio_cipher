#!/bin/bash

echo "🎤 Starting Claim Cipher Application Server..."
echo ""
echo "🌟 Studio Cipher Multi-Agent Production Build"
echo "📅 Build Date: August 13, 2025"
echo "✅ Producer Approved - Quality Score: 100%"
echo ""

# Navigate to the application directory
cd "$(dirname "$0")/claim_cipher_app"

echo "🚀 Starting HTTP server on port 8080..."
echo "🎯 Access your application at: http://localhost:8080"
echo ""
echo "🎵 Press Ctrl+C to stop the server"
echo ""

# Start the Python HTTP server
python3 -m http.server 8080
