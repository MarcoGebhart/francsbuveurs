// middleware/isLogged.js
import jwt from "jsonwebtoken";

export function isLogged(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Accès refusé : token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si on veut restreindre aux admins uniquement
    if (decoded.role && decoded.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé : droits insuffisants" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur vérification token :", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expirée, veuillez vous reconnecter" });
    }
    return res.status(403).json({ message: "Token invalide" });
  }
}
