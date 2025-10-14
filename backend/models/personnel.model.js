// models/personnel.model.js
const mongoose = require("mongoose");

const personnelSchema = new mongoose.Schema({
    Nom: { type: String, required: true },
    Prenom: { type: String, required: true },
    CIN: { type: String, required: true, unique: true },
    Date_naissence: { type: Date, default: Date.now },
    sexe: { type: String, required: true },
    Adresse: { type: String, required: true },
    Telephone: { type: String },   // tu l’avais dans la route, je l’ajoute
    Photo: { type: String }        // <-- chemin de l’image
}, { timestamps: true });

module.exports = mongoose.model("Personnel", personnelSchema);
