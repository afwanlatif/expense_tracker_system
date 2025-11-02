import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { deleteTransaction } from '../store/transactionSlice';
import { Transaction } from '../types';
import { format } from 'date-fns';

interface Props {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionList: React.FC<Props> = ({ transactions, loading }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
      </div>
      
      {transactions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.type === 'INCOME' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                    <span className="font-medium">{transaction.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{transaction.description}</p>
                  <p className="text-gray-500 text-xs">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;