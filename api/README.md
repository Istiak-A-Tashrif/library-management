# API

- NestJS
- Postgresql

## Install locally

1. `cp .env.example .env`
2. `docker-compose up -d`

## Prisma

- run migration locally: `npx prisma migrate dev --name init`
- generate prisma client: `prisma generate`


## Drop all tables

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

## View list of all endpoints

Inside `api` folder, run `node route.js`

# Deployment Process (Render)

## 1. Create PostgreSQL Database on Render
Follow this link to create a new database: [Render Dashboard](https://dashboard.render.com/new/database).

Make Root Directory to `/api`

## 2. Build Command for Render.com

### Build Command
```sh
npm install && npx prisma generate && npx @nestjs/cli build
```

### Environment Variables
Add the following environment variable on Render:
- `NODE_VERSION` and set the value to `18`

Add other environmental credentials according to your `.env` file.

### Start Command
```sh
npm run start:migrate:prod
```

## 3. Connect Database with HeidiSQL

### Step One: Create a New Session
Receive the External Database URL, for example:
```
postgresql://commerce_lfv3_user:JK8J4NnNWKbEelRq39XhbjDq6wrLjHpA@dpg-cpshp056l47c73e5oje0-a.oregon-postgres.render.com/commerce_lfv3
```
Format:
```
postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}
```

### Step Two: Find Database Config
Example configuration:
- `DB_USERNAME` = `commerce_lfv3_user`
- `DB_PASSWORD` = `JK8J4NnNWKbEelRq39XhbjDq6wrLjHpA`
- `DB_HOST` = `dpg-cpshp056l47c73e5oje0-a.oregon-postgres.render.com`
- `DB_NAME` = `commerce_lfv3`

### Step Three: Configure HeidiSQL for PostgreSQL
1. Open HeidiSQL and create a new session.
2. Configure the session with the following settings:
   - **Network Type:** PostgreSQL (TCP/IP)
   - **Library:** `libpq-12.dll`
   - **HostName:** `dpg-cpshp056l47c73e5oje0-a.oregon-postgres.render.com` (Use raw value)
   - **User:** `commerce_lfv3_user` (Use raw value)
   - **Password:** `JK8J4NnNWKbEelRq39XhbjDq6wrLjHpA` (Use raw value)
   - **Port:** `5432`
   - **Database:** `commerce_lfv3`

