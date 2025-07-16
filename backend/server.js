import express from "express";
import dotenv from "dotenv";
import authRoutes from "../backend/routes/authRoutes.js"
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
dotenv.config(); // load env file. to access priv fiiles
app.use(express.json()); // to read json dataa

//console.log(process.env.MONGO_URI); // checking if working
connectMongoDB(); // this will print the function at connectMongoosekineme

app.use("/api/auth", authRoutes); // router 


app.listen(2001, () => {
    console.log("port is running at port 2001")
})