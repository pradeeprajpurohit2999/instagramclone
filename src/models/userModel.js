import mongoose from "mongoose";

// Crating user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// check if user model is already created or not
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
