import { Router } from "express";
import {validate} from "../middlewares/validate.js";
import { eventSchema} from "../schemas/index.js";
import * as eventController from "../Controllers/eventController.js";
import { isAdmin, isLogged } from "../middlewares/isLogged.js";

export const router = Router();

router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getOneEvent);
router.get("/events/slug/:slug", eventController.getOneBySlug);
router.post("/events",isLogged, isAdmin, validate(eventSchema), eventController.createdOneEvent);
router.patch("/events/:id",isLogged, isAdmin, eventController.updateOneEventById);
router.delete("/events/:id",isLogged, isAdmin, eventController.deleteOneEventById);
