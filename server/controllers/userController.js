const { User } = require("../models");

const getUserInfo = async (req, res) => {
  const email = req.user.email;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .send({ error: "We cannot find an account with that email address." });
    }

    res.json({
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while retrieving user information." });
  }
};

module.exports = { getUserInfo };
