import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(409).json({ status: "fail", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      res.status(404).json({ status: "fail", message: "user not found" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      res.status(400).json({ status: "fail", message: "invalid credentials" });
    } else {
      req.session.user = user;
      const { _id } = user;
      res.status(200).json({ status: "success", data: { username, _id } });
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
