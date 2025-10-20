const express = require("express");
const router = express.Router();
const stockSortieController = require("../controllers/stockSortie.controller");

// Ajouter une sortie
router.post("/add", stockSortieController.createSortie);

module.exports = router;
