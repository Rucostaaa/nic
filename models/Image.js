// models/Admin.js
import mongoose from'mongoose';
const imageSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["office","comercial","kitchen","oven", "window", "outdoor", "residential"],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  featured: {
    type: String,
    enum: ["gallery","header","featured"],
    default:"gallery",
    required: true
  },

}, { timestamps: true });

const Image= mongoose.model('Image', imageSchema);
export default Image