import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.context().newPage({ recordVideo: { dir: './tests/e2e/video' } });
  await page.goto('http://www.localhost:3000/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user1@example.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Password');
  await page.screenshot({ path: './tests/e2e/img/1_fill_login.png' });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.screenshot({ path: './tests/e2e/img/2_send_login.png' });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.screenshot({ path: './tests/e2e/img/3_task_page.png' });
  await page.getByRole('textbox', { name: 'Titre' }).click();
  await page.getByRole('textbox', { name: 'Titre' }).fill('Bonjour');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Je me nomme user.');
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/e2e/img/4_task_1.png' });
  await page.getByRole('textbox', { name: 'Titre' }).click();
  await page.getByRole('textbox', { name: 'Titre' }).fill('I love apples.');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('But strawberrys are better.');
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/e2e/img/5_task_2.png' });
  await page.locator('#task-container div').filter({ hasText: 'I love apples. But strawberrys are better. Supprimer' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/e2e/img/6_task_2_delete.png' });
});