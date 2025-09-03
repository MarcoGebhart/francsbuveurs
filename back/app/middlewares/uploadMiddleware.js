// back/middleware/uploadMiddleware.js

import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Module de système de fichiers

const uploadDir = 'uploads/';

// Vérifie si le dossier de destination existe
// S'il n'existe pas, il le crée
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Le chemin où Multer va sauvegarder les fichiers.
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    // Création d'un nom de fichier unique et sûr
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limite de 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées !'));
    }
  }
});

export default upload;