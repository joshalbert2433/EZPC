const express = require("express");
const router = express.Router();
const UserInfoController = require("../controllers/userInfo.controller");

router.get("/", UserInfoController.display);
router.post("/register", UserInfoController.register);

module.exports = router;
