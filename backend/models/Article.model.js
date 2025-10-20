const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  Article: { type: String, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
