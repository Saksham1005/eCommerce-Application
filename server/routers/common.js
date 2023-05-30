const express = require("express");
const router = express.Router();
const { check_access_token } = require("../middlewares/check_access_token");
const { provideInfo } = require("../middlewares/provideInfo");

const {
  products,
  profile,
  updateProfile,
  login,
  signUp,
  logout,
} = require("../controllers/common");

router.get("/", provideInfo, products);
router.get("/profile", check_access_token, profile);

router.post("/login", login);
router.post("/logout", check_access_token, logout);
router.post("/signUp", signUp);
router.post("/updateProfile", check_access_token, updateProfile);

module.exports = router;
