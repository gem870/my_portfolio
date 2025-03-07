import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Store files in 'public/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

// Corrected file filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only images and videos are allowed")); // Reject file with an error
  }
};

// Upload middleware
export const upload = multer({ storage, fileFilter });
