import express from "express"
import { signup, login, logout } from "../Controllers/authController.js";
const router = express.Router();

router.post("/register", signup);

router.get("/log-in", login)

router.get("/logout", logout)

export default router;