import express from "express";
const app = express();
import mongoose from "mongoose";
import donenv from "dotenv";
import userRouter from "./Routers/userRouter.js"
import authRouter from "./Routers/authRouter.js"
app.use(express.json());
donenv.config();
const PORT = process.env.PORT || 1500;
import cors from "cors";
app.use(cors());

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

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