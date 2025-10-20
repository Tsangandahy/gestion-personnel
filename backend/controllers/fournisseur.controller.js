const Fournisseur = require('../models/fournisseur.model.js');

// Ajouter un fournisseur
exports.ajouterFournisseur = async (req, res) => {
  try {
    const newFournisseur = new Fournisseur(req.body);
    await newFournisseur.save();
    res.status(201).json(newFournisseur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout" });
  }
};

// Liste des fournisseurs
exports.listeFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération" });
  }
};

// Supprimer un fournisseur
exports.supprimerFournisseur = async (req, res) => {
  try {
    const id = req.params.id;
    const fournisseur = await Fournisseur.findByIdAndDelete(id);
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    res.json({ message: "Fournisseur supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
};

// Modifier un fournisseur
exports.modifierFournisseur = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const fournisseur = await Fournisseur.findByIdAndUpdate(id, updatedData, { new: true });
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });

    res.json(fournisseur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la modification" });
  }
};
