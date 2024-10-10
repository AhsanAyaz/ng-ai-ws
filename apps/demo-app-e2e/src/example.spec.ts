import { test, expect } from '@playwright/test';
import { navigateTo } from './helper';

test('has title', async ({ page }) => {
  await navigateTo('/', page);

  // Expect h1 to contain a substring.
  expect(await page.locator('header nav').innerText()).toContain(
    'Sentiment Analyzer with Google Gemini & Angular'
  );
});
