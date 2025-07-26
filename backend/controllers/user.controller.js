import User from "../models/user.models.js"
import bcrypt from "bcryptjs"

export const MyProfile = async (req,res) =>{
    const {UserName} = req.params

    try{
        const user = await User.findOne({UserName}).select("-Password")
        if(!user){
            return res.status(400).json({error: "User does not exist"})
        }
        // if mahanap
        res.status(200).json(user)

    } catch(error){
        res.status(500).json({error:error.message})
        console.log("Error in MyProfile function")

    }

}

export const EditProfile = async (req,res) =>{
    const {CurrentPassword, NewPassword, NewProfileImage, NewGender, NewCityAndCountry, bio,} = req.body;

    const userID = req.user._id;

    try{
        let user = await User.findById(userID)
        if(!user){
            return res.status(400).json({error: "User not found"})
        }

        //checking password fields

        if((!NewPassword && CurrentPassword) || (!CurrentPassword && NewPassword)) {
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }

        if (NewPassword && CurrentPassword){
            const isMatch = await bcrypt.compare(CurrentPassword, user.Password)
            if(!isMatch) return res.status(400).json({ error: "Current password is incorrect"})
            if(NewPassword.length < 6){
                return res.status(400).json({error: "Password must be at least 6 characters long"})
            }

            // all goods

            const salt = await bcrypt.genSalt(10);
            user.Password = await bcrypt.hash(NewPassword, salt)
        }


        user.bio = bio || user.bio



        user = await user.save(); // u know mgdb saverr
        return res.status(200).json(user);


        



    } catch (error){
        res.status(500).json({error:error.message})
        console.log("Error in MyProfile function")

    }
}