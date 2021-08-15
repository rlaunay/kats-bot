import dotenv from 'dotenv-safe';
dotenv.config();

export const token = process.env.TOKEN || '';
