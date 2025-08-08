import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import * as appUserController from "../Controllers/appUserController.js"
import { appUserSchema } from "../schemas/index.js";
import { isLogged } from "../middlewares/isLogged.js";

export const router = Router();

// authentification et déconnection
router.post("/login", appUserController.loginAppUser);
router.post("/logout", isLogged, appUserController.logoutAppUser);

// routes de gestion des users
router.get("/users", isLogged, appUserController.getAllAppUsers);
router.get("/users/:id", isLogged, appUserController.getAppUserById);
router.post("/users", isLogged, validate(appUserSchema), appUserController.createAppUser);
router.patch("/users/:id", isLogged, appUserController.updateAppUser);
router.delete("/users/:id", isLogged, appUserController.deleteAppUser);