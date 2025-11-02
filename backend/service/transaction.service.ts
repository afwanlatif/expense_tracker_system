import { Request, Response } from 'express';
import { startOfDay, endOfDay } from 'date-fns';
import { Record_Status } from "../constants/enum.constants";
import { CreateTransactionReqModel, UpdateTransactionReqModel } from "../model/request/transaction.req.model";
import { TransactionModel } from "../model/transaction.model";
import { responseStructure } from "../utils/response.structure";
import { excludeFields } from '../constants/field.constants';
import { envConfig } from '../config/env.config';


// Add Transaction
const createTransaction = async (transaction: CreateTransactionReqModel) => {
    try {
        const newTransaction = await TransactionModel.create(transaction);
        return responseStructure(201, 'Transaction created successfully', newTransaction);
    } catch (error) {
        return responseStructure(500, 'Error while creating transaction', error);
    };
};

// Update Transaction

const updateTransaction = async (req: Request, res: Response, transaction: UpdateTransactionReqModel) => {
    try {
        const transactionId = req.params.id;
        if (!transactionId) {
            return responseStructure(400, 'Transaction ID is required for update');
        };
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(transactionId, transaction, { new: true });
        return responseStructure(200, 'Transaction updated successfully', updatedTransaction);
    } catch (error) {
        return responseStructure(500, 'Error while updating transaction', error);
    };
};

// getSingleTransaction

const getTransaction = async (req: Request, res: Response) => {
    try {
        const transactionId = req.params.id;
        if (!transactionId) {
            return responseStructure(400, 'Transaction ID is required to fetch single Transaction');
        };
        const getTransaction = await TransactionModel.findById(transactionId);
        return responseStructure(200, 'Transaction fetched successfully', getTransaction);
    } catch (error) {
        return responseStructure(500, 'Error while fetching transaction', error);
    }
}

// Delete Transaction Record

const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const transactionId = req.params.id;
        if (!transactionId) {
            return responseStructure(400, 'Transaction ID is required to delete Transaction');
        };
        const deleteTransaction = await TransactionModel.findByIdAndUpdate(transactionId, { recStatus: Record_Status.inactive }, { new: true });
        return responseStructure(200, 'Transaction deleted successfully', deleteTransaction);
    } catch (error) {
        return responseStructure(500, 'Error while deleting transaction', error);
    };
};

// get All Transactions

const getTransactions = async (req: Request, res: Response) => {
    try {
        const { type, category, date, recStatus } = req.query;
        const filter: any = {
            ...(type && { type }),
            ...(category && { category }),
            ...(recStatus && { recStatus }),
            ...(date && {
                date: {
                    $gte: startOfDay(new Date(date as string)),
                    $lte: endOfDay(new Date(date as string))
                }
            })
        };
        const page = Number(req.query.page) || 1;
        const offset = (page - 1) * envConfig.pagination_limit
        const fetchTransactions = await TransactionModel.find(filter)
            .select(excludeFields.transactionExcludes)
            .skip(offset)
            .limit(envConfig.pagination_limit)
        return responseStructure(200, 'Transactions fetched successfully', fetchTransactions);
    } catch (error) {
        return responseStructure(500, 'Error while fetching transactions', error);
    };
};


export default {
    createTransaction,
    updateTransaction,
    getTransaction,
    deleteTransaction,
    getTransactions
};