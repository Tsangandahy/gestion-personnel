const StockSortie = require("../models/stockSortie.model");
const EtatStock = require("../models/etatStock.model");

exports.createSortie = async (req, res) => {
  try {
    const { idPersonnelReceveur, idPersonnelSortant, articles, date } = req.body;

    if (!idPersonnelReceveur || !idPersonnelSortant || !articles?.length || !date) {
      return res.status(400).json({ message: "Champs manquants !" });
    }

    for (let a of articles) {
      const { idArticle, q } = a;

      const etat = await EtatStock.findOne({ idArticle });
      if (!etat) return res.status(404).json({ message: "Article introuvable dans le stock." });
      if (etat.stock < q) return res.status(400).json({ message: `Stock insuffisant pour ${a.article}` });

      // Enregistrer sortie
      const sortie = new StockSortie({
        idPersonnelReceveur,
        idPersonnelSortant,
        idArticle,
        qte: q,
        date
      });
      await sortie.save();

      // Mettre à jour le stock
      etat.stock -= q;
      await etat.save();
    }

    return res.status(201).json({ message: "✅ Sortie enregistrée et stock mis à jour." });

  } catch (error) {
    console.error("Erreur création sortie :", error);
    res.status(500).json({ message: "Erreur serveur : " + error.message });
  }
};
