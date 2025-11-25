# Auth API

A authentication API built with Node.js, Express, Redis, and JWT.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt (very popular)
- Redis for data storage and cache
- Protected endpoints with middleware
- Automatic first user seeding on first run

## General Notes

- Using .ENV file. Attached to the project to test proposed
- Passwords are hashed using bcrypt (popular lib)
- JWT tokens expire after 15 minutes (.env file)
- Create and List users endpoints require authentication
- The seed file with user/password it's not best solution, used for simple project
- Added eslint to help find errors
- List users API handle with cache

## Prerequisites

- Node.js (tested with v22)
- Redis (running locally or remote)
- npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dordetto/auth-api
cd auth-api
```

2. Install dependencies:

```bash
npm install
```

3. Update `.env` file in the root directory (if necessary)

4. Start Redis (if running locally)

5. Start the server:

```bash
npm start
```

first time only creates an initial admin user (/seed/01-first_user.seed.js):

- **Username:** `admin`
- **Password:** `Admin123`

The API will be available at `http://localhost:3000`

## API Endpoints

POST /auth/login  
POST /auth/register  
GET /users (Extra, to test cache)

### API Endpoints - Details

#### Login

POST /auth/login  
Content-Type: application/json  
json  
{  
"username": "admin",  
"password": "Admin123"  
}

#### Register a New User

POST /auth/register  
Content-Type: application/json  
Authorization: Bearer <token>  
json  
{  
"username": "new_user",  
"password": "Password123"  
}

#### List All Users

GET /users  
Authorization: Bearer <token>

## Example Usage in Terminal

### 1. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123"}'
```

**Save the token from the response.**

### 2. Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"username":"johndoe","password":"SecurePass123"}'
```

### 3. List All Users

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
