import User from "../models/user.models.js"


export const signin = async (req,res) => {
    try{ // good programming habit for error dai

        const {UserName, Email, Password} = req.body;
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // for email format verifi

        if(!emailRegex.test(Email)){
            return res.status(400).json({error: "Email is invalid."})
        }

        const existingUser = await User.findOne({UserName});
        if(existingUser){
            return res.status(400).json({error: "Username is already taken."})
        }

        const existingEmail = await User.findOne({UserName});
        if(existingEmail){
            return res.status(400).json({error: "Username is already taken."})
        }

        if(Password.length < 6){
            return res.status(400).json({error: "Password must at least 6 characters."})
        }

        // protecting passwordd or hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password,salt);
        



    }
    catch(error){

    }
}


export const signup = (req,res) => {
    try{ // good programming habit for error dai

    }
    catch(error){

    }
}

export const logout = (req,res) => {
    try{ // good programming habit for error dai

    }
    catch(error){

    }
}