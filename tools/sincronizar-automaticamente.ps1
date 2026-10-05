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

function Hay-Cambios-Pendientes {
    git status --porcelain
    return $LASTEXITCODE -eq 0 -and $null -ne $output -and $output.Count -gt 0
}

Write-Host "Sincronización automática activa para: $raiz" -ForegroundColor Green
Write-Host "Revisa cambios cada 5 segundos; antes de subir espera 3 segundos de estabilidad."
Write-Host "Pulsa Ctrl+C para detenerla."

while ($true) {
    $output = @(git status --porcelain)

    if ($LASTEXITCODE -eq 0 -and $output.Count -gt 0) {
        Start-Sleep -Seconds 3
        $confirmacion = @(git status --porcelain)

        if ($LASTEXITCODE -eq 0 -and ($confirmacion -join "`n") -eq ($output -join "`n")) {
            Sincronizar
        }
    }

    Start-Sleep -Seconds 5
}
