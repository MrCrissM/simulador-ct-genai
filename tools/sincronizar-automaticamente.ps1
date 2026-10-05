# Sincroniza automáticamente los cambios guardados en este repositorio con GitHub.
# Ejecución desde la raíz del repositorio:
# powershell -ExecutionPolicy Bypass -File .\tools\sincronizar-automaticamente.ps1

$ErrorActionPreference = "Stop"

$raiz = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $raiz

function Es-Ruta-Ignorada([string]$ruta) {
    $normalizada = $ruta.Replace("\", "/")
    return $normalizada -match "/\.git/" -or
           $normalizada -match "/\.graphify/" -or
           $normalizada -match "/node_modules/" -or
           $normalizada -match "/coverage/" -or
           $normalizada -match "\.log$" -or
           $normalizada -match "~$"
}

function Sincronizar {
    try {
        Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] Validando cambios..." -ForegroundColor Cyan
        node .\tools\verificar-datos.js
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "La validación falló. No se creó ningún commit ni se subió ningún cambio."
            return
        }

        git add -A
        if ($LASTEXITCODE -ne 0) { throw "No se pudo preparar el commit." }

        $hayCambios = git diff --cached --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "No hay cambios pendientes para sincronizar." -ForegroundColor DarkGray
            return
        }

        $mensaje = "Actualizar simulador $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $mensaje
        if ($LASTEXITCODE -ne 0) { throw "No se pudo crear el commit." }

        git pull --rebase origin main
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "El commit quedó local porque no se pudo integrar el remoto automáticamente. Resuelve el conflicto antes de continuar."
            return
        }

        git push origin main
        if ($LASTEXITCODE -ne 0) { throw "No se pudo subir el commit." }

        Write-Host "Sincronización completada con GitHub." -ForegroundColor Green
    }
    catch {
        Write-Warning $_.Exception.Message
    }
}

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $raiz
$watcher.Filter = "*"
$watcher.IncludeSubdirectories = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]"FileName, LastWrite, Size, DirectoryName"
$watcher.EnableRaisingEvents = $true

$pendiente = $false
$ultimaModificacion = Get-Date

$registrarEvento = {
    if (-not (Es-Ruta-Ignorada $Event.SourceEventArgs.FullPath)) {
        $script:pendiente = $true
        $script:ultimaModificacion = Get-Date
    }
}

$subscriptions = @(
    Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $registrarEvento,
    Register-ObjectEvent -InputObject $watcher -EventName Created -Action $registrarEvento,
    Register-ObjectEvent -InputObject $watcher -EventName Deleted -Action $registrarEvento,
    Register-ObjectEvent -InputObject $watcher -EventName Renamed -Action $registrarEvento
)

Write-Host "Sincronización automática activa para: $raiz" -ForegroundColor Green
Write-Host "Cada cambio guardado espera 3 segundos, se valida y se sube a origin/main."
Write-Host "Pulsa Ctrl+C para detenerla."

try {
    while ($true) {
        Start-Sleep -Milliseconds 500

        if ($pendiente -and ((Get-Date) - $ultimaModificacion).TotalSeconds -ge 3) {
            $pendiente = $false
            Sincronizar
        }
    }
}
finally {
    $subscriptions | ForEach-Object { Unregister-Event -SubscriptionId $_.Id -ErrorAction SilentlyContinue }
    $watcher.Dispose()
}
