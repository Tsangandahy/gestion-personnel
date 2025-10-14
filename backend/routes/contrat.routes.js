const express = require("express");
const router = express.Router();
const Contrat = require("../models/contrat.modely");

// ➕ Ajouter un contrat
router.post("/", async (req, res) => {
  try {
    console.log("📩 Body reçu :", req.body); // 👉 ajoute ça pour débugger
    const contrat = new Contrat(req.body);
    const savedContrat = await contrat.save();
    res.status(201).json(savedContrat);
  } catch (err) {
    console.error("❌ Erreur Mongoose :", err);
    res.status(400).json({ error: err.message });
  }
});


// 📋 Lister tous les contrats
// Exemple route GET contrat par ID
router.get("/:id", async (req, res) => {
  try {
    const contrat = await Contrat.findById(req.params.id).populate("idpersonnel");
    if (!contrat) return res.status(404).json({ message: "Contrat non trouvé" });
    res.json(contrat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✏️ Modifier un contrat
router.put("/:id", async (req, res) => {
    try {
        const updatedContrat = await Contrat.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedContrat) return res.status(404).json({ error: "Contrat non trouvé" });
        res.json(updatedContrat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ❌ Supprimer un contrat
router.delete("/:id", async (req, res) => {
    try {
        const deletedContrat = await Contrat.findByIdAndDelete(req.params.id);
        if (!deletedContrat) return res.status(404).json({ error: "Contrat non trouvé" });
        res.json({ message: "Contrat supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// recuperatiion de la liste de contrat effectuer 
router.get("/personnel/:id", async (req, res) => {
  try {
    const contrats = await Contrat.find({ idpersonnel: req.params.id });
    res.json(contrats);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});




module.exports = router;
