# Northwind API

REST API for Northwind database built with Node.js and Express.

## Tech Stack

![NodeJS](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Joi](https://img.shields.io/badge/Joi-Validation-0080FF?style=for-the-badge)

## Features

- JWT Authentication & Authorization
- Role-based access control (admin, employee, customer)
- Ownership check
- Soft delete & restore
- Pagination
- Input validation
- Global error handling
- API documentation with Swagger

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL

### Installation

1. Clone the repo
   git clone https://github.com/Fordnetskiy/northwind-api

2. Install dependencies
   npm install

3. Copy env file
   cp .env.example .env

4. Fill in your .env variables

5. Run the app
   npm run dev

## Environment Variables

| Variable      | Description        | Example                  |
| ------------- | ------------------ | ------------------------ |
| `PORT`        | Server port        | 3000                     |
| `NODE_ENV`    | Environment        | (development/production) |
| `DB_NAME`     | Database name      | northwind                |
| `DB_HOST`     | Database host      | yourhost                 |
| `DB_PORT`     | Database port      | yourdbport               |
| `DB_USER`     | Database user      | yourusername             |
| `DB_PASSWORD` | Database password  | make it strong please    |
| `JWT_SECRET`  | Secret key for JWT | make it stronger please  |

## API Documentation and Endpoints:

Run the app and open:
http://localhost:3000/api-docs

## Database Setup

1. Create a new PostgreSQL database:

```sql
   CREATE DATABASE northwind;
```

2. Import the database schema:

```bash
   psql -U postgres -d northwind -f database/northwind_dump.sql
```

### First Admin Setup

1. Register a new user via API:

```
   POST /api/v1/auth/register
```

2. Manually set the admin role in the database:

```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

3. Login with your credentials:

```
   POST /api/v1/auth/login
```

4. Copy the token from the response and use it in Swagger UI via the **Authorize** 🔒 button
