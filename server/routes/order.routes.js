const express = require("express");
const router = express.Router();
const UserDetailsController = require("../controllers/userDetails.controller");

router.get("/", UserDetailsController.display);

module.exports = router;
