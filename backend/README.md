<h1 align="center">SIRATA (Sistem Informasi Rukun Tetangga)</h1>

- Install dependencies: `npm install`
- Create `.env` with your values
- Run the postgres db and adminer: `docker compose up`
- Migrate the database: `npm run migrate`

> If you have postgres installed on the system and running, make sure to stop the postgres service.
> Adminer will be running at `http://localhost:8080`.

## Todo

- [x] Create database migration
- [x] Create initial seeds (role & user)
- [x] Setup express server
- [x] Setup tests
- [ ] Setup Objection.js (ORM)
