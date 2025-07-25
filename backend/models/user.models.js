// defines how a User looks in the database, mongodb with monggose for authentication

import mongoose from "mongoose";

//  blueprint for MongoDB documents is schema  oratyt
const userSchema = new mongoose.Schema({


    UserName: {
        type: String,
        required: true,
        unique: true
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    },


    Password: {
        type: String,
        required: true,
        minLength: 6
    },

    ProfileImage:{
        type: String,
        default: "",
    },

    FavGenres:{
        type: String,
        default: "",
    },

    bio:{
        type: String,
        default: "",
    },

    Gender:{
        type: String,
        default: "",
    },

    CityAndCountry:{
        type: String,
        default: "",
    }

})

const User = mongoose.model("User", userSchema);
export default User;

