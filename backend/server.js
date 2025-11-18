// backend/server.js
const express = require("express");
const connectDB = require("../config/db");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// ➤ Connexion MongoDB
connectDB();

// ➤ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ➤ Création dossier uploads si inexistant
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ➤ Dossier frontend
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// ➤ Rendre dossier uploads public
app.use("/uploads", express.static(uploadDir));

// ➤ Importation des routes
const absanceRoutes = require("./routes/absance.route");
const utilisateurRoutes = require("./routes/utilisateur.route");
const contratRoutes = require("./routes/contrat.routes");
const sanctionRoutes = require("./routes/sanction.routes");
const personnelRoutes = require("./routes/personnel.routes");

// ➤ Utilisation des routes
app.use("/api/absance", absanceRoutes);
app.use("/api/utilisateur", utilisateurRoutes);
app.use("/api/contrats", contratRoutes);
app.use("/api/sanctions", sanctionRoutes);
app.use("/api/personnels", personnelRoutes);

// ➤ Page d’accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


// ➤ Lancement du serveur
app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
