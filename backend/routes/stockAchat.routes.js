// backend/routes/stockAchat.routes.js
const express = require("express");
const router = express.Router();
const StockAchat = require("../models/stockAchat.model");

// ➤ Ajouter un achat
router.post("/", async (req, res) => {
  try {
    const { idPersonnel, fournisseur, article, qte, pu, date } = req.body;

    if (!idPersonnel || !fournisseur || !article || !qte || !pu || !date) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const stock = new StockAchat({ idPersonnel, fournisseur, article, qte, pu, date });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    console.error("Erreur ajout achat:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'achat" });
  }
});

// ➤ Liste de tous les achats
router.get("/", async (req, res) => {
  try {
    const stocks = await StockAchat.find().populate("idPersonnel", "Nom Prenom");
    res.json(stocks);
  } catch (error) {
    console.error("Erreur liste achats:", error);
    res.status(500).json({ message: "Erreur lors du chargement des achats" });
  }
});

module.exports = router;
