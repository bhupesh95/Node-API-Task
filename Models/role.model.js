import mongoose from "mongoose";

const RoleSchema = {
  name: {
    type: String,
    unique:true,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default:Date.now()
  },
  updated_at: {
    type: Date,
    default:Date.now()
  }
};

const Role = mongoose.model("Role", RoleSchema);
export default Role;


