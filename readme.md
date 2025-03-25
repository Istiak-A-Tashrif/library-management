# Node-commerce

## Run locally
1. clone the repo & run `npm run setup`
2. Create a new Postgresql database & Add database connection info on the `api/.env` file
3. go inside api folder & run `npx prisma db seed` to populate the database with seed data
4. Go back to the root of the project & run `npm run start` This command will run all projects at once, API
on port 8000, website on 3000 & admin panel on 3001

Docker PG Container Dump

`docker exec -i <CONTAINER_NAME OR ID> /bin/bash -c "PGPASSWORD=1234 pg_dump --username postgres espd" > /home/esadmin/espd/dump.sql`

## [Website Template Link](https://nouthemes.net/html/martfury/index.html)

## [Website Fake Apis Link](https://fakestoreapi.com)

## [Demo Site Link](https://martfury.botble.com)

***Testing Live Link***
## [API](https://node-commerce-2mds.onrender.com/api/v1)
## [Website](https://node-commerce-web.vercel.app/)
## [Vendor](https://node-commerce-vendor-ashen.vercel.app/)
## [Admin](https://node-commerce-pi.vercel.app/)
