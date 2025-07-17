// middleware function designed to protect private routes
// Only users with a valid JWT (i.e., who are logged in) can access these routes.
// meaning if currently signed in si user tchaka lang siya makakapass through here to other

import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

// DO NOT FORGET TO IMPORT COOKIE PARSER AT THE SERVER MAN!!!


// dadaan here lahat ng acc logged in if going to other routes too ensure security
console.log("protect router is workin ✅")

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unauthorized: No token provided."})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) // checks if the token was created by your server, hasn’t expired, and can still return the original data (like the userId) without being tampered with.
        if(!decoded){
            return res.status(401).json({error: "Unauthorized: Invalid token."})
        }

        const user = await User.findById(decoded.id).select("-Password")
        if(!user){
            return res.status(401).json({error: "User not found"})
        }

        req.user = user; // attaching the logged-in user's data to the req (request) object
        next(); // like a callback?

    } catch (error){
        console.log("Error in protectRoute middleware", error.message)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

