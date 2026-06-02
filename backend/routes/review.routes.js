import express from "express";
import { protectRoute } from "../middleware/protectRouter.js";
import { createReview, updateReadingStatus } from "../controllers/review.controller.js";
import { getBookReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/createReview/:bookId", protectRoute, createReview )
router.post("/updateReadingStatus", protectRoute, updateReadingStatus)
router.get("/:bookId", protectRoute, getBookReviews);
//router.post("/editReview/:bookId", protectRoute, editReview )
//router.post("/deleteReview/:bookId", protectRoute, deleteReview )




export default router;