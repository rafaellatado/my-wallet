# My Wallet API

The **My Wallet API** is a back-end for financial management, allowing users to register income and expense transactions.

## Technologies Used:

- Node.js with Express.js

- MongoDB (MongoDB Atlas)

- JWT for authentication

- Joi for data validation

- Dotenv for environment variables

- Render for deploy

## How to Test the API

The API is hosted on Render and uses MongoDB Atlas as the database.

### 1. Authentication

#### Create Account

**Endpoint:** `POST: https://my-wallet-ez4k.onrender.com/sign-up`

**Body:**
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "your_password",
  "confirmedPassword": "your_password"
}
```

### 2. Login

#### Create Account

**Endpoint:** `POST: https://my-wallet-ez4k.onrender.com/sign-in`

**Body:**
```json
{
  "email": "your@email.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN"
}
```

### 3. Transactions (Requires JWT Token)

### Create transaction (Income or Expense)

**Endpoint:** `POST https://my-wallet-ez4k.onrender.com/transactions`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Body:**
```json
{
  "value": 50.75,
  "description": "Lunch",
  "type": "withdraw"  // or "deposit"
}
```

### List user's transactions

**Endpoint:** `GET: https://my-wallet-ez4k.onrender.com/transactions`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Response:**
```json
[
  {
    "date": "2024-07-22",
    "value": 50.75,
    "description": "Lunch",
    "type": "withdraw"
  }
]
```

### Edit transaction

**Endpoint:** `PUT: https://my-wallet-ez4k.onrender.com/transactions/:id`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Body:**
```json
{
  "value": 45.00,
  "description": "Dinner",
  "type": "withdraw"
}
```

**Response:** `Status 204 No Content`

### Delete transaction

**Endpoint:** `DELETE: https://my-wallet-ez4k.onrender.com/transactions/:id`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Response:** `Status 204 No Content`
