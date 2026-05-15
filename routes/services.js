import express from 'express';
import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/services.js';

const router = express.Router();

router.route('/')
  .get(getAllCategories)
  .post(createCategory);

router.route('/:id')
  .get(getSingleCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;