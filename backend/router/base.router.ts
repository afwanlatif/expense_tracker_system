import express from 'express'
import TransactionRouter from '../router/transaction.router';

// setupRoutes 

const setupRoutes = (app: express.Application) => {
    app.use('/transaction', TransactionRouter)
};
export default setupRoutes;