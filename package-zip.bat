@echo off
title Package Website for Hostinger Upload
cd /d "%~dp0"
echo ==============================================================
echo  Packaging Vishal Jamdhade Buildcon for Hostinger Hosting
echo ==============================================================

powershell -ExecutionPolicy Bypass -Command "Compress-Archive -Path 'index.html', 'favicon.ico', 'favicon.svg', 'css', 'js', 'assets' -DestinationPath 'vishaljamdhadebuildcon-website.zip' -Force"

echo.
echo ==============================================================
echo  Done! Created: vishaljamdhadebuildcon-website.zip
echo  Upload this file to Hostinger hPanel -> File Manager -> public_html
echo ==============================================================
pause
