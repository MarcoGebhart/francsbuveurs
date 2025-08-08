import {Router} from "express";
import { router as eventRouter } from "./event.js";
import { router as foodRouter } from "./food.js";
import { router as drinkRouter } from "./drink.js";
import { router as userRouter } from "./appUser.js";
import { router as authRouter } from "./authRoutes.js"

export const router = Router();

// router d'authentification
router.use(authRouter);

// router des évènement
router.use(eventRouter);

// router des foods
router.use(foodRouter);

// router des boissons;
router.use(drinkRouter);

// router des utilisateurs
router.use(userRouter);

