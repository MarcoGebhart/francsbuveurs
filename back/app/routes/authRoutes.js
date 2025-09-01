import { Router } from "express";
import { isLogged } from "../middlewares/isLogged.js";

export const router = Router();

router.get("/auth/me", isLogged, (req, res) => {
  res.json(req.user);
});