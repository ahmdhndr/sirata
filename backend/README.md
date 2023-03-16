<h1 align="center">SIRATA (Sistem Informasi Rukun Tetangga)</h1>

<p align="center">Aplikasi berbasis web untuk memudahkan pekerjaan RT dalam mengolah data kependudukan.</p>

## Features

- [ ] Pengguna
- [ ] Informasi Penduduk
- [ ] Tambah Penduduk
- [ ] Penduduk Pindah
- [ ] Penduduk Meninggal
- [ ] Filter Penduduk berdasarkan:
  - [ ] Jenis Kelamin
  - [ ] Jenis Pekerjaan
  - [ ] Pendidikan
  - [ ] Usia

## Setup

- Install dependencies: `npm install`
- Create `.env` with your values
- Run the postgres db and adminer: `docker compose up`
- Migrate the database: `npm run migrate`

> If you have postgres installed on the system and running, make sure to stop the postgres service.
> Adminer will be running at `http://localhost:8080`.

## Todo

- [x] Create database migration
- [x] Create initial seeds (role & user)
- [ ] Setup express server
- [ ] Setup Objection.js (ORM)
