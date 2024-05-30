# Clippy

A repository for storing your commonly used code snippets.

## System Requurements

- Node.js 18.17 or higher
- MySQL 8.0 or higher
- Ubuntu 22.04 or higher

## Project Setup

Navigate to the root of the repository and follow the following steps.

1. create a `.env` file and paste the following contents:

```
datasource db {
  provider: "mysql"
  url: env(DATABASE_URL)
}
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/clippy"

# Session expiration time in hours
SESSION_EXPIRES=72
```

Replace USERNAME, PASSWORD, HOST, PORT with the MySQL configurations for connecting to your local
instance of MySQL. Note: The default port is `3306` on most MySQL installations.

2. Navigate the root of the project and run the following commands from the terminal:

   1. `npm install`
   2. `npx prisma migrate dev`

3. Run `npm run dev` on the terminal to start the dev server and open the link displayed to test the application.
