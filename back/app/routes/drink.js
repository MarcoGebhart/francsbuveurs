import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import * as drinkController from "../Controllers/drinkController.js";
import { drinkSchema } from "../schemas/index.js";

export const router = Router();

router.get("/drinks", drinkController.getAllDrinks);
router.get("/drinks/:id", drinkController.getOneDrink);
router.post("/drinks", validate(drinkSchema), drinkController.createOneDrink);
router.patch("/drinks/:id", drinkController.updateOneDrinkById);
router.delete("/drinks/:id", drinkController.deleteOneDrinkById);