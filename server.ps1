$port = 8080
$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "Server running at http://localhost:$port/"
} catch {
    Write-Error "Failed to start listener on port ${port}. $_"
    exit 1
}

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".webp"  = "image/webp"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $req = $context.Request
            $res = $context.Response

            $path = $req.Url.LocalPath
            if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
                $path = "/index.html"
            }

            $cleanPath = $path.TrimStart("/").Replace("/", "\")
            $localPath = Join-Path $root $cleanPath

            if (Test-Path $localPath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                $contentType = "application/octet-stream"
                if ($mimeTypes.ContainsKey($ext)) {
                    $contentType = $mimeTypes[$ext]
                }
                $res.ContentType = $contentType

                $bytes = [System.IO.File]::ReadAllBytes($localPath)
                $res.ContentLength64 = $bytes.Length

                if ($req.HttpMethod -ne "HEAD") {
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $res.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $res.ContentType = "text/plain; charset=utf-8"
                $res.ContentLength64 = $errBytes.Length
                if ($req.HttpMethod -ne "HEAD") {
                    $res.OutputStream.Write($errBytes, 0, $errBytes.Length)
                }
            }
        } catch {
            Write-Host "Error serving request: $_"
        } finally {
            try { $context.Response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
