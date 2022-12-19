const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const isEmailUnique = require("../middleware/auth.middleware");

router.post("/register", AuthController.register);
router.post("/sign-in", AuthController.signIn);
router.get("/", AuthController.display);

module.exports = router;
