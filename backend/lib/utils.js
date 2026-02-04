import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // Prevent XSS attacks
        sameSite: isProduction ? "none" : "lax", // "none" required for cross-domain in production
        secure: isProduction, // HTTPS only in production
    });
};  