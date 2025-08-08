import { Router } from "express";
import {validate} from "../middlewares/validate.js";
import { eventSchema} from "../schemas/index.js";
import * as eventController from "../Controllers/eventController.js";
import { isLogged } from "../middlewares/isLogged.js";

export const router = Router();

router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getOneEvent);
router.get("/events/slug/:slug", eventController.getOneBySlug);
router.post("/events",isLogged, validate(eventSchema), eventController.createdOneEvent);
router.patch("/events/:id",isLogged, eventController.updateOneEventById);
router.delete("/events/:id",isLogged, eventController.deleteOneEventById);
