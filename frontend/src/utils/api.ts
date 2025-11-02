import axios from 'axios';
import { Transaction, TransactionForm } from '../types';

const API_BASE_URL = 'http://localhost:3001/transaction';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const transactionAPI = {
  getTransactions: (params?: any) =>
    api.get<{ data: Transaction[] }>('/getTransactions', { params }),

  createTransaction: (transaction: TransactionForm) =>
    api.post<{ data: Transaction }>('/add', transaction),

  updateTransaction: (id: string, transaction: Partial<TransactionForm>) =>
    api.put<{ data: Transaction }>(`/update/${id}`, transaction),

  getTransaction: (id: string) =>
    api.get<{ data: Transaction }>(`/getTransaction/${id}`),

  deleteTransaction: (id: string) =>
    api.delete<{ data: Transaction }>(`/delete/${id}`),
};