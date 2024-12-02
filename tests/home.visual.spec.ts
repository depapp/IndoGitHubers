import { expect, test } from '@playwright/test';
import { HomePage } from './models/home.page';

test.describe('Homepage Visual Test', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test(
    'Homepage should match snapshots',
    {
      tag: ['@visual'],
    },
    async ({ page }) => {
      await expect(homePage.getUsername('sandhikagalih')).toBeVisible();
      await expect(homePage.emptyState).not.toBeVisible();
      await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
    }
  );
});
