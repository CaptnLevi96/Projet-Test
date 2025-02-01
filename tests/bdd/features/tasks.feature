# tests/bdd/features/tasks.feature
Feature: Gestion des tâches

  Scenario: Création d'une tâche réussie
    Given je suis connecté
    When je crée une nouvelle tâche avec le titre "Faire les courses"
    Then la tâche devrait être créée avec succès

  Scenario: Création d'une tâche sans titre
    Given je suis connecté
    When je crée une tâche sans titre
    Then je devrais voir une erreur pour le titre requis

  Scenario: Suppression de ma tâche
    Given je suis connecté
    And j'ai une tâche existante
    When je supprime ma tâche
    Then la tâche devrait être supprimée avec succès

  Scenario: Tentative de suppression de la tâche d'un autre
    Given je suis connecté
    And il existe une tâche d'un autre utilisateur
    When j'essaie de supprimer cette tâche
    Then je devrais voir une erreur d'autorisation

  Scenario: Consultation de mes tâches
    Given je suis connecté
    And j'ai plusieurs tâches
    When je consulte ma liste de tâches
    Then je devrais voir uniquement mes tâches