const mongoose = require("mongoose");
const validator = require("validator");

const User_Usage_Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },

  isSaved: { type: Boolean, default: false },

  lastUpdatedDTM: {
    type: Date,
    default: new Date(),
  },
});

User_Usage_Schema.index(
  {
    userId: 1,
    productId: 1,
  },
  {
    unique: true,
  }
);

const UserUsage = mongoose.model("UserUsage", User_Usage_Schema);
module.exports = UserUsage;
