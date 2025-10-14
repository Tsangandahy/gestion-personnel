const express = require("express");
const {
  setutilisateur,
  getutilisateur,
  editutilisateur,
  deleteutilisateur,
  loginUtilisateur
} = require("../controllers/utilisateur.controller");

const router = express.Router();

router.get("/", getutilisateur);
router.post("/", setutilisateur);
router.put("/:id", editutilisateur);
router.delete("/:id", deleteutilisateur);
router.post("/login", loginUtilisateur);

module.exports = router;
