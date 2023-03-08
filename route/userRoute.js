import express from "express";
import { findAll, login, register } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// public routes
router.post("/", register);
router.post("/authenticate", login);
router.get("/", auth, findAll);

export default router;
