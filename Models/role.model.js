import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    unique:true,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
},{
  timestamps:true
});

const Role = mongoose.model("Role", RoleSchema);
export default Role;


