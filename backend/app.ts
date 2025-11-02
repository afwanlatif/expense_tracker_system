import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config';
import setupRoutes from './router/base.router';
const app = express();
const port = 3001;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
setupRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// DataBase Connection

connectDB()