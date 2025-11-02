import { Request, Response } from 'express';
import { CreateTransactionReqModelSchema, UpdateTransactionReqModelSchema } from "../model/request/transaction.req.model";
import TransactionService from '../service/transaction.service'
import { responseStructure } from "../utils/response.structure";

// Add Transaction
const createTransaction = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateTransactionReqModelSchema.parse(req.body);
        const response = await TransactionService.createTransaction(validatedData);
        return res.status(201).json(response)
    } catch (error) {
        return res.status(400).json(responseStructure(400, 'Invalid request body', error))
    };
};

// Update Transaction

const updateTransaction = async (req: Request, res: Response) => {
    try {
        // Combine route parameter with request body Get id from URL parameter Spread the request body
        const dataToValidate = { id: req.params.id, ...req.body };
        const validatedData = UpdateTransactionReqModelSchema.parse(dataToValidate);
        const resposne = await TransactionService.updateTransaction(req, res, validatedData);
        return res.status(200).json(resposne)
    } catch (error) {
        return responseStructure(400, 'Invalid request body', error)
    };

};

// Get Single Transaction

const getTransaction = async (req: Request, res: Response) => {
    try {
        const response = await TransactionService.getTransaction(req, res);
        return res.status(200).json(response)
    } catch (error) {
        return responseStructure(400, 'Transaction not found', error)
    };
};

// Delete Transaction 

const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const response = await TransactionService.deleteTransaction(req, res);
        return res.status(200).json(response)
    } catch (error) {
        return responseStructure(400, 'Transaction not found', error);
    };
};

// Get All Transactions

const getTransactions = async (req: Request, res: Response) => {
    try {
        const resposne = await TransactionService.getTransactions(req, res);
        return res.status(200).json(resposne)
    } catch (error) {
        return responseStructure(400, 'Transactions not found', error);
    };
};

export default {
    createTransaction,
    updateTransaction,
    getTransaction,
    deleteTransaction,
    getTransactions
}