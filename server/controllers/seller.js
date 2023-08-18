const Product = require("../models/product");
const Seller = require("../models/seller");

require("dotenv").config();

const { ObjectId } = require("mongoose").Types;
const yup = require("yup");

// Using cloudinary to store images
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

// Middleware
const { errorResponse } = require("../middlewares/error_response");

// Helpers
const { schemaValidator } = require("../helpers/schemaValidator");

const {
  productMaxSalesCompare,
  productLatestCompare,
  productMaxRatingCompare,
} = require("../helpers/sort_product");

module.exports.addProduct = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      name: yup.string().required("Name is Required!"),
      price: yup.number().required("Price is Required!"),
      description: yup.string().required("Description is Required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    let productName = req.body.name;
    let productPrice = req.body.price;
    let productDescription = req.body.description;

    if (type.toLowerCase() !== "seller") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const image = req.file;

    // uploading the file to cloudinary
    const { url } = await cloudinary.uploader.upload(image.path, options);

    let lastUpdatedDTM = new Date();

    let product = await Product.create({
      name: productName,
      price: productPrice,
      img: url,
      description: productDescription,
      seller: ObjectId(data._id),
      lastUpdatedDTM,
    });

    let result = await Seller.updateOne(
      {
        _id: ObjectId(data._id),
      },
      {
        $push: {
          products: {
            product: product._id,
          },
        },
        $set: {
          lastUpdatedDTM,
        },
      }
    );

    return res.status(200).json({
      message: "Product Created!",
      data: product,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

// Either Delete the product or make it out of stock if some user already bought it.
module.exports.deleteOrOutOfStockProduct = async (req, res) => {
  try {
    // Check for required field
    const schema = yup.object({
      _id: yup.string().required("Product Id is required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    const data = req.data.data;
    let type = req.data.type;

    if (type.toLowerCase() !== "seller") {
      return errorResponse(res, "Not authorized to access this API", 400);
    }

    let _id = ObjectId(req.body._id);

    // Find the product which belongs to this seller.
    let product = await Product.findOne({ _id, seller: ObjectId(data._id) });

    if (!product) {
      return errorResponse(res, "Product Id is invalid for the seller!", 404);
    }

    // Find the seller of the product
    let seller = await Seller.findOne({ _id: product.seller });

    // If the product is not being bought by any user then just delete it.
    if (product.user.length === 0) {
      let result = await product.remove();

      seller.products = seller.products.filter((product) => {
        return _id.toString() != product.product.toString();
      });

      await seller.save();

      return res.status(200).json({
        message: "Deleted the Product!",
        data: _id.toString(),
        success: true,
      });
    } else {
      // Toggle out of Stock
      product.outOfStock = !product.outOfStock;

      await product.save();

      return res.status(200).json({
        message: "Product Marked Out of Stock!",
      });
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    // Initialization
    let data = req.data.data;
    let type = req.data.type;

    // Sort for Max Rating
    let sortMaxRatingProduct = req.query.sortMaxRatingProduct
      ? req.query.sortMaxRatingProduct
      : false;

    // Sort for Max Sales
    let sortProductsMaxSales = req.query.sortProductsMaxSales
      ? req.query.sortProductsMaxSales
      : false;

    // Pagination
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let page = req.query.page ? req.query.page : 1;

    if (page < 0) {
      page = 1;
    }

    let products;

    // Also check if user is logged in or not
    // Checking if seller or user is fetching the products
    if (type.toLowerCase() === "seller") {
      let seller_data = await Seller.findOne({
        _id: ObjectId(data._id),
      }).populate({
        path: "products",
        populate: {
          path: "product",
        },
      });

      // Sort products
      if (sortProductsMaxSales) {
        products = seller_data.products.sort(productMaxSalesCompare);
      } else if (sortMaxRatingProduct) {
        products = seller_data.products.sort(productMaxRatingCompare);
      } else {
        products = seller_data.products.sort(productLatestCompare);
      }
      products = products.slice(pageSize * (page - 1), pageSize - 1);

      return res.status(200).json({
        message: "Fetched the products!",
        count: products.length,
        data: products,
        success: true,
      });
    }

    return errorResponse(res, "Not Allowed to access this API!", 400);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};
