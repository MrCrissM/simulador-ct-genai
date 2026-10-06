# Sincroniza automáticamente los cambios guardados en este repositorio con GitHub.
# Ejecución desde la raíz del repositorio:
# powershell -ExecutionPolicy Bypass -File .\tools\sincronizar-automaticamente.ps1

$ErrorActionPreference = "Stop"

$raiz = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $raiz
$archivoBloqueo = Join-Path $raiz ".git\ctgenai-sync.lock"

function Esperar-Estabilidad {
    param([string[]]$EstadoInicial)

    Start-Sleep -Seconds 3
    $confirmacion = @(git status --porcelain)
    return $LASTEXITCODE -eq 0 -and
        (($confirmacion -join "`n") -eq ($EstadoInicial -join "`n"))
}

function Sincronizar {
    $bloqueoCreado = $false
    try {
        # Evita que dos terminales o dos ciclos del watcher sincronicen a la vez.
        New-Item -Path $archivoBloqueo -ItemType File -ErrorAction Stop | Out-Null
        $bloqueoCreado = $true

        Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] Actualizando desde GitHub..." -ForegroundColor Cyan
        git pull --rebase --autostash origin main
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "No se pudo actualizar desde GitHub. Revisa los conflictos antes de continuar."
            return
        }

        $pendientes = @(git status --porcelain)
        if ($LASTEXITCODE -ne 0) { throw "No se pudo revisar el estado del repositorio." }
        if ($pendientes.Count -eq 0) {
            Write-Host "No hay cambios pendientes para sincronizar." -ForegroundColor DarkGray
            return
        }

        Write-Host "Validando cambios..." -ForegroundColor Cyan
        node .\tools\verificar-datos.js
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "La validación falló. No se creó ningún commit ni se subió ningún cambio."
            return
        }

        git add -A
        if ($LASTEXITCODE -ne 0) { throw "No se pudo preparar el commit." }

        git diff --cached --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "No hay cambios preparados para sincronizar." -ForegroundColor DarkGray
            return
        }

        $mensaje = "Actualizar simulador $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $mensaje
        if ($LASTEXITCODE -ne 0) { throw "No se pudo crear el commit." }

        git push origin main
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "El commit quedó local porque no se pudo subir. Ejecuta git pull --rebase y vuelve a intentar."
            return
        }

        Write-Host "Sincronización completada con GitHub." -ForegroundColor Green
    }
    catch {
        Write-Warning $_.Exception.Message
    }
    finally {
        if ($bloqueoCreado -and (Test-Path $archivoBloqueo)) {
            Remove-Item -Force $archivoBloqueo -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "Sincronización automática activa para: $raiz" -ForegroundColor Green
Write-Host "Revisa cambios cada 5 segundos; antes de subir espera 3 segundos de estabilidad."
Write-Host "Pulsa Ctrl+C para detenerla."

while ($true) {
    $cambios = @(git status --porcelain)

    if ($LASTEXITCODE -eq 0 -and $cambios.Count -gt 0) {
        if (Esperar-Estabilidad $cambios) {
            Sincronizar
        }
    }

    Start-Sleep -Seconds 5
}
