import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
// Sign up
export const userSignUp = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: hashPassword,
      role: role,
    });
    await newUser.save();
    res
      .status(200)
      .json({ newUser, message: "User has been created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User cannot be registered." });
  }
};

// Sign In
export const userSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(403).json({
        message:
          "Incorrect Username or Password. Please enter correct details again.",
      });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(403).json({
        message:
          "Incorrect Username or Password. Please enter correct details again.",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      }
    );
    res.status(200).json({ user, message: "Signed in successfully.", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// user information
export const userInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
