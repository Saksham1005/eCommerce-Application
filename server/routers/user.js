const express = require("express");
const router = express.Router();

const { check_access_token } = require("../middlewares/check_access_token");

const {
  addRemoveProductFromCart,
  buyProduct,
  getOrders,
  getCart,
  getSaved,
  rate,
  toggleSave,
} = require("../controllers/user");

router.post("/product/cart", check_access_token, addRemoveProductFromCart);
// Add notifications
router.post("/product/buy", check_access_token, buyProduct);
router.post("/product/rate", check_access_token, rate);
router.post("/product/save", check_access_token, toggleSave);

router.get("/orders", check_access_token, getOrders);
router.get("/cart", check_access_token, getCart);
router.get("/savedProducts", check_access_token, getSaved);

module.exports = router;
