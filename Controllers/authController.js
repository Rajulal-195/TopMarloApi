import User from "../Models/UserModels.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const signup = async (req, res, next) => {
    const { username, email, password, photo } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashpassword, photo });
    try {
        await newUser.save();
        res.json({ message: "User Registerd Succesfully" })

    } catch (error) {
        res.status(500).json(error.message)

    }
}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User Not found!"));
        const validpassword = await bcrypt.compare(password, validUser.password);
        if (!validpassword) return next(errorHandler(401, "Invalid Credentials!"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token)
            .status(200)
            .json(rest)
    } catch (error) {

        next(error)

    }
};


export const google = async (req, res) => {
    try {
        const { username, email, photo } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                username,
                email,
                photo,
                password: Math.random().toString(36).slice(-8) // Generate a random password
            });

            await user.save();
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "7d" });

        // Send response
        const { password, ...userData } = user._doc;
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(userData);

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};