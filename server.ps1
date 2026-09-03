# Zero-dependency local static HTTP server for Windows PowerShell
param([int]$Port = 8080)

$portsToTry = @($Port, 8085, 8090, 3000, 5000)
$started = $false
$listener = $null
$activePort = $Port

foreach ($p in $portsToTry) {
    try {
        $candidate = New-Object System.Net.HttpListener
        $prefix = "http://localhost:$p/"
        $candidate.Prefixes.Add($prefix)
        $candidate.Start()
        $listener = $candidate
        $activePort = $p
        $started = $true
        break
    } catch {
        if ($candidate) {
            try { $candidate.Close() } catch {}
        }
    }
}

if (-not $started) {
    Write-Host "Error: Could not bind local HTTP server to any available port ($($portsToTry -join ', '))." -ForegroundColor Red
    exit 1
}

$prefix = "http://localhost:$activePort/"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Vishal Jamdhade Buildcon - Local Web Server" -ForegroundColor Yellow
Write-Host "  Running at: $prefix" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

$baseDir = (Get-Location).Path

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath) -or $urlPath -eq "") {
            $urlPath = "index.html"
        }

        # Prevent directory traversal
        $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($baseDir, $urlPath))
        if (-not $fullPath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $response.Close()
            continue
        }

        if (Test-Path -Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            $response.StatusCode = 200

            try {
                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
            }
        } else {
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
