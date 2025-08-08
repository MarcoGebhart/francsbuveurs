import {Router} from "express";
import { router as eventRouter } from "./event.js"
import { router as foodRouter } from "./food.js"

export const router = Router();

// router events
router.use(eventRouter);

// router foods
router.use(foodRouter)

