@echo off

REM Start Node server (keeps this window open)
start "" cmd /k node server.js

REM Give the server time to start
timeout /t 2 >nul

REM Open browser
start http://localhost:5000

echo Server is running.
echo Close the Node window or press CTRL+C there to stop the server.
