const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String},
    user: { type: mongoose.Schema.Types.ObjectId}
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);