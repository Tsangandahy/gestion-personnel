const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  mot_pass: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'utilisateur', 'manager'], // liste des rôles autorisés
    default: 'utilisateur' // rôle par défaut
  }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
