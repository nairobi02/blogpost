import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
