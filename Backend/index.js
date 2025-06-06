import express from 'express';
import connectDB from './src/config/db_config.js';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './.env'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRouter)

// Database connection
connectDB().then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection failed:', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});