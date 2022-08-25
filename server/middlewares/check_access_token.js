const User = require("../models/user/user");
const Seller = require("../models/seller");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { errorResponse } = require("../middlewares/error_response");

require("dotenv").config();

module.exports.check_access_token = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.data = decode;
    req.accessToken = token;

    if (!decode) {
      return errorResponse(res, "Auth Failed!", 400);
    }

    if (decode.type.toLowerCase() === "user") {
      let user = await User.findOne({
        _id: decode.data._id,
        "tokens.token": token,
      }).lean();

      if (!user) {
        return errorResponse(res, "Auth Failed!", 400);
      }

      req.data.userId = user._id;
    } else {
      let seller = await Seller.findOne({
        _id: decode.data._id,
        "tokens.token": token,
      }).lean();

      if (!seller) {
        return errorResponse(res, "Auth Failed!", 400);
      }

      req.data.sellerId = seller._id;
    }

    next();
  } catch (error) {
    // console.error(error);
    return errorResponse(res, "Auth Failed!", 400);
  }
};
