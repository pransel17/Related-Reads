import User from "../models/user.models.js"

export const MyProfile = async (req,res) =>{
    const {Username} = req.params

    try{
        const user = await User.findOne({Username}).select("-Password")
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