// models/Admin.js
import mongoose from'mongoose';
const imageSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  category_id:{
    type: mongoose.Types.ObjectId,
    ref:'Service'
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