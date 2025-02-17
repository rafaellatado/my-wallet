import { Router } from 'express';
import { getTransactions, createTransaction, updateTransaction,deleteTransaction } from '../controllers/transactionsController.js';
import { validateToken } from '../middlewares/authMiddleware.js';
import { transactionsPostSchema, transactionsPutSchema } from '../schemas/transactionsSchema.js';
import { validateSchema } from '../middlewares/schemaMiddleware.js';

const transactionsRouter = Router();

/* transactionsRouter.use(validateToken); */ //use only if we want to validate everything below
transactionsRouter.post('/transactions', validateToken, validateSchema(transactionsPostSchema), createTransaction);
transactionsRouter.get('/transactions', validateToken, getTransactions);
transactionsRouter.put('/transactions/:_id', validateToken, validateSchema(transactionsPutSchema), updateTransaction);
transactionsRouter.delete('/transactions/:_id', validateToken, deleteTransaction);

export default transactionsRouter; 
