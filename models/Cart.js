const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  mangaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manga",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
  },
  {
    collection: "carts",
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeoutMS: 30000,
    },
    read: "nearest",
  }
);

const Model = mongoose.model("Cart", CartSchema);

module.exports = Model;
