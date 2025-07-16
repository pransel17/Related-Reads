// This token is like a digital ID card for the user. It contains the user’s ID and is signed using your secret (JWT_SECRET) so that nobody can fake it.

import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID,res) => {
    const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })

    res.cookie("jwt", token, { // this stores the token in a way sending it like a cookie.
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds, this set how long nakalogged in user until mag auto out.

    })

}

export default generateTokenAndSetCookie;

