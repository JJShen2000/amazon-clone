const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/");

const { register, signin, signout } = authController;

router.post("/register", register);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports = router;
