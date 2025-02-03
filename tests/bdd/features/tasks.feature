# tests/bdd/features/tasks.feature
Feature: Gestion des taches

  Scenario: Creation tache reussie
    Given je suis connecte
    When je cree une nouvelle tache avec le titre "Faire les courses"
    Then la tache devrait etre creee avec succes

  Scenario: Creation tache sans titre
    Given je suis connecte
    When je cree une tache sans titre
    Then je devrais voir une erreur pour le titre requis

  Scenario: Suppression de ma tache
    Given je suis connecte
    And je ai une tache existante
    When je supprime ma tache
    Then la tache devrait etre supprimee avec succes

  Scenario: Tentative de suppression de la tache autre
    Given je suis connecte
    And il existe une tache autre utilisateur
    When je essaie de supprimer cette tache
    Then je devrais voir une erreur autorisation

  Scenario: Consultation de mes taches
    Given je suis connecte
    And je ai plusieurs taches
    When je consulte ma liste de taches
    Then je devrais voir uniquement mes taches