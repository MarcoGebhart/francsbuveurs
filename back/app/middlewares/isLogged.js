// middleware/isLogged.js
import jwt from "jsonwebtoken";
import {AppUser} from "../models/associations.js"

// Middleware général
export async function isLogged(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Non connecté" });

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await AppUser.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    req.user = user;
    next();
  } catch (error){
    console.error("Erreur vérification token :", error);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}

// Middleware admin uniquement
export function isAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Réservé aux admins" });
  }
  next();
}
