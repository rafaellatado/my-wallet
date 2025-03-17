# https://my-wallet-ez4k.onrender.com

# My Wallet API

A My Wallet API é um back-end para gerenciamento financeiro, permitindo que usuários registrem transações de entrada e saída de dinheiro.

Como Testar a API

A API está hospedada em Render e utiliza MongoDB Atlas como banco de dados.

1. Autenticação

Criar conta

Endpoint: POST /sign-up

Body:

{
  "name": "Seu Nome",
  "email": "seu@email.com",
  "password": "sua_senha"
}

Fazer login

Endpoint: POST /sign-in

Body:

{
  "email": "seu@email.com",
  "password": "sua_senha"
}

Resposta:

{
  "token": "JWT_TOKEN"
}

2. Transações (Requer Token JWT)

Criar transação (Entrada ou Saída)

Endpoint: POST /transactions

Headers: { Authorization: Bearer JWT_TOKEN }

Body:

{
  "value": 50.75,
  "description": "Almoço",
  "type": "withdraw"  // ou "deposit"
}

Listar transações do usuário

Endpoint: GET /transactions

Headers: { Authorization: Bearer JWT_TOKEN }

Resposta:

[
  {
    "date": "2024-07-22",
    "value": 50.75,
    "description": "Almoço",
    "type": "withdraw"
  }
]

Editar transação

Endpoint: PUT /transactions/:id

Headers: { Authorization: Bearer JWT_TOKEN }

Body:

{
  "value": 45.00,
  "description": "Jantar",
  "type": "withdraw"
}

Resposta: Status 204 No Content

Deletar transação

Endpoint: DELETE /transactions/:id

Headers: { Authorization: Bearer JWT_TOKEN }

Resposta: Status 204 No Content

Tecnologias Utilizadas:

Node.js com Express.js

MongoDB (MongoDB Atlas)

JWT para autenticação

Joi para validação de dados

Dotenv para variáveis de ambiente

Render para deploy


Como Rodar Localmente

Clone o repositório e instale as dependências:

git clone https://github.com/seu-usuario/my-wallet-api.git
cd my-wallet-api
npm install 

Configure o arquivo .env:

DATABASE_URL=seu_mongo_uri
JWT_SECRET=sua_chave_secreta

Inicie o servidor:

npm start
