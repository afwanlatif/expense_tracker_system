# 💰 Expense Tracker System

A modern, full-stack expense tracking application built with React and Node.js to help you manage your finances effectively.

## ✨ Features

- 📊 **Interactive Dashboard** - Visual charts and analytics
- 💸 **Transaction Management** - Add, edit, and delete expenses/income
- 🔍 **Smart Filtering** - Filter by date, category, and amount
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Updates** - Instant data synchronization

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense_tracker_system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Chart.js** for data visualization
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Zod** for validation
- **CORS** enabled

## 📁 Project Structure

```
expense_tracker_system/
├── backend/                 # Node.js API server
│   ├── config/             # Database and environment config
│   ├── controller/         # Request handlers
│   ├── model/              # Data models and schemas
│   ├── router/             # API routes
│   ├── service/            # Business logic
│   └── utils/              # Helper functions
└── frontend/               # React application
    ├── src/
    │   ├── components/     # React components
    │   ├── store/          # Redux store
    │   ├── types/          # TypeScript types
    │   └── utils/          # Utility functions
    └── public/             # Static assets
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
MONGO_URL=your_mongodb_connection_string
PAGINATION_LIMIT=5
```

## 📝 API Endpoints

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy tracking! 📈**
