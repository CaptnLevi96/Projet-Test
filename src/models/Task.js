// src/models/Task.js

/**
 * Valide le titre d'une tâche
 * @param {string} titre 
 * @returns {boolean}
 */
function validateTitre(titre) {
    // Si le titre est null, undefined ou vide après trim(), retourne false
    if (!titre || titre.trim().length === 0) {
        return false;
    }
    return true;
}

/**
 * Vérifie si un utilisateur peut supprimer une tâche
 * @param {string} utilisateurId - ID de l'utilisateur qui tente de supprimer
 * @param {string} proprietaireId - ID du propriétaire de la tâche
 * @returns {boolean}
 */
function peutSupprimerTache(utilisateurId, proprietaireId) {
    if (!utilisateurId || !proprietaireId) return false;
    return utilisateurId === proprietaireId;
}

module.exports = {
    validateTitre,
    peutSupprimerTache
};