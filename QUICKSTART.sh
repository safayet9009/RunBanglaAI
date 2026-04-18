#!/bin/bash
# Quick Start Script for Run Bangla AI

echo "🚀 Starting Run Bangla AI Marathon Registration System"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found"
echo ""

# Terminal 1: Landing Page
echo "📍 Terminal 1: Starting Landing Page on http://localhost:8080"
echo "Command: cd landing && node server.js"
echo ""

# Terminal 2: Backend API
echo "🔧 Terminal 2: Starting Backend API on http://localhost:5000"
echo "Command: cd server && npm start"
echo ""

# Terminal 3: Registration App
echo "⚙️  Terminal 3: Starting Registration App on http://localhost:3000"
echo "Command: cd registration && npm run dev"
echo ""

echo "✅ All services should be running!"
echo ""
echo "═══════════════════════════════════════════"
echo "Services:"
echo "  Landing Page:    http://localhost:8080"
echo "  Backend API:     http://localhost:5000"
echo "  Registration:    http://localhost:3000"
echo "  MongoDB:         localhost:27017/runbangla"
echo "═══════════════════════════════════════════"
echo ""
echo "📋 Test Flow:"
echo "  1. Open http://localhost:8080 (Landing Page)"
echo "  2. Click 'Register Now' on any marathon event"
echo "  3. Fill registration form (Details → Payment → Success)"
echo "  4. Get Ticket ID and QR Code"
echo ""
