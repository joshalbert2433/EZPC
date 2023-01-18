const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const isAuth = require("../utils/isAuth");
const isAdmin = require("../utils/isAdmin");

router.get("/", ProductController.display);
router.get("/getManyById", isAuth, ProductController.getManyById);
router.post("/register", isAuth, isAdmin, ProductController.register);
router.get("/:id", ProductController.getByID);
router.patch("/:id", isAuth, isAdmin, ProductController.updateProduct);
router.delete("/delete/:id", isAuth, isAdmin, ProductController.deleteProduct);

module.exports = router;
