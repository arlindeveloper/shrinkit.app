const { test, expect, chromium } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
})

test.describe('Post Section Suite', () => {

    test.skip('verify that all the navigation bar elements are working properly', async ({ page }) => {

        //top nav bar logo is visible & clickable
        await expect(page.getByRole('navigation').getByRole('link', { name: 'Effortless Video Compression' })).toBeVisible();
        await page.getByRole('navigation').getByRole('link', { name: 'Effortless Video Compression' }).click();
        await page.getByLabel('Global').getByRole('link', { name: 'Blog' }).click();

        // home button is visible and clickable
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        await page.getByRole('link', { name: 'Home' }).click();
        await expect(page).toHaveURL('https://shrinkit.app/');
        await page.getByLabel('Global').getByRole('link', { name: 'Blog' }).click();

        // all post button to ve visible and clickable
        await expect(page.getByRole('link', { name: 'All Posts' })).toBeVisible();
        await page.getByRole('link', { name: 'All Posts' }).click();

        // categories dropdown button to be visible and display elements
        await expect(page.getByRole('button', { name: 'Categories' })).toBeVisible();
        await page.getByRole('button', { name: 'Categories' }).click();

        // categories dropdown button elements to be visble
        await expect(page.getByRole('link', { name: 'Announcements Stay up to date' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Features Latest features' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Tutorials Learn how to use' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Releases Stay up to date with' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Guides Quick guides to' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Toggle theme mode' })).toBeVisible();
        await page.getByRole('button', { name: 'Categories' }).click();

        //? each categories pages are visible and clickable and opening 
        //Announcements
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Announcements Stay up to date' }).click();
        await expect(page.getByRole('heading', { name: 'Announcements' })).toBeVisible();
        await expect(page.getByRole('heading')).toContainText('Announcements');

        //Features
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Features Latest features' }).click();
        await expect(page.getByRole('heading', { name: 'New Features' })).toBeVisible();
        await expect(page.getByRole('heading')).toContainText('New Features');

        //Tutorials
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Tutorials Learn how to use' }).click();
        await expect(page.getByRole('heading', { name: 'How Tos & Tutorials' })).toBeVisible();
        await expect(page.getByRole('heading')).toContainText('How Tos & Tutorials');

        //Releases
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Releases Stay up to date with' }).click();
        await expect(page.getByRole('heading', { name: 'Releases' })).toBeVisible();
        await expect(page.locator('h1')).toContainText('Releases');

        //Guides
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Guides Quick guides to' }).click();
        await expect(page.getByRole('heading', { name: 'Guides' })).toBeVisible();
        await expect(page.locator('h1')).toContainText('Guides');

        //TODO: to be fixed
        // dark or light theme button
        const homeButton = page.getByRole('link', { name: 'Home' }).click();
        const initialTextColor = await homeButton.evaluate(element => getComputedStyle(element).color)
        await page.getByRole('button', { name: 'Toggle theme mode' }).click();
        await page.waitForTimeout(2000);
        const finalTextColor = await homeButton.evaluate(element => getComputedStyle(element).color);
        console.log('Initial color:', initialTextColor);
        console.log('Final color:', hoveredTextColor);
        //await expect(finalTextColor).toEqual('rgb(19, 23, 27)');

    })

    test('verify that post section has a "Back to Blog" link button', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByRole('link', { name: 'Back to Blog' })).toBeVisible();
    })

    test('verify that link button has the text: "Back to Blog"', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByRole('main')).toContainText('Back to Blog');
    })

    test('verify that the "Back to Blog" link button takes you to the "Blog" page', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await page.getByRole('link', { name: 'Back to Blog' }).click();
        await expect(page.getByRole('heading', { name: 'Welcome to ShrinkIt Blog' })).toBeVisible();
        await expect(page.locator('h1')).toContainText('Welcome to ShrinkIt Blog');
    })

    test('verify that the post section has any of these categoies: "Announcements/Features/Tutorials/Releases/Guides"', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByRole('link', { name: 'Guides' })).toBeVisible();

    })

    test('verify that the post section has valid date', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByText('May 1,')).toBeVisible();
        await expect(page.getByRole('article')).toContainText('May 1, 2024');
    })

    test('verify that the post section has a title', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByRole('heading', { name: 'How to Convert Videos for' })).toBeVisible();
        await expect(page.locator('h1')).toContainText('How to Convert Videos for Twitter to Maximize Engagement');
    })

    test('verify that the post section has a descriptive subtitle', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByText('Learn how to optimize and')).toBeVisible();
        await expect(page.getByRole('article')).toContainText('Learn how to optimize and convert videos for Twitter to enhance visibility and boost engagement with specific steps and recommended tools.');
    })

    test('verify that the post section has a static image', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByRole('img', { name: 'Convert videos for Twitter' })).toBeVisible();
    })

    test('verify that the post section has the "Posted by" phrase', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByText('Posted by')).toBeVisible();
        await expect(page.getByRole('article')).toContainText('Posted by');
    })

    test('verify that the post section shows the "Author" avatar picture', async ({ page }) => {
        //TODO: incomplete
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByRole('link', { name: 'Avatar of Eddie Espinal Eddie' })).toBeVisible();
        await expect(page.getByRole('article')).toContainText('Eddie Espinal');
    })

    test('verify that the post has a section called: "Related reading"', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
        await expect(page.getByText('Related reading')).toBeVisible();
        await expect(page.getByRole('article')).toContainText('Related reading');
    })

    test('verify that the post has a "Try Shrinkit!" download button that takes you to the app store', async ({ page }) => {
        await page.getByRole('link', { name: 'How to Convert Videos for' }).first().click();
await expect(page.getByRole('link', { name: 'Mac App Store logo' })).toBeVisible();
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Mac App Store logo' }).click();
        const page1 = await page1Promise;

    })

    test('verify that all footer elements are working as expected', async ({ page }) => {

    })

})
