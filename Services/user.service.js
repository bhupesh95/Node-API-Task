import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import Role from "../Models/role.model.js";
import jwtProcess from "../Helper/helper.js";
import ApiResponse from "../Helper/apiResponse.js";
const { authToken, generateToken } = jwtProcess;

const userService = {
  signUp: async (req, res) => {
    try {
      const userExist = await User.find({
        email: req.body.email.toLowerCase
      });

      if (!userExist.length) {
        return res
          .status(200)
          .json({ message: "user already exists with this email!" });
      }

      let creatingRole;
      const role = await Role.findOne({ name: req.body.roleName });

      if (!role) {
        creatingRole = await Role.create({
          name: req.body.roleName
        });
      } else creatingRole = role;

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        role_id: creatingRole._id,
        password: hashPassword
      });

      res
        .status(StatusCodes.CREATED)
        .json(
          new ApiResponse(
            user,
            "User registered successfully.",
            StatusCodes.CREATED,
            true
          )
        );
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            error.message,
            "Something went wrong.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            false
          )
        );
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await User.findOne({
      email: email
    });
    if (!userInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(
          new ApiResponse(null, "User not found.", StatusCodes.NOT_FOUND, false)
        );
    }
    const userPassverify = await bcrypt.compare(password, userInfo.password);
    if (!userPassverify) {
     return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ApiResponse(
            null,
            "Invalid password.",
            StatusCodes.UNAUTHORIZED,
            false
          )
        );
    }

    try {
      const payload = {
        email: userInfo.password,
        password: userInfo.password,
        role_id: userInfo.role_id
      };

      const token = generateToken(payload);

      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            token,
            "You are logged in successfully!!!",
            StatusCodes.OK,
            true
          )
        );
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            error.message,
            "Something went wrong.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            false
          )
        );
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find({});
      if (!allUsers) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(
            new ApiResponse(
              null,
              "No data found.",
              StatusCodes.NOT_FOUND,
              false
            )
          );
      } else
        res
          .status(StatusCodes.OK)
          .json(
            new ApiResponse(allUsers, "List of all users", StatusCodes.OK, true)
          );
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            error.message,
            "Something went wrong.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            false
          )
        );
    }
  },

  getUsersByRole: async (req, res) => {
    try {
      const { role } = req.query;
      const roleId = await Role.findOne({
        name: role
      });
      if (roleId) {
        const allUserByRole = await User.find({
          role_id: roleId._id
        });
        res
          .status(StatusCodes.OK)
          .json(
            new ApiResponse(
              allUserByRole,
              `All users of ${role}`,
              StatusCodes.OK,
              true
            )
          );
      } else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(
            new ApiResponse(
              null,
              "No data found.",
              StatusCodes.NOT_FOUND,
              false
            )
          );
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            error.message,
            "Something went wrong.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            false
          )
        );
    }
  },

  getUserCountByRole: async (req, res, next) => {
    try {
      let count = {};
      const roles = await Role.find({});
      for await (const element of roles) {
        const users = await User.find({ role_id: element._id });
        const roleName = element.name;
        count[roleName] = users.length;
      }
      if (count) {
        res
          .status(StatusCodes.OK)
          .json(
            new ApiResponse(
              count,
              "Count of all users by role.",
              StatusCodes.OK,
              true
            )
          );
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            error.message,
            "Something went wrong.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            false
          )
        );
    }
  }
};

export default userService;
