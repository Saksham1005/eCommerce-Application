const express = require("express");
const router = express.Router();
const multer = require("multer");

// Set up multer storage
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "images",
});

const upload = multer({ storage });

const { check_access_token } = require("../middlewares/check_access_token");

const {
  addProduct,
  getProducts,
  deleteOrOutOfStockProduct,
} = require("../controllers/seller");

router.post(
  "/addProduct",
  check_access_token,
  upload.single("image"),
  addProduct
);
router.post(
  "/deleteOrOutOfStockProduct",
  check_access_token,
  deleteOrOutOfStockProduct
);
router.get("/products", check_access_token, getProducts);

module.exports = router;
