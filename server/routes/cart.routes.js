const express = require("express");
const router = express.Router();
const UserDetailsController = require("../controllers/userDetails.controller");

router.get("/details", UserDetailsController.display);

module.exports = router;
