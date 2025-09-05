import { AppUser } from "../models/associations.js";
import { appUserSchema, updateAppUserSchema } from "../schemas/index.js";
import { idSchema, loginSchema } from "../schemas/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// 🟢 CREATE appUser
export async function createAppUser(req, res) {
  try {
    const data = appUserSchema.parse(req.body);

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;

    const newUser = await AppUser.create(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password,...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Erreur création appUser:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Données invalides", details: error.errors });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// 🔵 GET all appUsers (sans mot de passe)
export async function getAllAppUsers(req, res) {
  try {
    const users = await AppUser.findAll({
      attributes: { exclude: ["password"] }
    });
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération appUsers:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// 🔵 GET one appUser by ID
export async function getAppUserById(req, res) {
  try {
    const { id } = idSchema.parse(req.params);
    const user = await AppUser.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    console.error("Erreur récupération appUser:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "ID invalide", details: error.errors });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// 🟠 UPDATE appUser
export async function updateAppUser(req, res) {
  try {
    const { id } = idSchema.parse(req.params);
    const data = updateAppUserSchema.parse(req.body);

    const user = await AppUser.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Si le mot de passe est modifié → hash
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    await user.update(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Erreur mise à jour appUser:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Données invalides", details: error.errors });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// 🔴 DELETE appUser
export async function deleteAppUser(req, res) {
  try {
    const { id } = idSchema.parse(req.params);
    const user = await AppUser.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erreur suppression appUser:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "ID invalide", details: error.errors });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// 🔑 LOGIN appUser
export async function loginAppUser(req, res) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await AppUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET manquant dans le .env");
      }
      
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password,...userWithoutPassword } = user.toJSON();
    res.cookie("token", token, {
        httpOnly: true,       // inaccessible au JS
        secure: true, //process.env.NODE_ENV === "production",         // seulement en HTTPS (mettre false si test en local sans https)
        sameSite: "lax", //process.env.NODE_ENV === "production" ? "none" : "lax",   // empêche CSRF
        maxAge: 2 * 60 * 60 * 1000 // 2h
      });
    res.json({ message: "Connexion réussi", user: userWithoutPassword });
  } catch (error) {
    console.error("Erreur login appUser:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Données invalides",
        details: error.errors
      });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function logoutAppUser(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // secure en prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
  
      res.json({ message: "Déconnexion réussie" });
    } catch (error) {
      console.error("Erreur lors du logout :", error);
      res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
    }
  }
