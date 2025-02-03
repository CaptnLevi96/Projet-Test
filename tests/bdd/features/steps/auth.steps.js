const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

const validateEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

const validateMotDePasse = (password) => {
  return password.length >= 8;
};

Given("je suis sur la page inscription", function() {
  this.onRegistrationPage = true;
});

When("je saisis email {string} et le mot de passe {string}", function(email, password) {
  this.email = email;
  this.password = password;
  this.emailValid = validateEmail(email);
  this.passwordValid = validateMotDePasse(password);
});

Then("mon compte devrait etre cree avec succes", function() {
  assert.strictEqual(this.emailValid, true);
  assert.strictEqual(this.passwordValid, true);
});

Then("je devrais voir une erreur pour email", function() {
  assert.strictEqual(this.emailValid, false);
});

Then("je devrais voir une erreur pour le mot de passe", function() {
  assert.strictEqual(this.passwordValid, false);
});

Given("je suis un utilisateur deja inscrit", function() {
  this.user = {
    email: "test@exemple.com",
    password: "password123"
  };
});

When("je me connecte avec email {string} et le mot de passe {string}", function(email, password) {
  this.loginEmail = email;
  this.loginPassword = password;
  if (this.user) {
    this.loginSuccess = email === this.user.email && password === this.user.password;
  }
});

Then("je devrais etre connecte avec succes", function() {
  assert.strictEqual(this.loginSuccess, true);
});

Then("je devrais voir une erreur de connexion", function() {
  assert.strictEqual(this.loginSuccess, false);
});