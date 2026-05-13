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

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
console.log('Mongo URI:', MONGO_URI);
console.log('Port:', PORT);
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
