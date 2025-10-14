const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Personnel = require("../models/personnel.model");

// --- Configuration du stockage des photos ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads"); // chemin vers backend/uploads
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// --- POST - ajout d’un personnel ---
router.post("/", upload.single("Photo"), async (req, res) => {
  try {
    const newPersonnel = new Personnel({
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      CIN: req.body.CIN,
      Date_naissence: req.body.Date_naissence,
      sexe: req.body.sexe,
      Adresse: req.body.Adresse,
      Photo: req.file ? req.file.path : null
    });

    await newPersonnel.save();
    res.status(201).json({ message: "Personnel ajouté !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- GET tous les personnels ---
router.get("/", async (req, res) => {
  try {
    const personnels = await Personnel.find();
    res.status(200).json(personnels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET un personnel par ID ---
router.get("/:id", async (req, res) => {
  try {
    const personnel = await Personnel.findById(req.params.id);
    if (!personnel) {
      return res.status(404).json({ message: "Personnel introuvable" });
    }
    res.json(personnel);
  } catch (err) {
    console.error("Erreur GET /api/personnels/:id :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- DELETE un personnel ---
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPersonnel = await Personnel.findByIdAndDelete(id);
    if (!deletedPersonnel) {
      return res.status(404).json({ message: "Personnel non trouvé" });
    }
    res.json({ message: "Supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// --- PUT - modifier un personnel ---
router.put("/:id", upload.single("Photo"), async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      CIN: req.body.CIN,
      Date_naissence: req.body.Date_naissence,
      sexe: req.body.sexe,
      Adresse: req.body.Adresse,
    };

    if (req.file) {
      updateData.Photo = req.file.path;
    }

    const personnel = await Personnel.findByIdAndUpdate(id, updateData, { new: true });
    if (!personnel) return res.status(404).json({ message: "Personnel non trouvé" });

    res.json({ message: "Personnel mis à jour avec succès", personnel });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
