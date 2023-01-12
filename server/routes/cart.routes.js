const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const isAuth = require("../utils/isAuth");

// router.get("/", CartController.display);
router.post(
	"/register",
	// isAuth,
	CartController.register
);
router.get("/:userId", isAuth, CartController.getByUserId);

module.exports = router;
