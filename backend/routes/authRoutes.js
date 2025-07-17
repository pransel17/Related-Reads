import express from "express";
import { signup, signin, logout, getMe } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRouter.js";


const router = express.Router(); // initializing router
console.log("authroutes is working");


router.post("/sign-up", signup)
router.post("/sign-in", signin)
router.post("/log-out", logout)
router.get("/me", protectRoute, getMe);




export default router; // para maaccess lahat ng server lahat ng router api/auth/ + any router here
