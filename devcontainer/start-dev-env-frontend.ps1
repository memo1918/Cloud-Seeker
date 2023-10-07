docker compose -f local-dev-env-frontend.yml build
docker compose -f local-dev-env-frontend.yml up -d
Write-Output "Start developing with frontend in your IDE"
Write-Output "When done call stop-dev-env-frontend.ps1"