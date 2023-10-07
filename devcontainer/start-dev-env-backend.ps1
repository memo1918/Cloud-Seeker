[System.Environment]::SetEnvironmentVariable('DB_CONNECT_URL','mongodb://localhost:27017')
docker compose -f local-dev-env-backend.yml build
docker compose -f local-dev-env-backend.yml up -d
Write-Output "Start developing with backend in your IDE"
Write-Output "When done call stop-dev-env-backend.ps1"
