import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionForm, FilterState } from '../types';
import { transactionAPI } from '../utils/api';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  filters: {
    type: '',
    category: '',
    date: '',
  },
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (filters?: Partial<FilterState>) => {
    const response = await transactionAPI.getTransactions(filters);
    return response.data.data;
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction: TransactionForm) => {
    const response = await transactionAPI.createTransaction(transaction);
    return response.data.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: string) => {
    await transactionAPI.deleteTransaction(id);
    return id;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(t => t._id !== action.payload);
      });
  },
});

export const { setFilters, clearError } = transactionSlice.actions;
export default transactionSlice.reducer;