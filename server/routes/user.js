const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddleware");

const { getUserInfo } = userController;
router.get("/me", authMiddleware, getUserInfo);

module.exports = router;
