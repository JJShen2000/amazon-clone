const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    res.status(201).send({ token });
  } catch (err) {
    res.status(400).send({ error: "Registration failed" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ error: "Invalid password" });
      }

      const token = generateToken(user);
      return res.status(200).send({ token });
    } else {
      // Only verify email if the request body doesn't contain password
      return res.status(200).send({ message: "Email verified" });
    }
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { register, signin };
