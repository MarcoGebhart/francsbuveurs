import { Router } from "express";
import upload from "../middlewares/uploadMiddleware.js";
import multer from "multer";

export const router = Router();

router.post('/upload', (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
  
      if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
      }
      res.status(200).json({
        message: 'Image téléchargée avec succès !',
        filePath: `/uploads/${req.file.filename}`
      });
    });
  });