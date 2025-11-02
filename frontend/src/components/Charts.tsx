import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Transaction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Props {
  transactions: Transaction[];
}

const Charts: React.FC<Props> = ({ transactions }) => {
  const incomeVsExpense = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [
          transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0),
          transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0),
        ],
        backgroundColor: ['#10B981', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const categoryData = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const categoryChart = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Amount',
        data: Object.values(categoryData),
        backgroundColor: [
          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
          '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6B7280'
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
        <div className="h-64">
          <Pie data={incomeVsExpense} options={chartOptions} />
        </div>
      </div>

      {Object.keys(categoryData).length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <div className="h-64">
            <Bar data={categoryChart} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;