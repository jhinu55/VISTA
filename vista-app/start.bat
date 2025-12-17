@echo off
echo ========================================
echo VISTA - Starting Development Server
echo ========================================
echo.

cd /d "%~dp0"

echo Starting Next.js development server...
echo.
echo The application will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
