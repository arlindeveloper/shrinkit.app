const { test, expect, chromium } = require('@playwright/test')

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



test.describe('Navigation Bar Items', () => {

    test('Verify that the "Home" button is visible', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    })

    
    test('Verify that the "Home" button is underlined when hovering the mouse over it', async ({ page }) => {
        const homeButton = page.getByRole('link', { name: 'Home' });
        await homeButton.hover();
        
        await checkUnderlineOnHover(page, homeButton, 'underline');
    })

    test('Verify that the "Home" button has the text: "Home"', async ({ page }) => {
        await expect(page.getByRole('navigation')).toContainText('Home');
    })

    test('Verify that the "Home" button leads you to the "Home" page when clicked', async ({ page }) => {
        await page.getByRole('link', { name: 'Home' }).click();
        await expect(page).toHaveURL('https://shrinkit.app/');
        await expect(page.getByRole('heading', { name: 'Effortless video compression' }))
            .toContainText('Effortless video compression for Mac');
    })

    test('Verify that the "All Posts" button is visible', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'All Posts' })).toBeVisible();
    })

    
    test('Verify that the "All Posts" button is underlined when hovering the mouse over it', async ({ page }) => {
        const allPostButton = page.getByRole('link', { name: 'All Posts' });
        await allPostButton.hover();
        
        //function to check if an element is underlined when hovered
        await checkUnderlineOnHover(page, allPostButton, 'underline');

    })

    test('Verify that the "All Posts" button has the text: "All Posts"', async ({ page }) => {
        await expect(page.getByRole('navigation')).toContainText('All Posts');
    })

    test('Verify that the "All Posts" button leads you to the "All Posts" page when clicked', async ({ page }) => {
        await page.getByRole('link', { name: 'All Posts' }).click();
        await expect(page).toHaveURL('https://shrinkit.app/blog');
        await expect(page.getByRole('heading', { name: 'Welcome to ShrinkIt Blog' }))
            .toContainText('Welcome to ShrinkIt Blog');
    })

    test('Verify that the "Categories" dropdown button is visible', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Categories' })).toBeVisible();
        await expect(page.locator('[id="headlessui-popover-button-\\:r2\\:"]')).toContainText('Categories');
    })

    test('Verify that the "Categories" dropdown has the category: "Announcements"', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.getByRole('link', { name: 'Announcements Stay up to date' })).toBeVisible();
    })

    test('Verify that the category: "Announcements" opens the "Announcements" page when clicked', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Announcements Stay up to date' }).click();
        await expect(page.getByRole('heading', { name: 'Announcements' })).toBeVisible();
        await expect(page.getByRole('heading')).toContainText('Announcements');

    })

    test('Verify that the category "Announcements" has de description: "Stay up to date with the latest announcements from ShrinkIt."', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]'))
            .toContainText('Stay up to date with the latest announcements from ShrinkIt.');
    })

    test('Verify that the "Categories" dropdown has the category: "Features"', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.getByRole('link', { name: 'Features Latest features' })).toBeVisible();

    })

    test('Verify that the category: "Features" opens the "Features" page when clicked', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Features Latest features' }).click();
        await expect(page.locator('//html/body/div[1]/main/section[1]/h1')).toContainText('New Features');
        await expect(page.getByRole('main')).toContainText('Here are the latest features we\'ve added to ShrinkIt.');

    })

    test('Verify that the category: "Features" has the description: "Latest features added to ShrinkIt."', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.getByRole('link', { name: 'Features Latest features' }))
            .toContainText('Latest features added to ShrinkIt.');


    })

    test('Verify that the "Categories" dropdown has the category: "Tutorials"', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.getByRole('link', { name: 'Tutorials Learn how to use' })).toBeVisible();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]')).toContainText('Tutorials');

    })


    test('Verify that the category: "Tutorials" has the description: "Learn how to use ShrinkIt with these step-by-step tutorials."', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]'))
            .toContainText('Learn how to use ShrinkIt with these step-by-step tutorials.');

    })

    test('Verify that the "Categories" dropdown has the category: "Releases"', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.getByRole('link', { name: 'Releases Stay up to date with' })).toBeVisible();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]')).toContainText('Releases');
    })

    test('Verify that the category: "Releases" opens the "Releases" page when clicked', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Releases Stay up to date with' }).click();
        await expect(page.locator('h1')).toContainText('Releases');
        await expect(page.getByRole('heading', { name: 'Releases' })).toBeVisible();
    })

    test('Verify that the category: "Releases" has the description: "Stay up to date with the latest releases of ShrinkIt."', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]'))
            .toContainText('Stay up to date with the latest releases of ShrinkIt.');
    })

    test('Verify that the "Categories" dropdown has the category: "Guides"', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.getByRole('link', { name: 'Guides Quick guides to' })).toBeVisible();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]')).toContainText('Guides');

    })

    test('Verify that the category: "Guides" opens the "Guides" page when clicked', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('link', { name: 'Guides Quick guides to' }).click();
        await expect(page.getByRole('heading', { name: 'Guides' })).toBeVisible();
        await expect(page.locator('h1')).toContainText('Guides');
    })

    test('Verify that the category: "Guides" has the description: "Quick guides to effectively compress and optimize videos."', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(page.locator('[id="headlessui-popover-panel-\\:r2\\:"]'))
            .toContainText('Quick guides to effectively compress and optimize videos.');
    })


    test('Verify when clicking outside the expanded dropdown closes it', async ({ page }) => {
        await page.getByRole('button', { name: 'Categories' }).click();
        const dropDown = page.locator('[id="headlessui-popover-panel-\\:r2\\:"] div')
            .filter({ hasText: 'AnnouncementsStay up to date' }).nth(1);
        await expect(dropDown).toBeVisible();
        await page.getByRole('button', { name: 'Categories' }).click();
        await expect(dropDown).toBeHidden();
        await page.pause();

    })





})


