// tests/unit/user.test.js
const { validateEmail, validateMotDePasse } = require('../../src/models/User');

describe('Validation Utilisateur', () => {
  // Tests email
  describe('Validation Email', () => {
    test('email avec format standard doit être valide', () => {
      expect(validateEmail('test@exemple.com')).toBeTruthy();
    });

    test('email sans @ doit être invalide', () => {
      expect(validateEmail('testexemple.com')).toBeFalsy();
    });

    test('email sans domaine doit être invalide', () => {
      expect(validateEmail('test@')).toBeFalsy();
    });

    test('email sans nom utilisateur doit être invalide', () => {
      expect(validateEmail('@exemple.com')).toBeFalsy();
    });

    test('email vide doit être invalide', () => {
      expect(validateEmail('')).toBeFalsy();
    });
  });

  // Tests mot de passe
  describe('Validation Mot de Passe', () => {
    test('mot de passe avec 8 caractères doit être valide', () => {
      expect(validateMotDePasse('12345678')).toBeTruthy();
    });

    test('mot de passe avec plus de 8 caractères doit être valide', () => {
      expect(validateMotDePasse('123456789')).toBeTruthy();
    });

    test('mot de passe avec 7 caractères doit être invalide', () => {
      expect(validateMotDePasse('1234567')).toBeFalsy();
    });

    test('mot de passe vide doit être invalide', () => {
      expect(validateMotDePasse('')).toBeFalsy();
    });

    test('mot de passe null doit être invalide', () => {
      expect(validateMotDePasse(null)).toBeFalsy();
    });
  });
});