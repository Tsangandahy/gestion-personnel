const ArticleModel = require("../models/article.model");

// Ajouter un nouvel article
exports.createArticle = async (req, res) => {
  try {
    const { Article } = req.body; // Doit correspondre au nom du champ envoyé depuis le front
    if (!Article) return res.status(400).send("Le nom de l'article est requis");

    const newArticle = new ArticleModel({ Article });
    await newArticle.save();
    res.status(201).send("✅ Article ajouté avec succès !");
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
};

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
};
