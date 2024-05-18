## Description

This is a Bookstore app (backend) that assist bookstore owners keep record of books including their authors and the
category each book belongs to. The app is developed with **NestJS** with **Prisma** for database mapping.The app requires that bookstore owner signup by providing basic details like `firstName`,
`lastName`, `email` and `password`. There is a signin page that allow user to sign in on the app.

After signing up, the user can create new book category, author and add books based on created categories and authors.

## Installation

1. Clone this repository:
   ```bash
   $ git clone https://github.com/Daud94/be-assessment.git
   ```
2. Navigate into the project directory:

   ```bash
   $ cd quiz-app-backend
   ```

3. Checkout to dev branch
    ```
   $ git checkout dev
   ```
4. Install dependencies

   ```bash
   $ npm install
   ```

## Database Configuration

The application is configured to use in-memory DBMS (sqlite). It can also be configured to use other DBMS by specifying in the
`schema.prisma` located in the `prisma` folder in the project root the following values:
```angular2html
  provider = "postgresql"  
  url      = env("DATABASE_URL")
```

`Provider` can be `postgresql` or `mysql` or any other as specified in [Prisma documentation](https://www.prisma.io/docs/orm/overview/databases).

Ensure you have created .env file in the project root folder; Create `DATABASE_URL` variable and assign your database url to it. Read Prisma [documentation](https://www.prisma.io/docs/orm/overview/databases) on how to connect to a database.
Since this app makes use of sqlite, you don't need to carry out any configuration. Simply run the commands below:
```
    $ npx prisma migrate dev
```

## Environment Variables

onfigure the application using environment variables. Create a `.env` file in the root of the project and define the
following variables:

```
    SALT_OR_ROUNDS=
    JWT_SECRET=
```

## Running the app

```bash
    # development
    $ npm run start
    
    # watch mode
    $ npm run start:dev
    
    # production mode
    $ npm run start:prod
````

## API Documentation

The API documentation `Quiz App.postman_collection.json` for this can be found in the root project directory. It should be
imported into Postman to test all API endpoints. Each endpoint comes with a sample request and response.

## Testing

Testing is done to test `Signup` and `Signin` of user. Test file can be found in `auth.controller.spec.ts` in auth directory.




