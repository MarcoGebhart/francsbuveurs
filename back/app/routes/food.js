import { Router } from "express";
import {validate} from "../middlewares/validate.js";
import * as foodController from "../Controllers/foodController.js";
import { foodSchema } from "../schemas/index.js";

export const router = Router();

router.get("/foods", foodController.getAllFoods);
router.get("/foods/:id", foodController.getOneFood);
router.post("/foods", validate(foodSchema), foodController.createOneFood);
router.patch("/foods/:id", foodController.updateOneFoodById);
router.delete("/foods/:id", foodController.deleteOneFoodById);