const express = require("express");
const router = express.Router();
const Contrat = require("../models/contrat.modely"); // modèle Contrat

// POST - ajout d’un contrat
router.post("/", async (req, res) => {
  try {
    const newContrat = new Contrat({
      idpersonnel: req.body.idpersonnel,
      Type_contrat: req.body.Type_contrat,
      Date_contrat: req.body.Date_contrat,
      Debut_contrat: req.body.Debut_contrat,
      Fin_contrat: req.body.Fin_contrat,
      Fonction: req.body.Fonction,
      Lieu_affectation: req.body.Lieu_affectation,
    });

    const savedContrat = await newContrat.save();
    res.status(201).json(savedContrat); // renvoyer le contrat ajouté
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - récupérer tous les contrats
router.get("/", async (req, res) => {
  try {
    const contrats = await Contrat.find().populate("idpersonnel"); // si tu veux les infos du personnel lié
    res.json(contrats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
