// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import staticsRoutes from './routes/statics.js';
import adminRoutes from './routes/admin.js';
import twilioRoutes from './routes/twilio.js';
import servicesRoutes from './routes/services.js';

// Load environment variables
dotenv.config();

const app = express();

// Environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not defined in environment variables');
  process.exit(1);
}

console.log('🔹 Port:', PORT);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/statics', staticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/twilio', twilioRoutes);
app.use('/api/services', servicesRoutes);

// MongoDB connection with retry
const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,                  // enforce TLS/SSL
      tlsAllowInvalidCertificates: false, // production-safe
    });
    console.log('✅ MongoDB connected');

    // Start server after successful DB connection
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('⚠️ MongoDB connection failed. Retrying in 5s...', err.message);
    setTimeout(connectWithRetry, 5000); // retry after 5 seconds
  }
};

// Start initial connection attempt
connectWithRetry();

// Global error handling (optional but recommended)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});