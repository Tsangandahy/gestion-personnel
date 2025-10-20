const mongoose = require("mongoose");

const stockRetourSchema = new mongoose.Schema(
  {
    idPersonnelRetour: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
    article: { type: String, required: true },
    qte: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockRetour", stockRetourSchema);
