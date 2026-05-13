import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import staticsRoutes from './routes/statics.js';
import adminRoutes from './routes/admin.js';
import twilioRoutes from './routes/twilio.js';

import { getCurrent } from './controllers/auth.js';

dotenv.config();
const app = express();

// Middleware
app.use(  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL, // production frontend (Netlify/Vercel)
    ],
    credentials: true,
  }));

// Routes
app.use('/api/auth',express.json(), authRoutes);
app.use('/api/statics', staticsRoutes);
app.use('/api/admin',express.json(), adminRoutes);
app.use('/api/twilio',express.json(), twilioRoutes);

console.log("Mongo",process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log(`Server running on port : ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.log('MongoDB connection error:', err));
