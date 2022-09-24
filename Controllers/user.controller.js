import userService from "../Services/user.service.js";

const {
  signUp,
  login,
  getAllUsers,
  getUsersByRole,
  getUserCountByRole
} = userService;
const UserController = {
  login: (req, res, next) => {
    login(req, res, next);
  },

  signUp: (req, res, next) => {
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


