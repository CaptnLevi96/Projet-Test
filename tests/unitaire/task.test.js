// tests/unit/task.test.js
const { validateTitre, peutSupprimerTache } = require('../../src/models/Task');

describe('Gestion des Tâches', () => {
  describe('Validation du Titre', () => {
    test('titre non vide doit être valide', () => {
      expect(validateTitre('Faire les courses')).toBeTruthy();
    });

    test('titre vide doit être invalide', () => {
      expect(validateTitre('')).toBeFalsy();
    });

    test('titre avec espaces uniquement doit être invalide', () => {
      expect(validateTitre('   ')).toBeFalsy();
    });

    test('titre null doit être invalide', () => {
      expect(validateTitre(null)).toBeFalsy();
    });

    test('titre undefined doit être invalide', () => {
      expect(validateTitre(undefined)).toBeFalsy();
    });
  });

  describe('Autorisation de Suppression', () => {
    test('utilisateur peut supprimer sa propre tâche', () => {
      expect(peutSupprimerTache('user123', 'user123')).toBeTruthy();
    });

    test('utilisateur ne peut pas supprimer la tâche d\'un autre', () => {
      expect(peutSupprimerTache('user123', 'user456')).toBeFalsy();
    });

    test('utilisateur non autorisé ne peut pas supprimer de tâche', () => {
      expect(peutSupprimerTache(null, 'user123')).toBeFalsy();
    });

    test('tâche sans propriétaire ne peut pas être supprimée', () => {
      expect(peutSupprimerTache('user123', null)).toBeFalsy();
    });

    test('utilisateur undefined ne peut pas supprimer de tâche', () => {
      expect(peutSupprimerTache(undefined, 'user123')).toBeFalsy();
    });
  });
});