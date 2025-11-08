@echo off
REM Podcast Website - Quick Start Script
REM This script starts both backend and frontend servers

echo.
echo =====================================================
echo   🎧 PODCAST WEBSITE - QUICK START
echo =====================================================
echo.

REM Kill any existing Node processes
echo [1/4] Cleaning up existing processes...
taskkill /IM node.exe /F 2>nul

REM Start Backend Server
echo [2/4] Starting Backend Server (Port 5000)...
start /B cmd /c "cd server && node index.js"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start Frontend Server
echo [3/4] Starting Frontend Server (Port 5173)...
start /B cmd /c "cd client && npm run dev"

REM Wait for servers to start
timeout /t 3 /nobreak

echo.
echo =====================================================
echo   ✅ SERVERS STARTED SUCCESSFULLY!
echo =====================================================
echo.
echo   🌐 Frontend:  http://localhost:5173
echo   🔌 Backend:   http://localhost:5000
echo   🎙️  Discover: http://localhost:5173/discover
echo.
echo   📱 Opening browser...
echo.

REM Open browser
start http://localhost:5173

echo =====================================================
echo   Tips:
echo   - Visit /discover to see all podcasts (no login needed)
echo   - Register for free at /register
echo   - Use /admin-register to create admin account
echo   - Press Ctrl+C in terminals to stop servers
echo =====================================================
echo.
