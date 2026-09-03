@echo off
title Vishal Jamdhade Buildcon - Local Web Server
cd /d "%~dp0"
echo ==============================================================
echo  Starting Vishal Jamdhade Buildcon Local Server
echo  Opening browser at: http://localhost:8080/
echo ==============================================================
start "" "http://localhost:8080/"
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 8080
pause
