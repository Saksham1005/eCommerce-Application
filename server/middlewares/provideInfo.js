const User = require("../models/user/user");
const Seller = require("../models/seller");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { errorResponse } = require("../middlewares/error_response");

require("dotenv").config();

module.exports.provideInfo = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      // console.log(decode);

      if (decode && decode.type.toLowerCase() === "user") {
        let user = await User.findOne({
          _id: decode.data._id,
          "tokens.token": token,
        }).lean();

        if (user) {
          req.data = decode;
          req.accessToken = token;
        }
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};
