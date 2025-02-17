import { db } from "../config/database.js";
import dotevn from 'dotenv';
import { ObjectId } from "mongodb";

dotevn.config();

export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const userId = req.userId; 

  try { 
    const transaction = {
      userId,
      value,
      description,
      type,
      createdAt: new Date()
    };

    await db.collection('transactions').insertOne(transaction);

    res.status(201).send({ message: 'Transaction created successfully!' });

  } catch (err) {
    res.status(500).send(err.message);
  }
}


export async function getTransactions(req, res) {

  const page = parseInt(req.query.page) || 1;
  const resultsPerPage = 10;

  if (page < 1) {
    return res.status(400).send("Invalid page number. It must be a positive integer.");
  }

  const start = (page - 1) * resultsPerPage;

  try {
    const transactions = await db
      .collection('transactions')
      .find()
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(resultsPerPage)
      .toArray();

    res.status(200).send(transactions);

  } catch (error) {
    res.status(500).send(err.message);
  }
} 

export async function updateTransaction(req, res) {
  const { value, description, type } = req.body;
  const { _id: transactionId } = req.params;
  const userId = req.userId; 

  try { 
    const currentTransaction = await db.collection('transactions').findOne({ _id: new ObjectId(transactionId) }); 

    if (!currentTransaction) {
      return res.status(404).send('Transaction not found.');
    }

    if (currentTransaction.userId.toString() !== userId) {
      return res.status(401).send("You're not authorized to update this transaction, because you're not its creator.");
    }

    const updatedTransaction = { value, description, type };

    await db.collection('transactions').updateOne({ _id: new ObjectId(transactionId) }, { $set: updatedTransaction });

    res.status(204).send("Transaction successfully deleted!");

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteTransaction(req, res) {
  const { _id: transactionId } = req.params;
  const userId = req.userId;

  console.log(transactionId);
  console.log(userId);

  try {
    const currentTransaction = await db.collection('transactions').findOne({ _id: new ObjectId(transactionId) }); 

    if (!currentTransaction) {
      return res.status(404).send('Transaction not found.');
    }

    if (currentTransaction.userId.toString() !== userId) {
      return res.status(401).send("You're not authorized to delete this transaction, because you're not its creator.");
    }

    await db.collection('transactions').deleteOne({ _id: new ObjectId(transactionId) })
		res.status(204).send('Transaction successfully deleted!');
 
  } catch (error) {
    res.status(500).send(error);
  }
}
