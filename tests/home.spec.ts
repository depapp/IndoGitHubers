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
    async ({ page }) => {
      await test.step('should has data in the row', async () => {
        await homePage.assertContentInRowIsVisible();
      });

      await test.step('should has last update text', async () => {
        await homePage.assertLastUpdatedTextIsVisible();
      });

      await test.step('should has faq section', async () => {
        await homePage.assertFaqSectionIsVisible();
      });

      await test.step('should match homepage visual snapshot', async () => {
        await expect(page).toHaveScreenshot('homepage.png', {
          maxDiffPixelRatio: 0.04,
        });
      });
    }
  );

  test(
    'should validate the search function',
    {
      tag: ['@smoke', '@desktop', '@mobile'],
    },
    async ({ page }) => {
      await test.step('When user search with a valid keyword', async () => {
        await homePage.fillAndSearch('depapp');
      });

      await test.step('Then table should show expected result', async () => {
        await expect(homePage.getUsername('depapp')).toBeVisible();
        await expect(homePage.emptyState).not.toBeVisible();
      });

      await test.step('Then verify the visual from the valid search result page', async () => {
        await expect(page).toHaveScreenshot('search-results-valid.png', {
          maxDiffPixelRatio: 0.04,
        });
      });

      await test.step('When user search with non existance keyword', async () => {
        await homePage.fillAndSearch('non-existing-username');
      });

      await test.step('Then it should show the empty state', async () => {
        await expect(homePage.emptyState).toBeVisible();
      });

      await test.step('Then verify the visual from the empty state', async () => {
        await expect(page).toHaveScreenshot('search-results-empty.png', {
          maxDiffPixelRatio: 0.04,
        });
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
    async ({ isMobile, page }) => {
      test.skip(isMobile, '// NOTE: TEST CASE FOR DESKTOP ONLY');

      await test.step('When user click toggle column button', async () => {
        await expect(homePage.toggleColumnVisibilityBtn).toBeVisible();
        await homePage.toggleColumnVisibilityBtn.click();
      });

      await test.step('Then validate the visual before changing the visibility', async () => {
        await expect(page).toHaveScreenshot('column-visibility-menu.png', {
          maxDiffPixelRatio: 0.04,
        });
      });

      await test.step('When user perform toggle hide column "Name"', async () => {
        await expect(homePage.columnNameCheckbox).toBeVisible();
        await homePage.columnNameCheckbox.click();
        await expect(homePage.columnNameCheckbox).not.toBeVisible();
      });

      await test.step('Then column "Name" should become invisible', async () => {
        await expect(homePage.getName('Sandhika Galih')).not.toBeVisible();
      });

      await test.step('Then validate the visual after column become invisible', async () => {
        await expect(page).toHaveScreenshot('column-name-hidden.png', {
          maxDiffPixelRatio: 0.04,
        });
      });
    }
  );

  test(
    'should sort by contributions on desktop',
    {
      tag: ['@smoke', '@desktop'],
    },
    async ({ isMobile, page }) => {
      test.skip(isMobile, '// NOTE: TEST CASE FOR DESKTOP ONLY');

      await test.step('Should show initial data', async () => {
        await homePage.assertContentInRowIsVisible();
      });

      await test.step('Then validate the initial visually', async () => {
        await expect(page).toHaveScreenshot('before-sort.png', {
          maxDiffPixelRatio: 0.04,
        });
      });

      await test.step('When user click header "Contributions"', async () => {
        await homePage.contributionsHeader.click();
      });

      await test.step('And select sort direction Asc', async () => {
        await homePage.sortAscButton.click();
      });

      await test.step('Then data row should sort by contributions', async () => {
        await homePage.assertContributionsDesktopAreSorted();
      });

      await test.step('Then verify the visual snapshot', async () => {
        await expect(page).toHaveScreenshot('contributions-sorted.png', {
          maxDiffPixelRatio: 0.04,
        });
      });
    }
  );

  test(
    'should sort by contributions on mobile',
    {
      tag: ['@smoke', '@mobile'],
    },
    async ({ isMobile, page }) => {
      test.skip(!isMobile, '// NOTE: TEST CASE FOR MOBILE ONLY');

      await test.step('Should show initial data', async () => {
        await homePage.assertContentInRowIsVisible();
      });

      await test.step('Then validate the initial visually', async () => {
        await expect(page).toHaveScreenshot('before-sort.png', {
          maxDiffPixelRatio: 0.04,
        });
      });

      await test.step('When user click "Sort" button', async () => {
        await homePage.sortButton.click();
      });

      await test.step('And select sort "By Contributions"', async () => {
        await homePage.sortByContributionsButton.click();
      });

      await test.step('Then data row should sort by contributions', async () => {
        await expect(homePage.getName('Sandhika Galih')).not.toBeVisible();
      });

      await test.step('Then verify the visual snapshot', async () => {
        await expect(page).toHaveScreenshot('contributions-sorted.png', {
          maxDiffPixelRatio: 0.04,
        });
      });
    }
  );
});
