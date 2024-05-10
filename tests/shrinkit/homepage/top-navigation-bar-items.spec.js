const { test, expect, chromium } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
    await page.goto('/');
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


test.describe('Top Navigation Bar Items  ', async () => {

    test('Verify that the MOV logo is clickable and takes you to the Homepage', async ({ page }) => {
        const movLogo = page.locator('img.w-10[class="w-10"]');
        await movLogo.isVisible();
        await movLogo.click();
        await expect(page).toHaveURL('https://shrinkit.app/');
    })

    test('Verify that the ShrinkIt logo is clickable and takes you to the Homepage', async ({ page }) => {
        const shrinkItLogo = page.locator('//html/body/header/nav/div[1]/a/img[2]');
        await shrinkItLogo.isVisible();
        await shrinkItLogo.click();
        await expect(page).toHaveURL('https://shrinkit.app/');
    })

    test('Verify clicking on the "Blog" button will open the "Blog" page', async ({ page }) => {
        const blogTitle = page.locator('//h1[contains(text() ,"Welcome to ShrinkIt Blog")]');
        const blogButton = page.getByLabel('Global').getByRole('link', { name: 'Blog' });
        await blogButton.click();
        await expect(page).toHaveURL('https://shrinkit.app/blog');
        await expect(blogTitle).toHaveText('Welcome to ShrinkIt Blog');
    })

    test('Verify clicking on the "Features" button will take you to the "Features" section.', async ({ page }) => {
        const featuresButton = page.getByLabel('Global').getByRole('link', { name: 'Features' });
        const featuresTitle = page.locator('#features');
        await featuresButton.click();
        await expect(page).toHaveURL('https://shrinkit.app/#features');
        await expect(featuresTitle).toContainText('Streamline your videos with ShrinkIt\'s suite of features');
    })

    test('Verify clicking on the "Demo" button will take you to the "Demo" section.', async ({ page }) => {
        const demoButton = page.locator('//html/body/header/nav/div[3]/a[3]');
        const demoTitle = page.locator('//h2[contains(text(), "See ShrinkIt in Action")]');
        await demoButton.click();
        await expect(page).toHaveURL('https://shrinkit.app/#demo');
        await expect(demoTitle).toHaveText("See ShrinkIt in Action");
    })

    test('Verify clicking on the "Reviews" button will take you to the "Reviews" section.', async ({ page }) => {
        const reviewsButton = page.getByLabel('Global').getByRole('link', { name: 'Reviews' });
        const reviewsTitle = page.getByRole('heading', { name: 'Join 50K+ users enjoying' });
        await reviewsButton.click();
        await expect(page).toHaveURL('https://shrinkit.app/#testimonials');
        await expect(reviewsTitle).toHaveText("Join 50K+ users enjoying ShrinkIt!");
    })

    test('Verify clicking on the "FAQ" button will take you to the "FAQ" section.', async ({ page }) => {
        const faqButton = page.getByLabel('Global').getByRole('link', { name: 'FAQ' });
        const faqTitle = page.getByText('Frequently Asked Questions');
        await faqButton.click();
        await expect(page).toHaveURL('https://shrinkit.app/#faq');
        await expect(faqTitle).toHaveText("Frequently Asked Questions");
        await page.pause();
    })


    test('Verify that the "Blog" page button is underlined after hovering over it', async ({ page }) => {
        const blogButton = page.getByLabel('Global').getByRole('link', { name: 'Blog' });
        await blogButton.hover();

        //function to check if an element is underlined when hovered
        await checkUnderlineOnHover(page, blogButton, 'underline');
    })

    test('Verify that the "Features" page button is underlined after hovering over it', async ({ page }) => {
        const featuresButton = page.getByLabel('Global').getByRole('link', { name: 'Features' });
        await featuresButton.hover();

        //function to check if an element is underlined when hovered
        await checkUnderlineOnHover(page, featuresButton, 'underline');
    })

    test('Verify that the "Demo" page button is underlined after hovering over it', async ({ page }) => {
        const demoButton = page.locator('//html/body/header/nav/div[3]/a[3]');
        await demoButton.hover();

        //function to check if an element is underlined when hovered
        await checkUnderlineOnHover(page, demoButton, 'underline');
    })

    test('Verify that the "Reviews" page button is underlined after hovering over it', async ({ page }) => {
        const reviewsButton = page.getByLabel('Global').getByRole('link', { name: 'Reviews' });
        await reviewsButton.hover();

        //function to check if an element is underlined when hovered
        await checkUnderlineOnHover(page, reviewsButton, 'underline');
    })

    test('Verify that the "FAQ" page button is underlined after hovering over it', async ({ page }) => {
        const faqButton = page.getByLabel('Global').getByRole('link', { name: 'Reviews' });
        await faqButton.hover();

        //function to check if an element is underlined when hovered
        await checkUnderlineOnHover(page, faqButton, 'underline');
    })

})



