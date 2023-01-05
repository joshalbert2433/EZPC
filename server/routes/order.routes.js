const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.get("/", OrderController.display);
router.get("/:userId", OrderController.getByUserId);
router.get("/show/:orderId", OrderController.getOrderByProductId);
router.post("/register", OrderController.register);

module.exports = router;
