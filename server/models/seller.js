const mongoose = require("mongoose");
const validator = require("validator");

const Seller_Schema = new mongoose.Schema({
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

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      sold: {
        qty: {
          type: Number,
          default: 0,
        },

        total_amount: {
          type: Number,
          default: 0,
        },
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

Seller_Schema.index(
  {
    name: 1,
    email: 1,
  },
  { unique: true }
);

const Seller = mongoose.model("Seller", Seller_Schema);
module.exports = Seller;
