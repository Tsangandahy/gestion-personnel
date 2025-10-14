const mongoose = require("mongoose");

const sanctionSchema = new mongoose.Schema(
  {
    idpersonnel: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
    Date_emission: { type: Date, required: true },
    Type_sanction: { type: String, required: true },
    Motif: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sanction", sanctionSchema);
