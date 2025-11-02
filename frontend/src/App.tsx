import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchTransactions } from './store/transactionSlice';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FilterBar from './components/FilterBar';
import Charts from './components/Charts';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading } = useSelector((state: RootState) => state.transactions);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
            <nav className="flex space-x-8">
              {['dashboard', 'transactions', 'charts', 'add'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && <Dashboard transactions={transactions} />}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <FilterBar />
              <TransactionList transactions={transactions} loading={loading} />
            </div>
          )}
          {activeTab === 'charts' && <Charts transactions={transactions} />}
          {activeTab === 'add' && <TransactionForm />}
        </div>
      </main>
    </div>
  );
}

export default App;
