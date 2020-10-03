const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    user: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentsSchema);
