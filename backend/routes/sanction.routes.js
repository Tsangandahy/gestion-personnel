const express = require("express");
const router = express.Router();
const {
  getSanction,
  setSanction,
  editSanction,
  deleteSanction,
} = require("../controllers/sanction.controller");
const Sanction = require("../models/sanction.model");

// ✅ CRUD de base
router.get("/", getSanction);
router.post("/", setSanction);
router.put("/:id", editSanction);
router.delete("/:id", deleteSanction);

// ✅ GET - sanctions d’un personnel sur une période donnée
// routes/sanction.routes.js
router.get("/personnel/:id/all", async (req, res) => {
  try {
    const { id } = req.params;
    const sanctions = await Sanction.find({ idpersonnel: id }).sort({ Date_emission: 1 });
    res.json(sanctions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
