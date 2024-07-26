const mongoose = require("mongoose");

// Schema Structure

const CartSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Cart", CartSchema);
