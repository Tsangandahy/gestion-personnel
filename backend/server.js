const express = require("express");
const connectDB = require("../config/db");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Vérifier et créer le dossier uploads si nécessaire
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Servir le frontend (index.html + fichiers statiques)
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// Rendre le dossier uploads accessible publiquement
app.use("/uploads", express.static(uploadDir));

// Routes API
app.use("/api/absance", require("./routes/absance.route"));
app.use("/api/utilisateur", require("./routes/utilisateur.route"));
app.use("/api/contrats", require("./routes/contrat.routes"));
app.use("/api/sanctions", require("./routes/sanction.routes"));
app.use("/api/personnels", require("./routes/personnel.routes"));

// Route d'accueil : redirige vers index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


app.get("/", (req, res) => {
  res.send("Serveur Node.js déployé avec succès sur Render 🚀");
});

// Lancement du serveur
app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
