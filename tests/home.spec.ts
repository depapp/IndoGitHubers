import { expect, test } from '@playwright/test';
import { HomePage } from './models/home.page';

test.describe('Homepage', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await test.step('Given navigate to the homepage', async () => {
      homePage = new HomePage(page);
      await homePage.navigate();
    });
  });

  test(
    'should contains expected elements',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await test.step('should has data in the row', async () => {
        await homePage.assertContentInRowIsVisible();
      });

      await test.step('should has last update text', async () => {
        await homePage.assertLastUpdatedTextIsVisible();
      });

      await test.step('should has faq section', async () => {
        await homePage.assertFaqSectionIsVisible();
      });
    }
  );

  test(
    'should validate the search function',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async () => {
      await test.step('When user search with a valid keyword', async () => {
        await homePage.fillAndSearch('depapp');
      });

      await test.step('Then table should show expected result', async () => {
        await expect(homePage.getUsername('depapp')).toBeVisible();
        await expect(homePage.emptyState).not.toBeVisible();
      });

      await test.step('When user search with non existance keyword', async () => {
        await homePage.fillAndSearch('non-existing-username');
      });

      await test.step('Then it should show the empty state', async () => {
        await expect(homePage.emptyState).toBeVisible();
      });
    }
  );

  /**
   * Sample test case that only run on certain project
   * Use "test.skip" and accept "isMobile" to determine
   */
  test(
    'should toggle column visibility',
    {
      tag: ['@smoke', '@desktop'],
    },
    async ({ isMobile }) => {
      test.skip(isMobile, '// NOTE: TEST CASE FOR DESKTOP ONLY');

      await test.step('When user click toggle column button', async () => {
        await expect(homePage.toggleColumnVisibilityBtn).toBeVisible();
        await homePage.toggleColumnVisibilityBtn.click();
      });

      await test.step('And perform toggle hide column "Name"', async () => {
        await expect(homePage.columnNameCheckbox).toBeVisible();
        await homePage.columnNameCheckbox.click();
        await expect(homePage.columnNameCheckbox).not.toBeVisible();
      });

      await test.step('Then column "Name" should become invisible', async () => {
        await expect(homePage.getName('Sandhika Galih')).not.toBeVisible();
      });
    }
  );
});
