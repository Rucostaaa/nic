import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin in DB
    const admin = await Admin.findById(decoded.id).select('-password'); // exclude password
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Attach admin info to request object
    req.user = admin;

    next(); // pass control to next middleware/controller
  } catch (err) {
    console.error('verifyToken error:', err);
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};