@echo off
echo Starting PodStream Backend and Frontend...
echo.

REM Kill any existing node processes
taskkill /IM node.exe /F 2>nul

REM Start backend server
echo Starting Backend Server on port 5000...
start "Backend Server" cmd /k cd /d "C:\Users\agust\Downloads\podcast_website\podcast_website\server" ^& node index.js

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend development server
echo Starting Frontend Server on port 5173...
start "Frontend Server" cmd /k cd /d "C:\Users\agust\Downloads\podcast_website\podcast_website\client" ^& npm run dev

REM Wait for servers to be ready
timeout /t 5 /nobreak

REM Open browser
echo Opening browser...
start http://localhost:5173/user-dashboard

echo.
echo Both servers are starting! 
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo.
pause
