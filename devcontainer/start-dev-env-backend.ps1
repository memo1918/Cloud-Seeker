[System.Environment]::SetEnvironmentVariable('DB_CONNECT_URL','mongodb://localhost:27017')
docker compose -f local-dev-env-backend.yml up
