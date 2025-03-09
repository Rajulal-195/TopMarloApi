import express from "express"
import { signup, login, google } from "../Controllers/authController.js";
const router = express.Router();

router.post("/register", signup);

router.post("/login", login)

router.post("/google/auth",google)


export default router;