import dotenv from 'dotenv';
dotenv.config();

const { PORT, MONGO_URL,PAGINATION_LIMIT } = process.env;

export const envConfig = {
    port: Number(PORT),
    mongo_url: MONGO_URL!,
    pagination_limit : Number(PAGINATION_LIMIT)
}