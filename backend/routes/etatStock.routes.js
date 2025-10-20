// backend/routes/etatStock.routes.js
const express = require("express");
const router = express.Router();
const StockAchat = require("../models/stockAchat.model"); // modèle achats
const StockSortie = require("../models/stockSortie.model"); // modèle sorties
const StockRetour = require("../models/stockRetour.model"); // modèle retours

router.get("/", async (req, res) => {
  try {
    // Récupération de tous les articles distincts
    const achats = await StockAchat.find();
    const sorties = await StockSortie.find();
    const retours = await StockRetour.find();

    const articles = new Set([
      ...achats.map(a => a.article),
      ...sorties.map(s => s.article),
      ...retours.map(r => r.article)
    ]);

    const result = [];
    articles.forEach(article => {
      const totalAchat = achats.filter(a => a.article === article).reduce((sum, a) => sum + a.qte, 0);
      const totalSortie = sorties.filter(s => s.article === article).reduce((sum, s) => sum + s.qte, 0);
      const totalRetour = retours.filter(r => r.article === article).reduce((sum, r) => sum + r.qte, 0);
      result.push({
        article,
        totalAchat,
        totalSortie,
        totalRetour
      });
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du calcul de l'état du stock" });
  }
});

module.exports = router;
