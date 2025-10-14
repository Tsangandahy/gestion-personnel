const express = require("express");
const router = express.Router();
const { getabsance, setabsance, editabsance, deleteabsance } = require("../controllers/absance.controller");
const Absance = require("../models/absance.model");

// ✅ CRUD de base
router.get("/", getabsance);
router.post("/", setabsance);
router.put("/:id", editabsance);
router.delete("/:id", deleteabsance);

// ✅ GET - absences d’un personnel entre deux dates
router.get("/personnel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: "⚠️ Veuillez fournir une période valide" });
    }

    const absences = await Absance.find({
      idpersonnel: id,
      Date_depart: { $gte: new Date(start) },
      Date_prise_service: { $lte: new Date(end) }
    }).sort({ Date_depart: 1 });

    res.json(absences);
  } catch (err) {
    console.error("Erreur récupération absences:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET absences pour une date spécifique
router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const Absance = require("../models/absance.model");
    const Personnel = require("../models/personnel.model"); // ton modèle personnel

    const searchDate = new Date(date);

    // Rechercher les absences où la date sélectionnée est entre Date_depart et Date_prise_service
    const absences = await Absance.find({
      Date_depart: { $lte: searchDate },
      Date_prise_service: { $gte: searchDate }
    }).populate("idpersonnel", "Nom Prenom");

    // Transformer la réponse pour le frontend
    const result = absences.map(a => ({
      Nom: a.idpersonnel?.Nom || "—",
      Prenom: a.idpersonnel?.Prenom || "—",
      DateDebut: a.Date_depart?.toISOString().split("T")[0] || "",
      DatePriseService: a.Date_prise_service?.toISOString().split("T")[0] || "",
      TotalJours: a.nombre_jour || 0,
      Type: a.type_absance || "—",
      Motif: a.motif_absance || "—",
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Erreur récupération absences par date :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des absents" });
  }
});



module.exports = router;
