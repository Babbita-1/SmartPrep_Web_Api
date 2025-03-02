import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import practiceRoutes from './routes/practiceRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Default route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/practice', practiceRoutes);

export default app;
