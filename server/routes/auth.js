const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/");

const { register, signin } = authController;

router.post("/register", register);
router.post("/signin", signin);

module.exports = router;
