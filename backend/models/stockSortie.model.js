const mongoose = require("mongoose");

const stockSortieSchema = new mongoose.Schema({
  idPersonnelReceveur: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
  idPersonnelSortant: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
  idArticle: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  qte: { type: Number, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("StockSortie", stockSortieSchema);
