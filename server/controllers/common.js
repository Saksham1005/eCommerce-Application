const Product = require("../models/product");
const Seller = require("../models/seller");
const User = require("../models/user/user");
const UserUsage = require("../models/user/userUsage");

const { ObjectId } = require("mongoose").Types;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const yup = require("yup");

require("dotenv").config();

// Middlewares
const { errorResponse } = require("../middlewares/error_response");

// Helpers
const { schemaValidator } = require("../helpers/schemaValidator");

let saltRounds = 10;

module.exports.login = async (req, res) => {
  // After logging in send the access token in response.
  try {
    // Check all the required fields
    let schema = yup.object({
      email: yup.string().required("Email is Required!"),
      password: yup.string().required("Password is Required!"),
      type: yup.string().required("Type is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    let email = req.body.email;
    let password = req.body.password;

    let type = req.body.type;

    let result;
    let resultModel;

    // Check if type is user or seller
    if (type.toLowerCase() === "user") {
      resultModel = User;

      result = await User.findOne({
        email,
      }).lean();

      if (!result) {
        return errorResponse(
          res,
          "No account with given credentials exists!",
          400
        );
      }

      let match = await bcrypt.compare(password, result.password);

      if (!match) {
        return errorResponse(res, "Invalid Email-Id/Password!", 400);
      }

      // Delete cart, order details for User
      delete result.orders;
      delete result.cart;
    } else {
      resultModel = Seller;

      result = await Seller.findOne({
        email,
      }).lean();

      if (!result) {
        return errorResponse(
          res,
          "No account with given credentials exists!",
          400
        );
      }

      let match = await bcrypt.compare(password, result.password);

      if (!match) {
        return errorResponse(res, "Invalid Email-Id/Password!", 400);
      }

      // Delete products details for Product
      delete result.products;
    }

    // Delete Password
    delete result.password;
    delete result.tokens;

    // Make jwt token and send it in response
    let data = {
      data: result,
      type,
    };

    let accessToken = jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: "1800000",
    });

    let queryResult = await resultModel.updateOne(
      {
        email,
      },
      {
        $push: {
          tokens: {
            token: accessToken,
          },
        },
      }
    );

    return res.status(200).json({
      message: "Logged In!",
      data: {
        ...result,
        type,
      },
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.signUp = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      name: yup.string().required("Name is Required!"),
      email: yup.string().required("Email is Required!"),
      password: yup.string().required("Password is Required!"),
      type: yup.string().required("Type is Required!"),
      confirm_password: yup
        .string()
        .required("Confirm Password field is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if (password !== confirm_password) {
      return errorResponse(res, "Passwords do not match!", 400);
    }

    // Encrypting the password.
    let hashed_password = await bcrypt.hash(password, saltRounds);

    // Register as Seller or User

    let type = req.body.type;
    type = type.toLowerCase();

    if (type === "user") {
      let user = await User.findOne({
        name,
        email,
      }).lean();

      if (user) {
        return errorResponse(res, "User already exists!", 400);
      }

      await User.create({
        name,
        email,
        password: hashed_password,
      });

      return res.status(200).json({
        message: "Your User Account has been Created!",
        success: true,
      });
    }

    // Else seller account will be created.
    let seller = await Seller.findOne({
      name,
      email,
    }).lean();

    if (seller) {
      return errorResponse(res, "Seller already exists!", 400);
    }

    await Seller.create({
      name,
      email,
      password: hashed_password,
    });

    return res.status(200).json({
      message: "Your Seller Account has been Created!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

// Get Products for Users and Sellers
module.exports.products = async (req, res) => {
  try {
    //Initialization
    let data = req.data ? req.data.data : null;
    let type = req.data ? req.data.type : "";

    // Sort for Max Rating
    let sortMaxRatingProduct = req.query.sortMaxRatingProduct
      ? req.query.sortMaxRatingProduct
      : false;

    // Pagination
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let page = req.query.page ? req.query.page : 1;

    if (page < 0) {
      page = 1;
    }

    let products;

    // Initializing the userSort
    let userSort;

    if (sortMaxRatingProduct === true) userSort = { rating: -1 };
    else userSort = { lastUpdatedDTM: -1 };

    products = await Product.find({})
      .sort(userSort)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .lean();

    for (let product of products) {
      // If user is logged in

      if (type.toLowerCase() === "user") {
        let userUsage = await UserUsage.findOne({
          userId: data._id,
          productId: product._id,
        }).lean();

        if (userUsage) {
          product["isSaved"] = userUsage["isSaved"];
        } else {
          product["isSaved"] = false;
        }
      }
    }

    return res.status(200).json({
      message: "Fetched the products!",
      count: products.length,
      data: products,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.profile = async (req, res) => {
  try {
    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    delete data.password;

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    // Initialization
    let data = req.data.data;
    let type = req.data.type;

    let name = req.body.name;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if (password && confirm_password !== password) {
      return errorResponse(res, "Password does not match!", 400);
    }

    // UpdateOne query result
    let result;

    if (type.toLowerCase() === "seller") {
      result = await Seller.findOne({
        _id: ObjectId(data._id),
      });
    } else {
      result = await User.findOne({
        _id: ObjectId(data._id),
      });
    }

    // Updating the name and password and lastUpdatedDTM
    result.name = name;
    result.lastUpdatedDTM = new Date();

    if (password) {
      let hashed_password = await bcrypt.hash(password, saltRounds);
      result.password = hashed_password;
    }

    // Update jwt token and send it in response
    data = {
      data: {
        ...data,
        ...(name && { name }),
      },
      type,
    };

    let accessToken = jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Removing the previous token and adding a new one.
    result.tokens = result.tokens.filter(
      (token) => token.token !== req.accessToken
    );

    result.tokens.push({
      token: accessToken,
    });

    await result.save();

    // Deleting sensitive information from result
    result = JSON.parse(JSON.stringify(result));

    delete result.cart;
    delete result.orders;

    delete result.products;

    delete result.tokens;
    delete result.password;

    return res.status(200).json({
      message: "Updated Credentials!",
      data: {
        ...result,
        type,
      },
      accessToken,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    let data = req.data.data;
    let type = req.data.type;

    let resultModel;
    if (type.toLowerCase() === "user") {
      resultModel = User;
    } else {
      resultModel = Seller;
    }

    let queryResult = await resultModel.updateOne(
      {
        _id: ObjectId(data._id),
      },
      {
        $pull: {
          tokens: {
            token: req.accessToken,
          },
        },
      }
    );

    return res.status(200).json({
      message: "Logged Out!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};
