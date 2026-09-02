$gitDir = "$env:LOCALAPPDATA\Programs\MinGit\cmd"
$env:Path = "$gitDir;$env:LOCALAPPDATA\Programs\MinGit\mingw64\bin;$env:LOCALAPPDATA\Programs\MinGit\usr\bin;$env:Path"

Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " Pushing code to https://github.com/sanketengagex-sudo/vjbuidcon" -ForegroundColor Yellow
Write-Host " If prompted, complete the one-time sign-in in your browser." -ForegroundColor Green
Write-Host "==============================================================" -ForegroundColor Cyan

git push -u origin main
