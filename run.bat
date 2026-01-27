@echo off
title Notes App Runner

echo ============================================
echo        NOTES APP - AUTO RUN SCRIPT
echo ============================================
echo.

REM =============================
REM BACKEND
REM =============================
echo Starting backend...
cd backend

IF NOT EXIST node_modules (
    echo Installing backend dependencies...
    npm install
)

echo Running backend...
start cmd /k "npm run start:dev"

REM =============================
REM FRONTEND
REM =============================
cd ..
cd frontend

IF NOT EXIST node_modules (
    echo Installing frontend dependencies...
    npm install
)

echo Running frontend...
start cmd /k "npm run dev"

echo.
echo ============================================
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo ============================================
echo.

pause
