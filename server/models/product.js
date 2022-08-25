const mongoose = require("mongoose");
const validator = require("validator");

const Product_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  outOfStock: {
    type: Boolean,
    default: false,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },

  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },

  ratingDetails: {
    one: {
      type: Number,
      default: 0,
    },
    two: {
      type: Number,
      default: 0,
    },
    three: {
      type: Number,
      default: 0,
    },
    four: {
      type: Number,
      default: 0,
    },
    five: {
      type: Number,
      default: 0,
    },
  },

  lastUpdatedDTM: {
    type: Date,
    default: new Date(),
  },
});

Product_Schema.index({
  name: 1,
  price: 1,
});

const Product = mongoose.model("Product", Product_Schema);
module.exports = Product;
