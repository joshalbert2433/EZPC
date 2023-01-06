const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const isAuth = require("../utils/isAuth");

router.get("/", ProductController.display);
router.get("/getManyById", isAuth, ProductController.getManyById);
router.post("/register", isAuth, ProductController.register);
router.get("/:id", ProductController.getByID);
router.patch("/:id", isAuth, ProductController.updateProduct);
router.delete("/delete/:id", isAuth, ProductController.deleteProduct);

module.exports = router;
