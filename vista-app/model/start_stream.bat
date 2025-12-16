@echo off
echo ========================================
echo   VISTA Real-Time Data Stream Simulator
echo ========================================
echo.
echo Starting real-time data streaming...
echo This will process 10 rows every 30 seconds
echo Press Ctrl+C to stop
echo.

cd /d "%~dp0"
python stream_simulator.py

pause
