# Clippy

Clippy is a web application that strives to streamline the coding experience by providing a centralized repository for commonly used code snippets. Its intuitive interface allows users to quickly add, retrieve, and share reusable code snippets.

The application is currently hosted at http://clippy.peterndungu.tech

**NOTE**: the URL is only for demonstration purposes and subject to change once the project has been fully deployed.

# Features

1. Create `collections` into which to store your code snippets. Collections function like folders. It is recommended to store related items under one collection, e.g. SQL code snippets can be saved under a collection called `SQL code snippets`.
2. When creating the collections, specify whether the collection is `public` or `private`. Items in `public` collections can be viewed by all users. Other users can also add items into them. However, each item can only modified by its original author. On the other hand, a `private` collection is only visible to its author.
   <br>
   <img src="images/create-a-collection.png" width="300"/>
   <br>
3. Add an item to a collection and provide an optional `description`, e.g. what it does. Also provide up to 5 optional `tags` that can be used to optimize searches. See example below
   <br>
   <img src="images/upload-item-1.png" width="300"/>
   <img src="images/upload-item-2.png" width="300"/>
   <br>
4. Search for items using the search bar. Items can be searched for based on keywords from the content, description, or tags
   <br>
   <img src="images/search.png" width="300"/>
   <br>
5. Click on an item card to copy its contents to the clipboard and paste it wherever you want.
6. Edit saved collections and items.

# Installation

## System Requurements

The following specifications are recommended for running the application locally:

- Node.js 18.17 or higher
- MySQL 8.0 or higher
- Ubuntu 20.04 or higher

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

4. To deploy the project, run `npx prisma migrate deploy` followed by `npm run build`.
