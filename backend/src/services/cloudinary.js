const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require('uuid');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const uuid = uuidv4();  // Generate a unique UUID
    const timestamp = Date.now();  // Get the current timestamp

    const publicId = `images/${uuid}_${timestamp}`;

    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      public_id: publicId
    });
    // file has been uploaded successfully
    console.log("File is uploaded on Cloudinary", response);
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file if the upload operation failed
    return null;
  }
};

async function deleteCloudinaryImage(img_url) {
  try {
    // Extract the public_id correctly from the image URL
    const publicId = img_url.split('/').slice(-2).join('/').split('.')[0]; // used for "/images/numbers" for public id reference
    
    // Destroy the image on Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Image with public_id ${publicId} deleted successfully.`);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
}

module.exports = { uploadOnCloudinary, deleteCloudinaryImage };
