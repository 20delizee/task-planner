const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' }); // ← chemin absolu depuis la racine du projet
// Double sécurité
console.log("📦 Chargement MONGO_URI depuis db.js:", process.env.MONGO_URI); // Nécessaire ici AUSSI par sécurité

module.exports = async () => {
  console.log("🔎 MONGO_URI =", process.env.MONGO_URI); // ← Debug ici
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB", err);
    process.exit(1);
  }
};
