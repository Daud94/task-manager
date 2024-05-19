## Description

This is a basic task management app that allow a user to sign up and create, a task. The app is developed with **NestJS** with **Prisma** for database CRUD operation.


## Installation

1. Clone this repository:
   ```bash
   $ git clone https://github.com/Daud94/task-manager.git
   ```
2. Navigate into the project directory:

   ```bash
   $ cd task-manager
   ```

3. Install dependencies

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

configure the application using environment variables. Create a `.env` file in the root of the project and define the
following variables:

```
    SALT_OR_ROUNDS=
    JWT_SECRET=
    PORT=
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
The API documentation `Task Manager.postman_collection` for this can be found in the root project directory. It should be
imported into Postman to test all API endpoints. Each endpoint comes with a sample request and response.

## API ENDPOINTS

**_AUTHENTICATION_**
* Sign up - /auth/signup
* Sign in - /auth/signin

JWT token is returned upon signing in. It should be stored on the client side for requests to other endpoints. 
Logout should be implemented on the client side to invalidate or clear the auth token.

**_USER_**
* Update profile - /users/:id  [PUT]
* Delete account - /users/:id  [DELETE]


_**TASK**_
* Create task - /tasks     [POST]
* Get task - /tasks/:id  [GET]
* Update task - /tasks/:id  [PUT]
* Delete account - /tasks/:id  [DELETE]
* Get all user tasks - /tasks [GET] - This allows for pagination and other filtering options like: task name, filtering
based on description, date range of task creation etc. Mode info is in the postman collection.

## Socket
To test streaming of task creation realtime, create two socket.io requests using Postman's socket.io client. One should be for the subscriber event 
`createTask` which listens for the client request to create a task, and the other `OnTaskCreate` which emits the task created
to clients realtime. Attached are images located in the `socket-images` folder in the project directory to help with socket.io setup on postman.






