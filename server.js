import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();



app.use('/api/auth',express.json(), authRoutes);
app.use('/api/statics', staticsRoutes);
app.use('/api/admin',express.json(), adminRoutes);
app.use('/api/twilio',express.json(), twilioRoutes);

console.log("Mongo",process.env.MONGO_URI);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // <-- Important: tells Render the app failed
  });