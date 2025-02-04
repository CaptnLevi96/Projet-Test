// src/models/Task.js

const validateTitre = (titre) => {
    // Retourne false si le titre est undefined, null, ou une chaîne vide
    return titre !== undefined && titre !== null && titre.trim().length > 0;
};

const peutSupprimerTache = (userId, tacheUserId) => {
    return userId === tacheUserId;
};

module.exports = {
    validateTitre,
    peutSupprimerTache
};