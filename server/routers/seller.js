const express = require("express");
const router = express.Router();

const { check_access_token } = require("../middlewares/check_access_token");

const {
  addProduct,
  getProducts,
  deleteOrOutOfStockProduct,
} = require("../controllers/seller");

router.post("/addProduct", check_access_token, addProduct);
router.post(
  "/deleteOrOutOfStockProduct",
  check_access_token,
  deleteOrOutOfStockProduct
);
router.get("/products", check_access_token, getProducts);

module.exports = router;
