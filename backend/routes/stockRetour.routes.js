// backend/routes/stockRetour.routes.js
const express = require("express");
const router = express.Router();
const StockRetour = require("../models/stockRetour.model");

// Ajouter un retour
router.post("/", async (req, res) => {
  try {
    const retour = new StockRetour(req.body);
    await retour.save();
    res.status(201).json(retour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'enregistrement du retour" });
  }
});

module.exports = router;
