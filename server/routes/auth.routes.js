const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const checkForUniqueEmail = require("../utils/checkUniqueEmail");

router.post("/register", checkForUniqueEmail, AuthController.register);
router.post("/sign-in", AuthController.signIn);

// ! FOR TESTING
// router.get("/", AuthController.display);

module.exports = router;
