import Role from "../Models/role.model.js";
import User from "../Models/user.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
const db = mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Database connection successfull");

    const userRole = await Role.findOne({ name: "superAdmin" });

    if (!userRole) {
      let rolePayload = {
        name: "superAdmin"
      };
      const roleModel = new Role(rolePayload);
      await roleModel.save();

      const roleResult = await Role.findOne({ name: "superAdmin" });
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,10)
      let userPayload = {
        first_name: process.env.ADMIN_FIRST_NAME,
        last_name: process.env.ADMIN_LAST_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role_id: roleResult._id
      };

      const userSave = new User(userPayload);
      await userSave.save();
    }
  })
  .catch(err => {
    console.log("Database not connected", err);
  });
export default db;
