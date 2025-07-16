import express from "express";
import { signup, signin } from "../controllers/auth.controller.js"
const router = express.Router(); // initializing router

console.log("authroutes is working");




router.post("/sign-up", signup)

router.post("/sign-in", signin)

router.get("/log-out", (req,res) => {
    res.json({
        data: "You hit sign up endpoint"
    })
})




export default router; // para maaccess lahat ng server lahat ng router api/auth/ + any router here
