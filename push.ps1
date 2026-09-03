$gitDir = "$env:LOCALAPPDATA\Programs\MinGit\cmd"
$env:Path = "$gitDir;$env:LOCALAPPDATA\Programs\MinGit\mingw64\bin;$env:LOCALAPPDATA\Programs\MinGit\usr\bin;$env:Path"

Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " Synchronizing & Pushing code to GitHub" -ForegroundColor Yellow
Write-Host " Repository: https://github.com/sanketengagex-sudo/vjbuidcon" -ForegroundColor Yellow
Write-Host "==============================================================" -ForegroundColor Cyan

git add -A
$hasChanges = (git status --porcelain)
if ($hasChanges) {
    Write-Host "Committing changes..." -ForegroundColor Green
    git commit -m "update: latest architectural design updates and enhancements"
}

git push -u origin main

Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " Pushed successfully! Live URL: https://sanketengagex-sudo.github.io/vjbuidcon/" -ForegroundColor Green
Write-Host "==============================================================" -ForegroundColor Cyan
