// tests/bdd/steps/task.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { validateTitre, peutSupprimerTache } = require('../../../src/models/Task');

Given('je suis connecté', function() {
  this.userId = 'user123';
  this.isLoggedIn = true;
});

Given('j\'ai une tâche existante', function() {
  this.maTache = {
    id: 'task123',
    titre: 'Ma tâche',
    userId: this.userId
  };
});

Given('il existe une tâche d\'un autre utilisateur', function() {
  this.autreTache = {
    id: 'task456',
    titre: 'Tâche d\'un autre',
    userId: 'otherUser123'
  };
});

Given('j\'ai plusieurs tâches', function() {
  this.mesTaches = [
    { id: 'task1', titre: 'Tâche 1', userId: this.userId },
    { id: 'task2', titre: 'Tâche 2', userId: this.userId }
  ];
});

When('je crée une nouvelle tâche avec le titre {string}', function(titre) {
  this.nouveauTitre = titre;
  this.titreValide = validateTitre(titre);
});

When('je crée une tâche sans titre', function() {
  this.nouveauTitre = '';
  // Stockons directement le résultat de validateTitre
  this.titreValide = validateTitre(this.nouveauTitre);
});

When('je supprime ma tâche', function() {
  this.autorisationSuppression = peutSupprimerTache(this.userId, this.maTache.userId);
});

When('j\'essaie de supprimer cette tâche', function() {
  this.autorisationSuppression = peutSupprimerTache(this.userId, this.autreTache.userId);
});

When('je consulte ma liste de tâches', function() {
  this.tachesVisibles = this.mesTaches.filter(
    tache => tache.userId === this.userId
  );
});

Then('la tâche devrait être créée avec succès', function() {
  assert.strictEqual(this.titreValide, true);
});

Then('je devrais voir une erreur pour le titre requis', function() {
  // Vérifions directement que validateTitre retourne false pour un titre vide
  assert.strictEqual(validateTitre(this.nouveauTitre), false);
});

Then('la tâche devrait être supprimée avec succès', function() {
  assert.strictEqual(this.autorisationSuppression, true);
});

Then('je devrais voir une erreur d\'autorisation', function() {
  assert.strictEqual(this.autorisationSuppression, false);
});

Then('je devrais voir uniquement mes tâches', function() {
  assert.strictEqual(this.tachesVisibles.length, this.mesTaches.length);
  assert.strictEqual(
    this.tachesVisibles.every(tache => tache.userId === this.userId),
    true
  );
});