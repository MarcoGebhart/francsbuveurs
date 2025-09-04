import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "events", // Dossier sur Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Formats acceptés
    transformation: [{ width: 1200, crop: "limit" }] // optionnel : redimensionner
  },
});

const upload = multer({ storage });

export default upload;
