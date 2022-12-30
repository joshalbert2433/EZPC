const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

// router.get("/", CartController.display);
router.post("/register", CartController.register);
router.get("/:userId", CartController.getByUserId);

module.exports = router;
