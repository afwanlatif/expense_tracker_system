export interface Transaction {
  _id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description?: string;
  category: string;
  date: string;
  recStatus: 'ACTIVE' | 'INACTIVE';
}

export interface TransactionForm {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface FilterState {
  type: string;
  category: string;
  date: string;
}