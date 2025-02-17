import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import transactionsRouter from './routers/transactionsRouter.js';
import authRouter from './routers/authRouter.js';

const app = express();
app.use(express.json());
app.use(cors()); 
dotenv.config();

app.use(transactionsRouter);
app.use(authRouter);

const serverPort = process.env.PORT || 5000;
app.listen(serverPort, () => console.log(`App rodando liso na porta ${serverPort}!`));
