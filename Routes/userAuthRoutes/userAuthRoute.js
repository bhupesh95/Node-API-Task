import express from "express";
import UserController from "../../Controllers/user.controller.js";
import jwtProcess from "../../Helper/helper.js";

const router = express.Router();

router.get("/allUsers", jwtProcess.authtoken, UserController.getAllUsers);
router.get("/userByRole", jwtProcess.authtoken, UserController.getUsersByRole);
router.get(
  "/role/count",
  jwtProcess.authtoken,
  UserController.getUserCountByRole
);

export { router as userAuthRoutes };