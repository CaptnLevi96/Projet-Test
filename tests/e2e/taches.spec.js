import { test, expect } from '@playwright/test';

test.describe('Gestion des Tâches', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="form-button"]')
    ]);
    await page.goto('http://localhost:3000/task.html');
    await page.waitForLoadState('networkidle');
  });

  test('devrait ajouter une nouvelle tâche', async ({ page }) => {
    const titre = 'Nouvelle tâche de test';
    const description = 'Description de la tâche de test';

    await page.fill('#titre', titre);
    await page.fill('#description', description);
    await page.click('.task-form-submit button');
    await page.locator('#task-container').waitFor({ state: 'visible', timeout: 10000 });
  });
});