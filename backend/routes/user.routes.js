import express from "express";
import { protectRoute } from "../middleware/protectRouter.js"; // for extra layerr of protect
import {MyProfile, EditProfile, ProfileInfo} from "../controllers/user.controller.js"


const router = express.Router();
console.log("user routes is working")


router.get("/ProfileInfo/me", protectRoute, ProfileInfo)
router.get("/MyProfile/:UserName", protectRoute, MyProfile)
router.post("/EditProfile", protectRoute, EditProfile)


export default router;