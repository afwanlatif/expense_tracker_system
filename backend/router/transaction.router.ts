import controller from '../controller/transaction.controller';
import express from 'express';
const app = express.Router()

// Routing 

app.post('/add', controller.createTransaction);
app.put('/update/:id', controller.updateTransaction);
app.get('/getTransaction/:id', controller.getTransaction);
app.delete('/delete/:id', controller.deleteTransaction);
app.get('/getTransactions', controller.getTransactions);

export default app;