import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Image from '../models/Image.js';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


export const uploadImage = async (req, res) => {
  try {
    const { category    } = req.params;

    
    const featuredType = req.body?.featured || 'gallery';

    console.log('Params:', req.params);
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: category.charAt(0).toUpperCase() + category.slice(1) + 'Cleaning',
    });

    fs.unlinkSync(req.file.path);

    const image = new Image({
      category,
      url: result.secure_url,
      public_id: result.public_id,
      featured: featuredType,
    });

    await image.save();
    res.json({ message: 'Image uploaded successfully', ...image.toObject() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};



export const getCategoryImage = async (req, res) => {
  try {
    const { category } = req.params;

    const images = await Image.find({ category });
    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch images', error: err.message });
  }
};

export const deleteImage = async (req, res) => {
   console.log("File received:", req.file,req.body);
     console.log("Params:", req.params,req.body);

  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await cloudinary.uploader.destroy(image.public_id);
    await image.deleteOne();

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete image', error: err.message });
  }
};

export const editImage = async (req, res) => {
  console.log("File received:", req.file, req.body);

  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    // ---------- Update featured ----------
    if (req.body.featured) {
      image.featured = req.body.featured;
    }

    // ---------- Update image file if uploaded ----------
    if (req.file) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(image.public_id);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: image.category.charAt(0).toUpperCase() + image.category.slice(1) + 'Cleaning',
      });

      fs.unlinkSync(req.file.path);

      image.url = result.secure_url;
      image.public_id = result.public_id;
    }

    await image.save();

    res.json({ message: 'Image updated successfully', ...image.toObject() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update image', error: err.message });
  }
};
export const replaceLogo = async (req, res) => {

  
  try {
    const admin = await Admin.findOne();
    
    if (!admin) return res.status(404).json({ message: "Admin not found" });
 console.log("File received:", req.file,req.body);
        console.log("File received:", req.body);
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

   


    // Optional: delete old logo from Cloudinary if stored there
    if (admin.businessInfo.logoPublicId) {
      try {
        await cloudinary.uploader.destroy(admin.businessInfo.logoPublicId);
      } catch (err) {
        console.warn("Failed to delete old logo:", err.message);
      }
    }

    // Upload new logo to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "BusinessLogo",
      use_filename: true,
      unique_filename: false,
    });
    

    // Remove local temp file
    fs.unlinkSync(req.file.path);

    // Save new logo URL and public_id to admin
    admin.businessInfo.logo = result.secure_url;
    admin.businessInfo.logoPublicId = result.public_id;
    await admin.save();
    console.log("saved");

    res.status(200).json({ message: "Logo updated successfully", logo: admin.businessInfo.logo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update logo", error: err.message });
  }
};

export const getBusinessInfo = async (req, res) => {
  try {
    // Find the admin with role 'Admin'
    const admin = await Admin.findOne({}).select("businessInfo");
    
    if (!admin) {
      return res.status(404).json({ message: "Info not found" });
    }

    res.status(200).json(admin.businessInfo);
  } catch (error) {
    console.error("Error fetching business info:", error);
    res.status(500).json({ message: "Server error" });
  }
};