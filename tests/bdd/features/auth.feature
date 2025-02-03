# tests/bdd/features/auth.feature
Feature: Authentification des utilisateurs

  Scenario: Inscription reussie
    Given je suis sur la page inscription
    When je saisis email "test@exemple.com" et le mot de passe "password123"
    Then mon compte devrait etre cree avec succes

  Scenario: Inscription avec email invalide
    Given je suis sur la page inscription
    When je saisis email "invalide" et le mot de passe "password123"
    Then je devrais voir une erreur pour email

  Scenario: Inscription avec mot de passe trop court
    Given je suis sur la page inscription
    When je saisis email "test@exemple.com" et le mot de passe "court"
    Then je devrais voir une erreur pour le mot de passe

  Scenario: Connexion reussie
    Given je suis un utilisateur deja inscrit
    When je me connecte avec email "test@exemple.com" et le mot de passe "password123"
    Then je devrais etre connecte avec succes

  Scenario: Echec de connexion
    Given je suis un utilisateur deja inscrit
    When je me connecte avec email "test@exemple.com" et le mot de passe "mauvais"
    Then je devrais voir une erreur de connexion