const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { validateTitre, peutSupprimerTache } = require("../../../../src/models/Task");

Given("je suis connecte", function() {
  this.userId = "user123";
  this.isLoggedIn = true;
});

Given("je ai une tache existante", function() {
  this.maTache = {
    id: "task123",
    titre: "Ma tache",
    userId: this.userId
  };
});

Given("il existe une tache autre utilisateur", function() {
  this.autreTache = {
    id: "task456",
    titre: "Tache autre",
    userId: "otherUser123"
  };
});

Given("je ai plusieurs taches", function() {
  this.mesTaches = [
    { id: "task1", titre: "Tache 1", userId: this.userId },
    { id: "task2", titre: "Tache 2", userId: this.userId }
  ];
});

When("je cree une nouvelle tache avec le titre {string}", function(titre) {
  this.nouveauTitre = titre;
  this.titreValide = validateTitre(titre);
});

When("je cree une tache sans titre", function() {
  this.nouveauTitre = "";
  this.titreValide = validateTitre(this.nouveauTitre);
});

When("je supprime ma tache", function() {
  this.autorisationSuppression = peutSupprimerTache(this.userId, this.maTache.userId);
});

When("je essaie de supprimer cette tache", function() {
  this.autorisationSuppression = peutSupprimerTache(this.userId, this.autreTache.userId);
});

When("je consulte ma liste de taches", function() {
  this.tachesVisibles = this.mesTaches.filter(
    tache => tache.userId === this.userId
  );
});

Then("la tache devrait etre creee avec succes", function() {
  assert.strictEqual(this.titreValide, true);
});

Then("je devrais voir une erreur pour le titre requis", function() {
  assert.strictEqual(this.titreValide, false);
});

Then("la tache devrait etre supprimee avec succes", function() {
  assert.strictEqual(this.autorisationSuppression, true);
});

Then("je devrais voir une erreur autorisation", function() {
  assert.strictEqual(this.autorisationSuppression, false);
});

Then("je devrais voir uniquement mes taches", function() {
  assert.strictEqual(this.tachesVisibles.length, this.mesTaches.length);
  assert.strictEqual(
    this.tachesVisibles.every(tache => tache.userId === this.userId),
    true
  );
});