import express from "express";
const app = express();
import mongoose from "mongoose";
import donenv from "dotenv";
import userRouter from "./Routers/userRouter.js"
import authRouter from "./Routers/authRouter.js"
import bodyParser from "body-parser";
app.use(express.json());
donenv.config();
const PORT = process.env.PORT || 1500;
import cors from "cors";
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.post("/", async (req, res, next) => {
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
})

// Middleware 


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error.";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT} `)
})