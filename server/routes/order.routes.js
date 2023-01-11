const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const isAuth = require("../utils/isAuth");
const isAdmin = require("../utils/isAdmin");

router.get("/", isAuth, OrderController.display);
router.get("/:userId", isAuth, OrderController.getByUserId);
router.get("/show/:orderId", isAuth, OrderController.getOrderByProductId);
router.post("/register", isAuth, OrderController.register);
router.patch("/:id", OrderController.update);

module.exports = router;
