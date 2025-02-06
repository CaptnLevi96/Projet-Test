import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('devrait permettre la connexion avec des identifiants valides', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="form-button"]')
    ]);
  });

  test('devrait afficher une erreur pour des identifiants invalides', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.fill('#email', 'incorrect@example.com');
    await page.fill('#password', 'mauvaismdp');
    await page.click('button[type="form-button"]');
    await page.locator('#message').waitFor({ state: 'visible', timeout: 10000 });
  });
});