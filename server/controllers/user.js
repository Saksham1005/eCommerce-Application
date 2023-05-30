const Product = require("../models/product");
const Seller = require("../models/seller");

const User = require("../models/user/user");
const UserUsage = require("../models/user/userUsage");

const { ObjectId } = require("mongoose").Types;
const yup = require("yup");

const { schemaValidator } = require("../helpers/schemaValidator");

// Middlewares
const { errorResponse } = require("../middlewares/error_response");

// GET requets
module.exports.getOrders = async (req, res) => {
  try {
    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    // Pagination
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let page = req.query.page ? req.query.page : 1;

    if (page < 0) {
      page = 1;
    }

    let user = await User.findOne({ _id: data._id })
      .populate({
        path: "orders",
        populate: {
          path: "product",
        },
      })
      .lean();

    let orders = user.orders.slice(pageSize * (page - 1), pageSize - 1);

    return res.status(200).json({
      message: "Fetched Orders list!",
      data: orders,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.getCart = async (req, res) => {
  try {
    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    // Pagination
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let page = req.query.page ? req.query.page : 1;

    if (page < 0) {
      page = 1;
    }

    let user = await User.findOne({ _id: data._id })
      .populate({
        path: "cart",
        populate: {
          path: "product",
        },
      })
      .lean();

    let cart = user.cart.slice(pageSize * (page - 1), pageSize - 1);

    return res.status(200).json({
      message: "Fetched Orders list!",
      data: cart,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.getSaved = async (req, res) => {
  try {
    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    // Pagination
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let page = req.query.page ? req.query.page : 1;

    if (page < 0) {
      page = 1;
    }

    let userUsage_docs = await UserUsage.find({
      userId: data._id,
      isSaved: true,
    })
      .populate({
        path: "productId",
      })
      .sort({ lastUpdatedDTM: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .lean();

    let saved_products = [];

    for (let userUsage_doc of userUsage_docs) {
      saved_products.push(userUsage_doc["productId"]);
    }

    return res.status(200).json({
      message: "Fetched Save Product list!",
      data: saved_products,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

// POST requests
module.exports.addRemoveProductFromCart = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      productId: yup.string().required("Product Id is Required!"),
      qty: yup.string().required("Quantity is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    let productId = req.body.productId;
    let qty = req.body.qty;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    let user = await User.findOne({ _id: data._id });

    let cart = user.cart;

    let removedProduct = false;

    cart.map(async (product, index) => {
      if (product.product.toString() === productId) {
        cart.splice(index, 1);
        removedProduct = true;

        await user.save();
      }
    });

    // Solving the problem of "Cannot set headers after they are sent to the client"
    if (removedProduct === true) {
      return res.status(200).json({
        message: "Removed Product from Cart!",
        data: productId,
        removed: true,
        success: true,
      });
    }

    // Checking if the product is out of stock
    let product = await Product.findById(productId).lean();

    if (product.outOfStock === true) {
      return errorResponse(res, "Product is Out of Stock!", 400);
    }

    cart.unshift({
      product: ObjectId(productId),
      qty,
    });

    await user.save();

    return res.status(200).json({
      message: "Added Product in Cart!",
      data: productId,
      removed: false,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.buyProduct = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      productId: yup.string().required("Product Id is Required!"),
      qty: yup.string().required("Quantity is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    let productId = req.body.productId;
    let qty = req.body.qty;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    // Finding the product and storing its price in a variable
    let product = await Product.findOne({
      _id: ObjectId(productId),
    }).lean();

    // Checking if the product is Out of Stock
    if (product.outOfStock === true) {
      return errorResponse(res, "Product is Out of Stock!", 400);
    }

    let productPrice = product.price;

    let user = await User.findOne({ _id: data._id });

    let orders = user.orders;

    orders.unshift({
      product: productId,
      qty,
    });

    await user.save();

    //   Increase the amount of qty, total_amount in seller's account for that product
    let seller = await Seller.findOne({
      _id: product.seller,
    });

    for (let product of seller.products) {
      if (product.product.toString() === productId) {
        product.sold.qty += qty;
        product.sold.total_amount += productPrice;
      }
    }

    await seller.save();

    return res.status(200).json({
      message: "Product added to your orders list!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.rate = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      productId: yup.string().required("Product Id is Required!"),
      rating: yup.string().required("Rating is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    let productId = req.body.productId;
    let rating = req.body.rating;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    let user = await User.findOne({ _id: ObjectId(data._id) });

    // First fetching previous rating
    let previousRating;

    user.orders.map(async (product) => {
      if (product.product.toString() === productId) {
        previousRating = product.rating;
        product.rating = rating;
      }
    });

    let product = await Product.findOne({
      _id: ObjectId(productId),
    });

    // If rating of the user is now being changed then we remove previous rating
    if (previousRating !== 0) {
      switch (previousRating) {
        case 5:
          product.ratingDetails.five -= 1;
          break;
        case 4:
          product.ratingDetails.four -= 1;
          break;
        case 3:
          product.ratingDetails.three -= 1;
          break;
        case 2:
          product.ratingDetails.two -= 1;
          break;
        case 1:
          product.ratingDetails.one -= 1;
          break;

        default:
          return errorResponse(res, "Rating should be between 1 and 5", 400);
      }
    }

    // Now the new Rating given in the request will be added.
    switch (rating) {
      case 5:
        product.ratingDetails.five += 1;
        break;
      case 4:
        product.ratingDetails.four += 1;
        break;
      case 3:
        product.ratingDetails.three += 1;
        break;
      case 2:
        product.ratingDetails.two += 1;
        break;
      case 1:
        product.ratingDetails.one += 1;
        break;

      default:
        return errorResponse(res, "Rating should be between 1 and 5", 400);
    }

    let rating_detail = product.ratingDetails;

    let total_rating =
      rating_detail.five * 5 +
      rating_detail.four * 4 +
      rating_detail.three * 3 +
      rating_detail.two * 2 +
      rating_detail.one * 1;

    let total_raters =
      rating_detail.five +
      rating_detail.four +
      rating_detail.three +
      rating_detail.two +
      rating_detail.one;

    product.rating = total_rating / total_raters;

    // Resolving both promises
    await Promise.all([user.save(), product.save()]);

    return res.status(200).json({
      message: "Your Rating has been Saved!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.toggleSave = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      productId: yup.string().required("Product Id is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    let userId = data._id;
    let productId = req.body.productId;

    if (type.toLowerCase() !== "user") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    let userUsage_doc = await UserUsage.findOne({
      userId,
      productId,
    });

    if (!userUsage_doc) {
      userUsage_doc = await UserUsage.create({
        userId,
        productId,
      });
    } else {
      userUsage_doc.lastUpdatedDTM = new Date();
    }

    if (userUsage_doc["isSaved"] === true) {
      userUsage_doc["isSaved"] = false;
      await userUsage_doc.save();

      return res.status(200).json({
        message: "UnSaved the given product!",
        success: true,
      });
    } else {
      userUsage_doc["isSaved"] = true;
      await userUsage_doc.save();

      return res.status(200).json({
        message: "Saved the given product!",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};
