import express from "express";
import { home } from "../controllers/home.controller.js";
import { protectRoute } from "../middleware/protectRouter.js";

const router = express.Router();

router.get("/", protectRoute, home)

export default router;