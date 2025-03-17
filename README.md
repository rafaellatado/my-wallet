# https://my-wallet-ez4k.onrender.com

# My Wallet API

A **My Wallet API** é um back-end para gerenciamento financeiro, permitindo que usuários registrem transações de entrada e saída de dinheiro.

## Como Testar a API

A API está hospedada em Render e utiliza MongoDB Atlas como banco de dados.

### 1. Autenticação

#### Criar Conta

**Endpoint:** `POST: https://my-wallet-ez4k.onrender.com/sign-up`

**Body:**
```json
{
  "name": "Seu Nome",
  "email": "seu@email.com",
  "password": "sua_senha",
  "confirmedPassword": "sua_senha"
}
```

### 2. Fazer login

#### Criar Conta

**Endpoint:** `POST: https://my-wallet-ez4k.onrender.com/sign-in`

**Body:**
```json
{
  "email": "seu@email.com",
  "password": "sua_senha"
}
```

**Resposta:**
```json
{
  "token": "JWT_TOKEN"
}
```

### 3. Transações (Requer Token JWT)

### Criar transação (Entrada ou Saída)

**Endpoint:** `POST https://my-wallet-ez4k.onrender.com/transactions`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Body:**
```json
{
  "value": 50.75,
  "description": "Almoço",
  "type": "withdraw"  // ou "deposit"
}
```

### Listar transações do usuário

**Endpoint:** `GET /transactions`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Resposta:**
```json
[
  {
    "date": "2024-07-22",
    "value": 50.75,
    "description": "Almoço",
    "type": "withdraw"
  }
]
```

### Editar transação

**Endpoint:** `PUT /transactions/:id`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Body:**
```json
{
  "value": 45.00,
  "description": "Jantar",
  "type": "withdraw"
}
```

**Resposta:** `Status 204 No Content`

### Deletar transação

**Endpoint:** `DELETE /transactions/:id`

**Headers:** `{ Authorization: Bearer JWT_TOKEN }`

**Resposta:** `Status 204 No Content`

# Tecnologias Utilizadas:

- Node.js com Express.js

- MongoDB (MongoDB Atlas)

- JWT para autenticação

- Joi para validação de dados

- Dotenv para variáveis de ambiente

- Render para deploy
