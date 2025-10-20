const mongoose = require("mongoose");

const stockAchatSchema = new mongoose.Schema(
  {
    idPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
    date: { type: Date, required: true, default: Date.now },
    fournisseur: { type: String, required: true, trim: true },
    article: { type: String, required: true, trim: true },
    qte: { type: Number, required: true, min: 1 },
    pu: { type: Number, required: true, min: 0 },
    montant: { type: Number, min: 0 },
    sortie: { type: Number, default: 0, min: 0 },
    retour: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Calcul automatique du montant avant sauvegarde
stockAchatSchema.pre("save", function (next) {
  this.montant = this.qte * this.pu;
  next();
});

module.exports = mongoose.model("StockAchat", stockAchatSchema);
