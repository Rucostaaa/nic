import express from 'express';
import multer from 'multer';
import { getCategoryImage, uploadImage, deleteImage, editImage ,replaceLogo} from '../controllers/statics.js';

const router = express.Router();
const upload = multer({ dest: 'tmp/' });

// Upload new image
router.post('/upload/:category', upload.single('image'), uploadImage);

// Edit existing image
router.put('/image/:id', upload.single('image'), editImage);

// Get images by category
router.get('/images/:category', getCategoryImage);

// Delete image
router.delete('/image/:id', deleteImage);

router.put('/business-info/logo', upload.single('logo'),replaceLogo);

export default router;