import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors()); 
dotenv.config();

const serverPort = process.env.PORT || 5000;
app.listen(serverPort, () => console.log(`App rodando liso na porta ${serverPort}!`));
