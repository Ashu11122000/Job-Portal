let cloudinary = null;

try {
  const cloudinaryLib = await import("cloudinary");
  cloudinary = cloudinaryLib.default;
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.warn("Cloudinary not installed. Image upload functionality may be limited.");
}

export default cloudinary;
