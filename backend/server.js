const express = require("express");
const connectDB = require("../config/db"); // ⚠️ vérifie ton chemin
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

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

// Routes
// app.use("/post", require("./routes/post.routes"));
app.use("/api/absance", require("./routes/absance.route"));
app.use("/api/utilisateur", require("./routes/utilisateur.route"));
app.use("/api/contrats", require("./routes/contrat.routes"));
app.use("/api/sanctions", require("./routes/sanction.routes")); // ✅ route sanction

// Rendre le dossier uploads accessible publiquement
app.use("/uploads", express.static(uploadDir));

// Routes pour le personnel
app.use("/api/personnels", require("./routes/personnel.routes"));

// Lancement du serveur
app.listen(port, () => console.log("🚀 Serveur démarré sur le port " + port));
