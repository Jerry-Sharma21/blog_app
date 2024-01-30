import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
