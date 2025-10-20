const mongoose = require("mongoose");

const fournisseurSchema = new mongoose.Schema({
  fournisseur: { type: String, required: true },
  NIF: { type: String, required: true },
  Stat: { type: String, required: true },
  Adresse: { type: String, required: true },
  Telephone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Fournisseur", fournisseurSchema);
