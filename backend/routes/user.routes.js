import express from "express";
import { protectRoute } from "../middleware/protectRouter.js"; // for extra layerr of protect
import {MyProfile} from "../controllers/user.controller.js"


const router = express.Router();
console.log("user routes is working")



router.get("/MyProfile/:UserName", protectRoute, MyProfile)


export default router;