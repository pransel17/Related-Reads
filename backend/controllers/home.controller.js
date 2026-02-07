import User from "../models/user.models.js";  

export const home = async (req, res) => {
    try {
        console.log("hello controller");
        
        // You MUST send a response, or the browser will wait forever
        res.status(200).json({ message: "Success" }); 

    } catch (error) {
        console.error("Error in home controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};