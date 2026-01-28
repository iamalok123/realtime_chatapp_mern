import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (userId, res) => {
    // Generate a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set the JWT token as a cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
        httpOnly: true, // Prevent XSS attacks cross-site scripting attacks 
        sameSite: "strict", // Prevent CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" // Only send over HTTPS in production
    });
};  