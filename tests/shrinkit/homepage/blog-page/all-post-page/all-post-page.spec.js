const { test, expect, chromium } = require('@playwright/test')
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

test.beforeEach(async ({ page }) => {
  await page.goto('/blog');
})



test.describe('All Post Page', () => {

  test('Verify that the title says "Welcome to ShrinkIt Blog"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome to ShrinkIt Blog' })).toBeVisible();
    await expect(page.locator('h1')).toContainText('Welcome to ShrinkIt Blog');
  })

  test('Verify that the description says: "Stay up-to-date with the newest features, announcements, releases and updates from ShrinkIt."', async ({ page }) => {
    await expect(page.getByText('Stay up-to-date with the')).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Stay up-to-date with the newest features, announcements, releases and updates from ShrinkIt.');
  })

})


