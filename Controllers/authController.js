import User from "../Models/UserModels.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    const { username, email, password, photo } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
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
        const validpassword = bcryptjs.compareSync(password, validUser.password);
        if (!validpassword) return next(errorHandler(401, "Invalid Credentials!"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {

        next(error)

    }
}
export const logout = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne(email);
        if (!validUser) return next(errorHandler(404, "User Not Found!"));
        const validpassword = bcryptjs.compareSync(password, validUser.password);

    } catch (error) {

    }
}