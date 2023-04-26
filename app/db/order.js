const mongoose = require("mongoose");
const validator = require("validator");

const bazaarorder = new mongoose.Schema(
  {
    coustomerID: {
      type: mongoose.Schema.Types.ObjectID,

      ref: "user",
      require: true,
    },

    items: { type: Object, require: true },
    number: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    paymentType: { type: String, default: "cod" },
    status: {
      type: String,
      default: "ordered_Placed",
    },
  },
  { timestamps: true }
);
const orders = new mongoose.model("order", bazaarorder);
module.exports = orders;
