import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import * as drinkController from "../Controllers/drinkController.js";
import { drinkSchema } from "../schemas/index.js";
import { isAdmin, isLogged } from "../middlewares/isLogged.js";

export const router = Router();

router.get("/drinks", drinkController.getAllDrinks);
router.get("/drinks/:id", drinkController.getOneDrink);
router.post("/drinks",isLogged, isAdmin, validate(drinkSchema), drinkController.createOneDrink);
router.patch("/drinks/:id",isLogged, isAdmin, drinkController.updateOneDrinkById);
router.delete("/drinks/:id",isLogged, isAdmin, drinkController.deleteOneDrinkById);