const Sanction = require("../models/sanction.model");

// ✅ GET toutes les sanctions
module.exports.getSanction = async (req, res) => {
  try {
    const sanctions = await Sanction.find().populate("idpersonnel");
    res.status(200).json(sanctions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ POST nouvelle sanction
module.exports.setSanction = async (req, res) => {
  const { idpersonnel, Date_emission, Type_sanction, Motif } = req.body;

  if (!idpersonnel || !Date_emission || !Type_sanction || !Motif) {
    return res.status(400).json({ message: "⚠️ Données incomplètes" });
  }

  try {
    const sanction = await Sanction.create({
      idpersonnel,
      Date_emission,
      Type_sanction,
      Motif,
    });
    res.status(201).json(sanction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ PUT modifier une sanction
module.exports.editSanction = async (req, res) => {
  try {
    const updatedSanction = await Sanction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedSanction) {
      return res.status(404).json({ message: "Sanction introuvable" });
    }
    res.status(200).json({ message: "✅ Sanction mise à jour", updatedSanction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE supprimer une sanction
module.exports.deleteSanction = async (req, res) => {
  try {
    const deletedSanction = await Sanction.findByIdAndDelete(req.params.id);
    if (!deletedSanction) {
      return res.status(404).json({ message: "Sanction introuvable" });
    }
    res.status(200).json({ message: "🗑️ Sanction supprimée avec succès", deletedSanction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
