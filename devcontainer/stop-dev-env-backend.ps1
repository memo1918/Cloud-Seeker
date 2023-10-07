docker compose -f local-dev-env-backend.yml down
[Environment]::SetEnvironmentVariable("DB_CONNECT_URL", $null)
Write-Output "Cleanup complete"
