import express from "express";
import multer from "multer";
import {
  getCategoryImage,
  uploadImage,
  getBusinessInfo,
  deleteImage,
  editImage,
  replaceLogo,
  getDashboardData,
  getImagesByCategory,
} from "../controllers/statics.js";

const router = express.Router();
const upload = multer({ dest: "tmp/" });

router.get("/dashboard-data", getDashboardData);
// Upload new image
router.post("/upload/:category", upload.single("image"), uploadImage);

// Edit existing image
router.put("/image/:id", upload.single("image"), editImage);

// Get images by category
router.get("/images/:category", getCategoryImage);
router.get("/imagesByCategory/:category", getImagesByCategory);

// Delete image
router.delete("/image/:id", deleteImage);
router.get("/business-info", getBusinessInfo);

router.put("/business-info/logo", upload.single("logo"), replaceLogo);

export default router;
