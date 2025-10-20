const mongoose = require("mongoose");

const etatStockSchema = new mongoose.Schema({
  idArticle: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("EtatStock", etatStockSchema);
