# tests/bdd/features/auth.feature
Feature: Authentification des utilisateurs

  Scenario: Inscription réussie
    Given je suis sur la page d'inscription
    When je saisis l'email "test@exemple.com" et le mot de passe "password123"
    Then mon compte devrait être créé avec succès

  Scenario: Inscription avec email invalide
    Given je suis sur la page d'inscription
    When je saisis l'email "invalide" et le mot de passe "password123"
    Then je devrais voir une erreur pour l'email

  Scenario: Inscription avec mot de passe trop court
    Given je suis sur la page d'inscription
    When je saisis l'email "test@exemple.com" et le mot de passe "court"
    Then je devrais voir une erreur pour le mot de passe

  Scenario: Connexion réussie
    Given je suis un utilisateur déjà inscrit
    When je me connecte avec l'email "test@exemple.com" et le mot de passe "password123"
    Then je devrais être connecté avec succès

  Scenario: Échec de connexion
    Given je suis un utilisateur déjà inscrit
    When je me connecte avec l'email "test@exemple.com" et le mot de passe "mauvais"
    Then je devrais voir une erreur de connexion