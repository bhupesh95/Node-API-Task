import userService from "../Services/user.service.js";
import {
  singUpSchema,
  loginSchema
} from "../ValidateSchema/guestSchemaValidation.js";
import ApiResponse from "../Helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

const {
  signUp,
  login,
  getAllUsers,
  getUsersByRole,
  getUserCountByRole
} = userService;
const UserController = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    const { error } = Joi.validate({ email, password }, loginSchema);
    if (error !== null) {
      return res.json(
        new ApiResponse(
          null,
          error.details[0].message,
          StatusCodes.NOT_ACCEPTABLE
        )
      );
    }
    login(req, res, next);
  },

  signUp: (req, res, next) => {
    const { first_name, last_name, email, password, roleName } = req.body;
    const { error } = Joi.validate(
      { first_name, last_name, email, password, roleName },
      singUpSchema
    );
    if (error !== null) {
      return res.json(
        new ApiResponse(
          null,
          error.details[0].message,
          StatusCodes.NOT_ACCEPTABLE
        )
      );
    }
    signUp(req, res, next);
  },

  getAllUsers: (req, res, next) => {
    getAllUsers(req, res, next);
  },

  getUsersByRole: (req, res, next) => {
    getUsersByRole(req, res, next);
  },
  getUserCountByRole: (req, res, next) => {
    getUserCountByRole(req, res, next);
  }
};

export default UserController;
