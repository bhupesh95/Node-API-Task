import jwt from "jsonwebtoken";
import ApiResponse from "./apiResponse.js";
import { StatusCodes } from "http-status-codes";

const jwtProcess = {
  authtoken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(
          new ApiResponse(token, "Access Denied", StatusCodes.FORBIDDEN, false)
        );
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      req.body.email = user.email;
      req.body.role_id = user.role_id;
      next();
    } catch (err) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ApiResponse(
            token,
            "Invalid token",
            StatusCodes.UNAUTHORIZED,
            false
          )
        );
    }
  },

  generateToken: payload => {
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  }
};

export default jwtProcess;
