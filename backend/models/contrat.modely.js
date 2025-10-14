const mongoose = require("mongoose");

const contratSchema = new mongoose.Schema({
  idpersonnel: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
  Type_contrat: { type: String, required: true },
  Date_contrat: { type: Date, required: true },
  Debut_contrat: { type: Date, required: true },
  Fin_contrat: { type: Date, required: true },
  Fonction: { type: String, required: true },
  Lieu_affectation: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Contrat", contratSchema);
