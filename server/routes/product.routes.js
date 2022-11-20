const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.get("/", ProductController.display);
router.post("/register", ProductController.register);

module.exports = router;
