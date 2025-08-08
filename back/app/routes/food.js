import { Router } from "express";
import {validate} from "../middlewares/validate.js";
import * as foodController from "../Controllers/foodController.js";
import { foodSchema } from "../schemas/index.js";
import { isLogged } from "../middlewares/isLogged.js";

export const router = Router();

router.get("/foods", foodController.getAllFoods);
router.get("/foods/:id", foodController.getOneFood);
router.post("/foods",isLogged, validate(foodSchema), foodController.createOneFood);
router.patch("/foods/:id",isLogged, foodController.updateOneFoodById);
router.delete("/foods/:id",isLogged, foodController.deleteOneFoodById);