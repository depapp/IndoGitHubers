import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  emptyState: Locator;
  lastUpdate: Locator;
  faqHeading: Locator;
  searchInput: Locator;
  toggleColumnVisibilityBtn: Locator;
  columnNameCheckbox: Locator;

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
}
