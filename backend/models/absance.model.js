const mongoose = require("mongoose");

const absanceSchema = new mongoose.Schema({
  idpersonnel: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
  Date_depot: { type: Date, required: true },
  Date_depart: { type: Date, required: true },
  Date_prise_service: { type: Date, required: true },
  nombre_jour: { type: Number, required: true },
  type_absance: { type: String, required: true },
  motif_absance: { type: String, required: true },
});

module.exports = mongoose.model("Absance", absanceSchema);
