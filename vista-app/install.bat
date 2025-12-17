@echo off
echo ========================================
echo VISTA - Installing Dependencies
echo ========================================
echo.

cd /d "%~dp0"

echo Installing npm packages...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Installation Complete!
    echo ========================================
    echo.
    echo To start the development server, run:
    echo   npm run dev
    echo.
    echo Then open: http://localhost:3000
    echo.
    pause
) else (
    echo.
    echo ========================================
    echo Installation Failed!
    echo ========================================
    echo.
    echo Please check the error messages above.
    pause
)
