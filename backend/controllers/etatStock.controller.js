// backend/controllers/etatStock.controller.js

const StockAchat = require("../models/stockAchat.model");
const StockSortie = require("../models/stockSortie.model");
const StockRetour = require("../models/stockRetour.model");

/**
 * ➤ GET /api/etat-stock
 * Calcule l’état actuel du stock :
 * totalAchat - totalSortie + totalRetour
 */
exports.getEtatStock = async (req, res) => {
  try {
    // --- Agrégation des achats ---
    const achats = await StockAchat.aggregate([
      { $group: { _id: "$article", totalAchat: { $sum: "$qte" } } }
    ]);

    // --- Agrégation des sorties ---
    const sorties = await StockSortie.aggregate([
      { $group: { _id: "$article", totalSortie: { $sum: "$qte" } } }
    ]);

    // --- Agrégation des retours ---
    const retours = await StockRetour.aggregate([
      { $group: { _id: "$article", totalRetour: { $sum: "$qte" } } }
    ]);

    // --- Fusion des résultats dans une Map ---
    const map = new Map();

    // Ajouter les achats
    achats.forEach(a => {
      map.set(a._id, {
        article: a._id,
        totalAchat: a.totalAchat,
        totalSortie: 0,
        totalRetour: 0,
      });
    });

    // Ajouter les sorties
    sorties.forEach(s => {
      if (!map.has(s._id)) {
        map.set(s._id, {
          article: s._id,
          totalAchat: 0,
          totalSortie: 0,
          totalRetour: 0,
        });
      }
      map.get(s._id).totalSortie = s.totalSortie;
    });

    // Ajouter les retours
    retours.forEach(r => {
      if (!map.has(r._id)) {
        map.set(r._id, {
          article: r._id,
          totalAchat: 0,
          totalSortie: 0,
          totalRetour: 0,
        });
      }
      map.get(r._id).totalRetour = r.totalRetour;
    });

    // --- Calcul du stock restant ---
    const etatStock = Array.from(map.values()).map(item => ({
      article: item.article,
      totalAchat: item.totalAchat,
      totalSortie: item.totalSortie,
      totalRetour: item.totalRetour,
      stockActuel: item.totalAchat - item.totalSortie + item.totalRetour,
    }));

    // --- Tri optionnel par nom d’article ---
    etatStock.sort((a, b) => a.article.localeCompare(b.article));

    // --- Réponse au frontend ---
    res.status(200).json(etatStock);
  } catch (error) {
    console.error("❌ Erreur lors du calcul de l’état du stock :", error);
    res
      .status(500)
      .json({ message: "Erreur lors du calcul de l’état du stock", error });
  }
};
