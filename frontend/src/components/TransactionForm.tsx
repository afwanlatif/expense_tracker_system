import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { createTransaction } from '../store/transactionSlice';
import { TransactionForm as TForm } from '../types';

const TransactionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<TForm>({
    type: 'EXPENSE',
    amount: 0,
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Partial<TForm>>({});
  const [loading, setLoading] = useState(false);

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Healthcare', 'Salary', 'Freelance', 'Investment', 'Other'];

  const validate = (): boolean => {
    const newErrors: Partial<TForm> = {};
    if (!form.amount || form.amount <= 0) newErrors.amount = 1;
    if (!form.category) newErrors.category = '';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await dispatch(createTransaction(form)).unwrap();
      setForm({
        type: 'EXPENSE',
        amount: 0,
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Failed to create transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as 'INCOME' | 'EXPENSE' })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={form.amount || ''}
            onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : ''}`}
            placeholder="0.00"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">Amount is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.category !== undefined ? 'border-red-500' : ''}`}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category !== undefined && <p className="text-red-500 text-sm mt-1">Category is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Optional description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;