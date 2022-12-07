const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { upload, multi_upload } = require("../middleware/multer.middleware");
const multipleUpload = require("../middleware/multiUpload");

router.get("/", ProductController.display);
router.post("/register", ProductController.register);
// router.post("/register", multipleUpload);

module.exports = router;
