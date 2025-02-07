// playwright.config.js
export default {
  testDir: './tests/e2e',
  testMatch: '**/*.spec2.js',
  timeout: 60000,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  outputDir: 'test-results'
};
