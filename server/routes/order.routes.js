const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.get("/", OrderController.display);
router.post("/register", OrderController.register);

module.exports = router;
