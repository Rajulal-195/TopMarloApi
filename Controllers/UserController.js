import User from "../Models/UserModels.js";

export const signup = async (req, res) => {
    const { username, email, password, photo } = req.body;
    const newUser = new User({ username, email, password, photo });
    const hash = password.hashsys
    await newUser.save();
    res.json({ message: "User Registerd Succesfully" })
}
export const login = async (req, res) => {
    console.log("data ftch from users modesls")
    res.json({ message: "User data get  Succesfully" })
}