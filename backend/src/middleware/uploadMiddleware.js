import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directory if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// File filter for documents
const documentFileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOC files are allowed"), false);
  }
};

// Multer instances
const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFileFilter,
});

const uploadResume = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFileFilter,
});

const uploadMultiple = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export { uploadImage, uploadResume, uploadMultiple };
