import mongoose from 'mongoose';
import { Record_Status, recordStatuses, Transaction_Type, transactionTypes } from '../constants/enum.constants';

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: transactionTypes,
        default: Transaction_Type.income,
        required: true
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    recStatus: {
        type: String,
        enum: recordStatuses,
        default: Record_Status.active
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

export const TransactionModel = mongoose.model('transactions', transactionSchema)