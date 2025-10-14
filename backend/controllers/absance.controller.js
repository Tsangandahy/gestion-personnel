const absancetModel = require("../models/absance.model");

// ✅ GET toutes les absences
module.exports.getabsance = async (req, res) => {
  try {
    const absances = await absancetModel.find();
    res.status(200).json(absances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ POST nouvelle absence
module.exports.setabsance = async (req, res) => {
  const { idpersonnel, Date_depot, Date_depart, Date_prise_service, nombre_jour, motif_absance, type_absance } = req.body;

  if (!idpersonnel || !Date_depot || !Date_depart || !Date_prise_service || !nombre_jour || !motif_absance || !type_absance) {
    return res.status(400).json({ message: "⚠️ Données incomplètes" });
  }

  try {
    const absance = await absancetModel.create({
      idpersonnel,
      Date_depot,
      Date_depart,
      Date_prise_service,
      nombre_jour,
      type_absance,
      motif_absance
    });
    res.status(201).json(absance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ PUT modifier une absence
module.exports.editabsance = async (req, res) => {
  try {
    const updatedAbsance = await absancetModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedAbsance) {
      return res.status(404).json({ message: "Absance introuvable" });
    }
    res.status(200).json({ message: "✅ Absance mis à jour", updatedAbsance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE supprimer une absence
module.exports.deleteabsance = async (req, res) => {
  try {
    const deletedAbsance = await absancetModel.findByIdAndDelete(req.params.id);
    if (!deletedAbsance) {
      return res.status(404).json({ message: "Absance introuvable" });
    }
    res.status(200).json({ message: "🗑️ Absance supprimée avec succès", deletedAbsance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

