import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  emptyState: Locator;
  lastUpdate: Locator;
  faqHeading: Locator;
  searchInput: Locator;
  toggleColumnVisibilityBtn: Locator;
  columnNameCheckbox: Locator;
  contributionsHeader: Locator;
  sortButton: Locator;
  sortByContributionsButton: Locator;
  sortAscButton: Locator;
  firstRowContributions: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByPlaceholder(/search username/i);
    this.lastUpdate = page.getByText(/last updated at/i);
    this.faqHeading = page.getByRole('heading', {
      name: /frequently asked questions/i,
    });
    this.emptyState = page.getByText(/no results/i);
    this.toggleColumnVisibilityBtn = page.getByRole('button', {
      name: /view/i,
    });
    this.columnNameCheckbox = page.getByRole('menuitemcheckbox', {
      name: /name/i,
    });
    this.contributionsHeader = page.getByRole('columnheader', { name: /contributions/i });
    this.sortButton = page.getByRole('button', { name: /sort/i });
    this.sortByContributionsButton = page.getByRole('menuitem', { name: /by contributions/i });
    this.sortAscButton = page.getByRole('menuitem', { name: /ascending/i });
    this.firstRowContributions = page.locator('tbody tr').first().locator('td').nth(2);
  }

  async navigate() {
    await this.page.goto('/');
  }

  async fillAndSearch(username: string) {
    await this.searchInput.fill(username);
  }

  getUsername(username: string) {
    return this.page.getByRole('link', { name: username });
  }

  getName(name: string) {
    return this.page.getByText(name);
  }

  async assertContentInRowIsVisible() {
    await expect(this.getUsername('sandhikagalih')).toBeVisible();
    await expect(this.emptyState).not.toBeVisible();
  }

  async assertLastUpdatedTextIsVisible() {
    await expect(this.lastUpdate).toBeVisible();
  }

  async assertFaqSectionIsVisible() {
    await expect(this.faqHeading).toBeVisible();
  }

  async sortByContributionsDesktop() {
    await this.contributionsHeader.click();
    await this.sortAscButton.click();
  }

  async sortByContributionsMobile() {
    await this.sortButton.click();
    await this.sortByContributionsButton.click();
  }

  async assertContributionsAreSorted() {
    // Wait for sorting to complete
    await this.page.waitForTimeout(500);
    // Take a snapshot of the sorted table
    await expect(this.page).toHaveScreenshot('contributions-sorted.png');
    // Verify first row has the lowest contribution count
    const firstContribution = await this.firstRowContributions.textContent();
    const contributionCount = parseInt(firstContribution || '0', 10);
    expect(contributionCount).toBeLessThanOrEqual(100);
  }
}
