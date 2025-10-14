const express = require("express");
const router = express.Router();
const multer = require("multer");
const Personnel = require("../models/personnel.model");

// configuration du stockage des photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier où stocker
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST - ajout d’un personnel
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const newPersonnel = new Personnel({
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      CIN: req.body.CIN,
      Date_naissence: req.body.Date_naissance,
      sexe: req.body.sexe,
      Adresse: req.body.Adresse,
      Telephone: req.body.Telephone,
      Photo: req.file ? req.file.path : null   // chemin de la photo
    });

    await newPersonnel.save();
    res.status(201).json({ message: "Personnel ajouté !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
