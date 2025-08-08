import { Router } from "express";
import { isLogged } from "../middlewares/isLogged.js";

export const router = Router();

router.get("/me", isLogged, (req, res) => {
  res.json(req.user);
});