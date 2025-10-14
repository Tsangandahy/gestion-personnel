const Utilisateur = require("../models/utilisateur.model");
const bcrypt = require("bcryptjs");

// 🔹 GET - Liste des utilisateurs
const getutilisateur = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 POST - Créer un utilisateur (inscription)
const setutilisateur = async (req, res) => {
  try {
    const { nom, mail, mot_pass, role } = req.body;

    if (!nom || !mail || !mot_pass) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifie si l'email existe déjà
    const existe = await Utilisateur.findOne({ mail });
    if (existe) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(mot_pass, 10);

    // 🔸 Crée le nouvel utilisateur avec rôle (ou valeur par défaut du modèle)
    const newUser = await Utilisateur.create({
      nom,
      mail,
      mot_pass: hashedPassword,
      role: role || "utilisateur" // Définit un rôle par défaut si non fourni
    });

    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 PUT - Modifier un utilisateur
const editutilisateur = async (req, res) => {
  try {
    const { mot_pass, ...autresChamps } = req.body;
    let champsMisAJour = { ...autresChamps };

    // Si on modifie le mot de passe → le hacher
    if (mot_pass) {
      champsMisAJour.mot_pass = await bcrypt.hash(mot_pass, 10);
    }

    const updated = await Utilisateur.findByIdAndUpdate(req.params.id, champsMisAJour, { new: true });
    res.json({ message: "Utilisateur mis à jour", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 DELETE - Supprimer un utilisateur
const deleteutilisateur = async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 LOGIN - Connexion
const loginUtilisateur = async (req, res) => {
  try {
    const { mail, mot_pass } = req.body;

    if (!mail || !mot_pass) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const utilisateur = await Utilisateur.findOne({ mail });
    if (!utilisateur) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await bcrypt.compare(mot_pass, utilisateur.mot_pass);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    res.json({
      message: "Connexion réussie",
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        mail: utilisateur.mail,
        role: utilisateur.role // 🔸 retourne aussi le rôle
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getutilisateur,
  setutilisateur,
  editutilisateur,
  deleteutilisateur,
  loginUtilisateur
};
