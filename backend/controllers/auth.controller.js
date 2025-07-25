import User from "../models/user.models.js"
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../lib/utils/generateTokenAndSetCookie.js"



console.log("auth.controller is working ")
export const signup = async (req,res) => {
    try { // good programming habit for error dai

        const {UserName, Email, Password} = req.body;
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // for email format verifi


        if(!emailRegex.test(Email)){
            return res.status(400).json({error: "Email is invalid."})
        }

        const existingUser = await User.findOne({UserName});
        if(existingUser){
            return res.status(400).json({error: "Username is already taken."})
        }

        const existingEmail = await User.findOne({Email});
        if(existingEmail){
            return res.status(400).json({error: "Email is already taken."})
        }

        if(Password.length < 6){
            return res.status(400).json({error: "Password must at least 6 characters."})
        }
        

        // IF ALL GOODS PROCEED HERE

        // protecting passwordd or hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password,salt);

        const newUser = new User({   // just creating an instance doesn't actually save anything in MONGODB(!!!) but it is already existing in js. so need to save later
            UserName,
            Email,
            Password: hashedPassword
        })

        // if all is good.
        if(newUser){
            try{
                generateTokenAndSetCookie(newUser._id,res); // passing the values to the function. // Mongoose (not MongoDB) generates the _id immediately when you call:
                // So the _id is already available before you even save the document to the database.
                await newUser.save();

                res.status(200).json({
                    _id: newUser._id,
                    UserName: newUser.UserName,
                    Email: newUser.Email,
                    Password: newUser.Password
                })

                

            } catch (error){
                return res.status(500).json({error: "There's a problem in sign-up function"})
            }
        }
        

        
        return res.status(201).json({ message: "User created successfully!" });


    }
    catch(error){
        console.error("Signin Error:", error); //  shows the real issue in terminal
        return res.status(500).json({error: "There's a problem in sign-up function"})

    }
}



// account already existing
export const signin = async (req,res) => {
    try{ // good programming habit for error dai
        const {UserName, Password} = req.body;
        const user = await User.findOne({UserName}) // checking if existing sa db
        const isPasswordCorrect = await bcrypt.compare(Password, user.Password || "")
        if(!isPasswordCorrect || !user){
            return res.status(400).json({error: "Invalid Username or Password"})
        }

        generateTokenAndSetCookie(user._id,res); // since everything is okay, cookie for the user yiie

        res.status(200).json({
            _id: user._id,
            UserName: user.UserName,
            Email: user.Email,
            Password: user.Password
        })

    }
    catch(error){
        console.log("Error in signin controller", error.message)
        res.status(500).json({error: "Invalid user data"})

    }
}


export const logout = async (req,res) => {
    try{ 
        res.cookie("jwt", "", {maxAge:0}) // terminate cookie
        res.status(200).json({message: "Logged out successfully"})

    }
    catch(error){
        console.log("Error in logout controller", error.message)
        res.status(500).json({error: "Invalid user data"})
    }
}



// authentication 
export const getMe = async (req,res) => {
    try{ 
        const user = await User.findById(req.user._id).select("-Password");
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error in getMe Controller", error.message);
        res.status(500).json({error: "Internal  Server Error"})
    }
}