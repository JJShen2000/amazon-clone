const express = require("express");
const router = express.Router();
const searchRouter = require("./search");
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/search", searchRouter);

router.get("/", function (req, res, next) {
  res.json({ message: "Hello from backend!" });
});
module.exports = router;
