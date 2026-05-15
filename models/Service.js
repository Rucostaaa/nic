// models/Admin.js
import mongoose from'mongoose';
const serviceSchema = new mongoose.Schema({
  title:String,
  slug:String,
  icon:String,
  texts:{
    title:String,
    textCard:String,
    textGallery:[String]
  },
  status:{
    type:String,
    enum:['pending','active','deleted'],
    default :'pending'
  }
}, { timestamps: true });

const Service= mongoose.model('Service', serviceSchema);
export default Service