const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");

// ➕ Ajouter un article
router.post("/add", articleController.createArticle);

// 📜 Récupérer tous les articles
router.get("/", articleController.getAllArticles);

module.exports = router;
