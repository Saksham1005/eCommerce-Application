const mongoose = require("mongoose");
const validator = require("validator");

const User_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Provided Value is not Email!");
      }
    },
  },

  password: {
    type: String,
    required: true,
  },

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],

  orders: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      qty: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
      },
      review: {
        type: String,
        default: "-",
      },
      orderDate: {
        type: Date,
        default: new Date(),
      },
    },
  ],

  lastUpdatedDTM: {
    type: Date,
    default: new Date(),
  },

  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

User_Schema.index(
  {
    name: 1,
    email: 1,
  },
  { unique: true }
);

const User = mongoose.model("User", User_Schema);
module.exports = User;
