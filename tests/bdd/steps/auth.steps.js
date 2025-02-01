const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Fonctions de validation simulées (à remplacer par vos vraies fonctions)
const validateEmail = (email) => {
  return email.includes('@') && email.includes('.');
};

const validateMotDePasse = (password) => {
  return password.length >= 8;
};

// Steps pour l'inscription
Given('je suis sur la page d\'inscription', function() {
  this.onRegistrationPage = true;
});

When('je saisis l\'email {string} et le mot de passe {string}', function(email, password) {
  this.email = email;
  this.password = password;
  this.emailValid = validateEmail(email);
  this.passwordValid = validateMotDePasse(password);
});

Then('mon compte devrait être créé avec succès', function() {
  assert.strictEqual(this.emailValid, true);
  assert.strictEqual(this.passwordValid, true);
});

Then('je devrais voir une erreur pour l\'email', function() {
  assert.strictEqual(this.emailValid, false);
});

Then('je devrais voir une erreur pour le mot de passe', function() {
  assert.strictEqual(this.passwordValid, false);
});

// Steps pour la connexion
Given('je suis un utilisateur déjà inscrit', function() {
  this.user = {
    email: 'test@exemple.com',
    password: 'password123'
  };
});

When('je me connecte avec l\'email {string} et le mot de passe {string}', function(email, password) {
  this.loginEmail = email;
  this.loginPassword = password;
  if (this.user) {
    this.loginSuccess = email === this.user.email && password === this.user.password;
  }
});

Then('je devrais être connecté avec succès', function() {
  assert.strictEqual(this.loginSuccess, true);
});

Then('je devrais voir une erreur de connexion', function() {
  assert.strictEqual(this.loginSuccess, false);
});