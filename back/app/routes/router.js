import {Router} from "express";
import { router as eventRouter} from "./event.js"

export const router = Router();

// router evenments
router.use(eventRouter)

