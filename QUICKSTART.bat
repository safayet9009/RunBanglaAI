@echo off
REM Quick Start Script for Run Bangla AI - Windows Batch

echo.
echo ==========================================
echo Run Bangla AI - Marathon Registration System
echo ==========================================
echo.

echo IMPORTANT: Run this script from the project root directory!
echo.

echo SETUP REQUIRED (Run these commands in separate terminals):
echo.
echo ===== Terminal 1: Landing Page =====
echo cd landing
echo node server.js
echo HTTP://localhost:8080
echo.

echo ===== Terminal 2: Backend API =====
echo cd server
echo npm start
echo HTTP://localhost:5000
echo.

echo ===== Terminal 3: Registration App =====
echo cd registration
echo npm run dev
echo HTTP://localhost:3000
echo.

echo ==========================================
echo SERVICES CHECKLIST:
echo ==========================================
echo [ ] Landing Page (http://localhost:8080)
echo [ ] Backend API (http://localhost:5000)
echo [ ] Registration App (http://localhost:3000)
echo [ ] MongoDB Running (localhost:27017)
echo.

echo ==========================================
echo TEST FLOW:
echo ==========================================
echo 1. Open http://localhost:8080
echo 2. Click "Register Now"
echo 3. Fill Marathon Registration Form
echo 4. Proceed through: Details -> Payment -> Success
echo 5. Get Ticket ID and QR Code
echo.

echo ==========================================
echo PROMO CODES (For Testing):
echo ==========================================
echo RUN10  = 10%% discount
echo RUN20  = 20%% discount
echo BANGLA5 = 5%% discount
echo FITLIFE15 = 15%% discount
echo.

pause
