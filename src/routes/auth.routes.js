import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", authenticateJWT, registerUser);

export default router;
