import express from "express";
import UserController from "../../Controllers/user.controller.js";

const router = express.Router();

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);

export { router as userRoutes };
