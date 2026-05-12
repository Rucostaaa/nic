// models/Admin.js
import mongoose from 'mongoose';
import { type } from 'node:os';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  password: {
    type: String,
    required: true
  },
  businessInfo: {
    logo: { type: String, default: '/logo.png' },        // URL or base64
    email: { type: String, default: 'info@niccleaning.com' },
    phone: { type: String, default: '+1 (123) 456-7890' },
    address: { type: String, default: '123 Main Street, City, Country' },
    areas: { type: [String], default: ['OxfordShire', 'Banbury', 'Northampton'] },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      whatsapp: { type: String, default: '' }
    },
    description: { type: String, default: '' } // Optional short business description
  }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;