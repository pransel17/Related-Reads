import express from "express";

const router = express.Router(); // initializing router

console.log("authroutes is working");




router.get("/sign-in", (req,res) => {
    res.json({
        data: "You hit sign in endpoint"
    })
})

router.get("/sign-up", (req,res) => {
    res.json({
        data: "You hit sign up endpoint"
    })
})

router.get("/log-out", (req,res) => {
    res.json({
        data: "You hit sign up endpoint"
    })
})




export default router; // para maaccess lahat ng server lahat ng router api/auth/ + any router here
