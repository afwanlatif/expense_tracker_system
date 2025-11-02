import mongoose from 'mongoose';
import { envConfig } from './env.config';

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.mongo_url)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed", error);
    };
};