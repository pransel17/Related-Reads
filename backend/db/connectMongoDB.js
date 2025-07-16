// to connect mongodb using moonggose connect nose.js app to mongo db

import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connect ${connect.connection.host}`);
    }
    catch (error){
        console.log("Error in mongodb connection")

    }
}

export default connectMongoDB; // call this at server to connect then this function prnt the connection notice boooom
