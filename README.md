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

It starts the backend local server at http://localhost:8000/

In order to configure and run the backend local server on your machine, you
need to perform the following steps:

1. Create the database and run PostgreSQL server locally.
2. Create the backend local server environment variable `.env` file.
3. Install all Poetry packages.
4. Migrate the database you created.
5. Start and run the backend local server.

Create a database for the backend local server by running the following
command, where `<dbname>` is the database name that you want to use, e.g.,
`hatsuon-app`.

```bash
createdb "<dbname>"
```

To create the `.env` file for the backend local server, create a file with the
following contents:

```
# .env
CSRF_TRUSTED_ORIGINS=http://localhost
CORS_ALLOWED_ORIGINS=http://localhost
DEBUG=True
POSTGRES_HOST=localhost
POSTGRES_NAME=<dbname>
POSTGRES_USER=<dbusername>
POSTGRES_PASSWORD=<dbpassword>
```

If you have a database connection URL, you can also put the following contents
in the `.env` file:

```
# .env
CSRF_TRUSTED_ORIGINS=http://localhost
CORS_ALLOWED_ORIGINS=http://localhost
DEBUG=True
# Refer to the following link for the URL schema reference:
# https://github.com/jazzband/dj-database-url?tab=readme-ov-file#url-schema
# This is an example value for when you want to connect to PostgreSQL using a
# Unix domain socket:
DATABASE_URL=postgres://%2Ftmp/<dbname>
```

To install all Poetry packages, run the following in your shell. Please ensure
that you have Poetry running on your system.

```bash
poetry install
```

To migrate the database that you have created for the backend local server,
run the following command:

```bash
poetry run ./manage.py migrate
```

To run the development server, run the following command:

```bash
poetry run ./manage.py runserver
```

If you want to avoid typing `poetry run` every time, you can enter a Poetry
Python virtual environment shell using:

```bash
poetry shell
```

If you want to leave the Poetry shell, you can type the following command
inside the Poetry shell that you have entered above:

```bash
# Inside the Poetry shell
deactivate
```

You can also press `CTRL-D` or enter `exit`, and leave the Poetry shell like
any other shell session.

## Start Frontend local server

Starting frontend local server at http://localhost:5173/

To start the frontend local server, you need to perform the following steps:

1. Create the frontend local server environment variable `.env` file.
2. Install all node packages.
3. Start and run the frontend local server.

Configure the frontend local server by writing the following contents
in `svelte-kit/.env`:

```
# svelte-kit/.env
VITE_API_BASE_URL=http://localhost:8000
```

Install all dependencies, by changing into the `svelte-kit` folder (
`cd svelte-kit`) and running the following command:

```bash
# cd svelte-kit if you have not already
npm install
```

Start up the frontend local server using the following command:

```bash
npm run dev
```

You can exit the frontend local server by pressing `CTRL+C` in the terminal
where the frontend local server is running.
