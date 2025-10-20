const mongoose = require("mongoose");

const personnelSchema = new mongoose.Schema({
  Nom: { type: String, required: true },
  Prenom: { type: String, required: true },
  Role: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Personnel", personnelSchema);
