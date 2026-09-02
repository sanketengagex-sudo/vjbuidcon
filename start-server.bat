@echo off
title Vishal Jamdhade Buildcon - Local Server
cd /d "%~dp0"
echo Starting local development server at http://localhost:8080/ ...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
