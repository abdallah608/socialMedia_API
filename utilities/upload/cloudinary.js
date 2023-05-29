import * as dotenv from 'dotenv'
dotenv.config()
import  cloudinary  from 'cloudinary';


// Configuration 
cloudinary.v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
  secure:true
});

export default cloudinary.v2
