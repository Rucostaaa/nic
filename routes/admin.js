// routes/admin.js
import express from 'express';
import multer from 'multer';
import Admin from '../models/Admin.js';

const router = express.Router();
const upload = multer({ dest: 'tmp/' }); // For logo uploads

// -----------------------------
// Get business info
// -----------------------------
router.get('/business-info', async (req, res) => {
  try {
    
    const admin = await Admin.findOne(); // Assuming single admin
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json(admin.businessInfo);
  } catch (err) {
    console.log(err.message);
    
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------
// Update email
// -----------------------------
router.put('/business-info/email', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email",req.body);
    
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const oldEmail = admin.businessInfo.email;
    admin.businessInfo.email = email;

    await admin.save();
    console.log('email added',admin);
    
    res.json({ message: `Email updated from ${oldEmail} to ${email}`, email });
  } catch (err) {
        console.log(err.message);

    res.status(500).json({ message: err.message });
  }
});

// -----------------------------
// Update phone
// -----------------------------
router.put('/business-info/phone', async (req, res) => {
  try {
    const { phone } = req.body;
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const oldPhone = admin.businessInfo.phone;
    admin.businessInfo.phone = phone;
    await admin.save();
    res.json({ message: `Phone updated from ${oldPhone} to ${phone}`, phone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------
// Update areas of operation
// -----------------------------
router.put('/business-info/areas', async (req, res) => {
  try {
    const { areas } = req.body; // expect array of strings
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.businessInfo.areas = areas;
    await admin.save();
    
    res.json({ message: 'Areas updated', areas });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------------
// Update social links
// -----------------------------
router.put('/business-info/social', async (req, res) => {
  try {
    const { socialLinks } = req.body; // expect object with facebook, instagram, etc.
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.businessInfo.socialLinks = { ...admin.businessInfo.socialLinks, ...socialLinks };
    await admin.save();
    res.json({ message: 'Social links updated', socialLinks: admin.businessInfo.socialLinks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// -----------------------------
// Update description
// -----------------------------
router.put('/business-info/description', async (req, res) => {
  try {
    const { description } = req.body;
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.businessInfo.description = description;
    await admin.save();
    res.json({ message: 'Description updated', description });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;