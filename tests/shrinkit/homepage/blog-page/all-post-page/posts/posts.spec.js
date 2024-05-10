const { test, expect, chromium } = require('@playwright/test')
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

test.beforeEach(async ({ page }) => {
  await page.goto('/blog');
})

//function to check if an element is underlined when hovered
async function checkUnderlineOnHover(page, element, expectedTextDecoration) {
  await element.hover();
  const computedStyle = await element.evaluate(el => getComputedStyle(el));
  const textDecoration = computedStyle.textDecoration;
  if (!textDecoration.includes(expectedTextDecoration)) {
    throw new Error(`Hover effect is not working correctly on ${element}. Test failed!`);
  }
}


test.describe('All Post Page', () => {

  test('Verify that the post image is visible', async ({ page }) => {
    const image = page.getByRole('link', { name: 'MP4 vs MOV: Understanding the' }).first()
    await expect(image).toBeVisible();
  })

  test('Verify that the post image is clickable and leads you to the whole article', async ({ page }) => {
    await page.getByRole('link', { name: 'MP4 vs MOV: Understanding the' }).first().click();
    await expect(page.getByRole('link', { name: 'Back to Blog' })).toBeVisible();
    await page.getByRole('link', { name: 'Back to Blog' }).click();
  })

  test('Verify that the post title is clickable and leads you to the whole article', async ({ page }) => {
    await page.getByText('MP4 vs MOV: Understanding the').click();
    await expect(page.getByText('Posted by')).toBeVisible();
    await page.getByRole('link', { name: 'Back to Blog' }).click();
  })

  test('Verify that the post has a category', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Guides' }).first()).toBeVisible();
  })

  test('Verify that the post has a title', async ({ page }) => {
    await expect(page.getByText('MP4 vs MOV: Understanding the')).toBeVisible();
  })

  test('Verify that the post shows a brief descriptive paragraph', async ({ page }) => {
    await expect(page.getByText('Dive into the essential')).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Dive into the essential differences between MP4 and MOV video formats to help content creators make informed decisions for their projects.');
  })

  test('Verify that the post shows the Author avatar and name', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: /^Eddie EspinalApril 11$/ }).getByRole('link')).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Eddie Espinal');
  })

  test('Verify that the "Author" avatar and name are clickable and leads you to the "Author" page', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Eddie EspinalApril 11$/ }).getByRole('link').click();
    await expect(page.getByText('Authors')).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Authors');
  })

  test('Verify that the post shows the posted date', async ({ page }) => {
    await expect(page.getByText('April 11')).toBeVisible();
  })

  test('Verify that when hovering over the post title it underlines it', async ({ page }) => {
    const postTitle = page.getByText('MP4 vs MOV: Understanding the');
    await postTitle.hover();

    //function to check if an element is underlined when hovered
    await checkUnderlineOnHover(page, postTitle, 'underline');
  })

  test('Verify that when hovering over the post category it changes background color', async ({ page }) => {

    const postCategory = page.getByRole('link', { name: 'Guides' }).first();
    const initialColor = await postCategory.evaluate(element => getComputedStyle(element).backgroundColor);
    await postCategory.hover();
    await page.waitForTimeout(2000);
    const hoveredColor = await postCategory.evaluate(element => getComputedStyle(element).backgroundColor);
    console.log('Initial color:', initialColor);
    console.log('Hovered color:', hoveredColor);
    await expect(hoveredColor).toEqual('rgb(87, 13, 248)');

  })

  test('Verify that when hovering over the post category it changes letter color', async ({ page }) => {
    
    const postCategory = page.getByRole('link', { name: 'Guides' }).first();
    const initialTextColor = await postCategory.evaluate(element => getComputedStyle(element).color);
    await postCategory.hover();
    await page.waitForTimeout(2000);
    const hoveredTextColor = await postCategory.evaluate(element => getComputedStyle(element).color);
    console.log('Initial color:', initialTextColor);
    console.log('Hovered color:', hoveredTextColor);
    await expect(hoveredTextColor).toEqual('rgb(224, 210, 254)');
  })

  test('Verify that when hovering over the "Author" name it underlines it', async ({ page }) => {
    const postAuthor = page.locator('//html/body/div[1]/main/section[2]/article[1]/div/div[2]/div/a/span[2]');
    await postAuthor.hover();
    await checkUnderlineOnHover(page, postAuthor, 'underline');
  })
})


