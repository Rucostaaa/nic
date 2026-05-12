import express from 'express';
import { loginAdmin, getCurrent ,registerAdmin,deleteAdmins} from '../controllers/auth.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Login route
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Current admin route (protected)
router.get('/current', verifyToken, getCurrent);
router.post('/delete-admins', deleteAdmins);

export default router;