import {Router} from "express";
import { router as eventRouter } from "./event.js";
import { router as foodRouter } from "./food.js";
import { router as drinkRouter } from "./drink.js"

export const router = Router();

// router des évènement
router.use(eventRouter);

// router des foods
router.use(foodRouter);

// router des boissons;
router.use(drinkRouter);

