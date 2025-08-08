import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import * as appUserController from "../Controllers/appUserController.js"
import { appUserSchema } from "../schemas/index.js";
import { isLogged, isAdmin } from "../middlewares/isLogged.js";
import { loginLimiter } from "../middlewares/loginLimiter.js";

export const router = Router();

// authentification et déconnection
router.post("/login", loginLimiter, appUserController.loginAppUser);
router.post("/logout", isLogged, appUserController.logoutAppUser);

// routes de gestion des users
router.get("/users", isLogged, isAdmin, appUserController.getAllAppUsers);
router.get("/users/:id", isLogged, appUserController.getAppUserById);
router.post("/users", isLogged, isAdmin, validate(appUserSchema), appUserController.createAppUser);
router.patch("/users/:id", isLogged, isAdmin, appUserController.updateAppUser);
router.delete("/users/:id", isLogged,isAdmin, appUserController.deleteAppUser);