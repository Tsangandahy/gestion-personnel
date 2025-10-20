const express = require("express");
const router = express.Router();
const {
  ajouterFournisseur,
  listeFournisseurs,
  supprimerFournisseur,
  modifierFournisseur
} = require("../controllers/fournisseur.controller");

// ➕ Ajouter un fournisseur
router.post("/", ajouterFournisseur);

// 📋 Liste des fournisseurs
router.get("/", listeFournisseurs);

// 🗑️ Supprimer un fournisseur
router.delete("/:id", supprimerFournisseur);

// ✏️ Modifier un fournisseur
router.put("/:id", modifierFournisseur);

module.exports = router;
