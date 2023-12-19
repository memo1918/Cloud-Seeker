# Enviroment variables

- `CATEGORY_TEMPLATES` - Path to the templates folder (default: `""`)
- `DUMMY_DATA_URL` - URL to the dummy data (default: `""`)
    - if `DUMMY_DATA_URL` is not set, the `INFRACOST_API_KEY` is required as it will be used to fetch the dummy data
      from the infracost API
- `DB_CONNECTION_STRING` - Connection string to the mongodb database (default: `""`) required 