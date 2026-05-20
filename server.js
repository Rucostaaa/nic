import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import staticsRoutes from './routes/statics.js';
import adminRoutes from './routes/admin.js';
import twilioRoutes from './routes/twilio.js';
import servicesRoutes from './routes/services.js';

dotenv.config();

const app = express();

// Environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

console.log('Mongo URI:', MONGO_URI);
console.log('Port:', PORT);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/statics', staticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/twilio', twilioRoutes);
app.use('/api/services', servicesRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // tells Render the deploy failed
  });