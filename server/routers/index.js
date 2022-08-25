const express = require("express");
const router = express.Router();

const common = require("./common");
const seller = require("./seller");
const user = require("./user");

router.use("/", common);
router.use("/seller", seller);
router.use("/user", user);

module.exports = router;
