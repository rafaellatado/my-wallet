import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URL;
const mongoClient = new MongoClient(mongoURL);

try {
  await mongoClient.connect();
  console.log('MongoDB conectado!');
} catch (error) {
  console.log(error.message);
}

export const db = mongoClient.db("my_wallet_db");
