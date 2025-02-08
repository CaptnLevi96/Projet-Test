# Projet Tests

## 📌 Installation du projet

1. **Cloner le dépôt** :
   ```sh
   git clone https://github.com/CaptnLevi96/Projet-Test.git
   cd PROJET-TESTS
   ```

2. **Installer les dépendances** :
   ```sh
   npm install
   ```

## 🚀 Exécuter les tests localement

### Tests unitaires (Jest)
```sh
npm test
```

### Tests E2E (Playwright)
```sh
npx playwright install --with-deps
npm run test:e2e
```

### Tests BDD (Cucumber)
```sh
npm run test:bdd
```

### Tests Cucumber spécifiques

- **Tests d'authentification** :
  ```sh
  npm run test:auth
  ```

- **Tests de gestion des tâches** :
  ```sh
  npm run test:tasks
  ```

- **Exécution en mode dry-run** (sans exécution des étapes) :
  ```sh
  npm run test:dry
  ```

## 🔄 Configuration du pipeline CI/CD

Le projet utilise **GitHub Actions** pour exécuter automatiquement les tests sur les branches `main` et `dev`. Voici les principaux workflows :

- **Jest Tests** : Exécute les tests unitaires avec Jest.
- **Cucumber BDD Tests** : Exécute les tests basés sur Cucumber.
- **Playwright E2E Tests** : Exécute les tests end-to-end avec Playwright.

### 📂 Emplacement des fichiers CI/CD
Les fichiers YAML des workflows sont situés dans :
```
.github/workflows/
```

### 🚦 Déclenchement des workflows
Les tests sont exécutés automatiquement lorsque :
- Un **push** est effectué sur `main` ou `dev`.
- Une **pull request** est créée vers `main` ou `dev`.

### 🔧 Déploiement
Le pipeline CI/CD est conçu pour vérifier la stabilité du code via les tests, mais un déploiement peut être ajouté si nécessaire.

📌 **Assurez-vous que tous les tests passent avant de merger vos branches !** ✅

