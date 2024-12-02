import { expect, test } from '@playwright/test';
import { HomePage } from './models/home.page';

test.describe('Homepage', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test(
    'Homepage should has data to shown',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await expect(homePage.getUsername('sandhikagalih')).toBeVisible();
      await expect(homePage.emptyState).not.toBeVisible();
    }
  );

  test(
    'Homepage should has last update text',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await expect(homePage.lastUpdate).toBeVisible();
    }
  );

  test(
    'Homepage should has faq section',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await expect(homePage.faqHeading).toBeVisible();
    }
  );

  test(
    'Given username to search should has result',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await homePage.fillAndSearch('depapp');
      await expect(homePage.getUsername('depapp')).toBeVisible();
      await expect(homePage.emptyState).not.toBeVisible();
    }
  );

  test(
    'Given username to search should has no result',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await homePage.fillAndSearch('non-existing-username');
      await expect(homePage.emptyState).toBeVisible();
    }
  );
});
