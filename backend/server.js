import express from "express";
import dotenv from "dotenv";
import authRoutes from "../backend/routes/authRoutes.js"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "../backend/routes/user.routes.js"
import reviewRoutes from "../backend/routes/review.routes.js" 
import bookRoutes from "./routes/books.routes.js"
import { v2 as cloudinary } from 'cloudinary'; // import for cloudinary

const app = express();
app.use(cookieParser()); // parses cookies sent by the browser (or Postman) and makes them readable inside your backend
dotenv.config(); // load env file. to access priv fiiles
app.use(express.json()); // to read json dataa
app.use(express.urlencoded({ extended: true })); // VERYVERY IMPORTANT FOR DEBUGGING If you send this form in Postman using x-www-form-urlencoded


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}) 


//console.log(process.env.MONGO_URI); // checking if working
connectMongoDB(); // this will print the function at connectMongoosekineme

app.use("/api/auth", authRoutes); // router 
app.use("/api/user", userRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/books", bookRoutes);



app.listen(2001, () => {
    console.log("port is running at port 2001")
})