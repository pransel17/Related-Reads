import express from "express";
import { protectRoute } from "../middleware/protectRouter.js";
import { createReview, updateReadingStatus } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/createReview/:bookId", protectRoute, createReview )
router.post("/updateReadingStatus", protectRoute, updateReadingStatus)
//router.post("/editReview/:bookId", protectRoute, editReview )
//router.post("/deleteReview/:bookId", protectRoute, deleteReview )




export default router;