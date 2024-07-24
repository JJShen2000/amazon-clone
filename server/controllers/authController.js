const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt");

const isValidUsername = (username) => {
  return 1 <= username.length && username.length <= 50;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return 1 <= email.length && email.length <= 50 && emailRegex.test(email);
};

const isValidPassword = (password) => {
  return 1 <= password.length && password.length <= 50;
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ error: "Username, email and password are required" });
  }

  if (!isValidUsername(username)) {
    return res
      .status(400)
      .send({ error: "Username must be between 1 and 50 characters long!" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).send({
      error:
        "Email must be a valid email address and between 1 and 50 characters long",
    });
  }

  if (!isValidPassword(password)) {
    return res
      .status(400)
      .send({ error: "Password must be between 1 and 50 characters long!" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ error: "Email already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // TBC: email verification

    res
      .status(201)
      .send({ message: "Registration successful! Redirecting to sigin in..." });
  } catch (err) {
    res
      .status(400)
      .send({ error: "Registration failed due to an unknown error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (!password) {
      // Only verify email if the request body doesn't contain password
      return res.status(200).send({ message: "Email verified" });
    }

    // sign in with email and password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = generateToken(user);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).send({
      message: "Signin successful",
      userData: { username: user.username },
    });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { register, signin };
