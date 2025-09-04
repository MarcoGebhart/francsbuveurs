import { Router } from "express";
import * as eventController from "../Controllers/eventController.js";
import { isAdmin, isLogged } from "../middlewares/isLogged.js";
import upload from "../middlewares/uploadMiddleware.js";

export const router = Router();

router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getOneEvent);
router.get("/events/slug/:slug", eventController.getOneBySlug);
router.post("/events",isLogged, isAdmin,upload.single('image'), eventController.createdOneEvent);
router.patch("/events/:id",isLogged, isAdmin, eventController.updateOneEventById);
router.delete("/events/:id",isLogged, isAdmin, eventController.deleteOneEventById);
