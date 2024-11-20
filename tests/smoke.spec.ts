import { test, expect } from '@playwright/test'
import { AppPage } from "./models/app.page";

test.beforeEach(async ({ page }) => {
  await new AppPage(page).navigate()
})

test.describe('Smoke', () => {
  let appPage: AppPage

  test.beforeEach(async ({ page }) => {
    appPage = new AppPage(page)
  })

  test('has data', async () => {
    await expect(appPage.getUsername('sandhikagalih')).toBeVisible()
    await expect(appPage.emptyState).not.toBeVisible()
  })

  test('search by username has result', async () => {
    await appPage.fillAndSearch('depapp')
    await expect(appPage.getUsername('depapp')).toBeVisible()
    await expect(appPage.emptyState).not.toBeVisible()
  })

  test('search by username has no result', async () => {
    await appPage.fillAndSearch('non-existing-username')
    await expect(appPage.emptyState).toBeVisible()
  })

  test('has last update', async () => {
    await expect(appPage.lastUpdate).toBeVisible()
  })

  test('has faq', async () => {
    await expect(appPage.faqHeading).toBeVisible()
    // TODO: check if the faq items are visible
  })
})
