# Hatsu-oh!

Hatsu-oh! is a web app to practice pronounciation.
Upload the phrase that you want to practice, and compare with your recordings!

- Play phrase when recording
  - Recommended to use earphones.
- Sync Play
  - Playing take with the original phrase recording.

![Screentshot of hatsu-oh! app phrase detail page.](/assets/hatsuon_app_screen_shot.png)

## TODO

- [ ] CRUD: Deleting Models (Collection, Phrase, Take) from FE
- [ ] CRUD: Updating Models (Collection, Phrase, Take) from FE
- [ ] Propery show detailed error messages, especially in login page
- [x] Add precommit hook to run biome formatter / linter

# Requirements

- [PostgreSQL](https://www.postgresql.org/download/)
- python3 (higher than 3.11).
- [poetry](https://python-poetry.org/docs/)

```
// macOS
brew install pipx
pipx ensurepath
pipx install poetry
```

## Start Backend local server

It starts development server at http://localhost:8000/

- Create database and run PostgreSQL server locally.
- Create .env files

```
// .env
CSRF_TRUSTED_ORIGINS=http://localhost
CORS_ALLOWED_ORIGINS=http://localhost
DEBUG=True
POSTGRES_HOST=localhost
POSTGRES_NAME=<dbname>
POSTGRES_USER=<dbusername>
POSTGRES_PASSWORD=<dbpassword>
```

```
// svelte-kit/.env
VITE_API_BASE_URL=http://localhost:8000
```

- Run local server

```
# Activating virtual env
poetry shell

# Inside virtual env, install dependencies
poetry install

# Migrate
python manage.py migrate

# Run local server
python manage.py runserver

# Deactivating vitual env
deactivate
```

## Start Frontend local server

Starting development server at http://localhost:5173/

```
cd svelte-kit
npm install
npm run dev
```
