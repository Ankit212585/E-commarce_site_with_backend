const mongoose = require("mongoose");

// Schema Structure

const OrderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  amount: {
    type: Number,
    require: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
