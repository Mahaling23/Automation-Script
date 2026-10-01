import { test, expect } from '@playwright/test';

test('HBANKOM - Complete Insurance Journey', async ({ page }) => {

    // =========================================================
    // 1. Open Instainsure
    // =========================================================
    await page.goto('https://instainsure-uat.apps-hdfclife.com/?source=HBANKOM');
    await page.getByTestId('eligibilityBtn').click();
    await page.waitForLoadState('load');
    // =========================================================
    // 2. Customer Basic Details
    // =========================================================
    await page.getByTestId('opmk-form-phoneno').fill('9903383123');
    await page.locator('input[name="day"]').click();
    await page.locator('input[name="day"]').fill('12');
    await page.locator('input[name="month"]').fill('12');
    await page.getByRole('spinbutton', { name: '----' }).fill('1987');
    await page.locator('.family-photo-wrapper').click();
    await page.locator('label').nth(2).click();
    await page.getByTestId('opmk-proceed-btn').click();

    // =========================================================
    // 3. PAN / Financial Details
    // =========================================================
    await page.getByRole('combobox').selectOption('M');
    await page.getByRole('textbox', { name: 'e.g. ABCDE1234F' }).fill('JHHSE7564G');
    await page.getByRole('spinbutton', { name: 'e.g. 400001' }).fill('400001');
    await page.getByRole('spinbutton', { name: 'e.g. 500000' }).fill('1231231');
    await page.getByRole('button', { name: 'Confirm & send OTP' }).click();

    // =========================================================
    // 4. OTP
    // =========================================================
    const otp = ['1', '2', '3', '4', '5', '6'];
    const otpFields = [page.getByRole('textbox', { name: 'Please enter verification' }), page.getByRole('textbox', { name: 'Digit 2' }), page.getByRole('textbox', { name: 'Digit 3' }), page.getByRole('textbox', { name: 'Digit 4' }), page.getByRole('textbox', { name: 'Digit 5' }), page.getByRole('textbox', { name: 'Digit 6' })];

    for (let i = 0; i < otpFields.length; i++) {
        await otpFields[i].fill(otp[i]);
    }

    await page.getByRole('button', { name: 'Submit' }).click();


    // =========================================================
    // 5. Profile Details
    // =========================================================
    await page.waitForLoadState('load');
    await expect(page).toHaveURL('https://instainsure-uat.apps-hdfclife.com/open-market/form/HBANKOM/WP');
    await page.getByTestId('opmk-form-occupation').first().selectOption('salaried');
    await page.getByTestId('opmk-form-occupation').nth(1).selectOption('Graduate');
    await page.locator('#Selector').first().selectOption('MARRIED');
    await page.getByTestId('opmk-form-dependent-members').selectOption('2');
    await page.getByTestId('opmk-form-existing-insurance-policies').selectOption('2');
    await page.getByText('NO').nth(2).click();
    await page.getByTestId('opmk-proceed-btn').click();

    // =========================================================
    // 6. Suitability Questions
    // =========================================================
    await page.waitForLoadState('load');
    //await expect(page).toHaveURL('https://instainsure-uat.apps-hdfclife.com/open-market/form/HBANKOM/WP');
    //await page.waitForEvent('load');
    await page.getByTestId('opmk-form-primary-objective').selectOption('onlyProtection');
    await page.getByTestId('opmk-proceed-btn').click();
    
    // =========================================================
    // 7. Offers Page
    // =========================================================
    await page.waitForLoadState('load');
    await page.goto('https://instainsure-uat.apps-hdfclife.com/open-market/offers/HBANKOM/WP/dW5kZWZpbmVk');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Buy Now' }).nth(1).click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'PROCEED' }).click();

    // =========================================================
    // 8. Basic Details
    // =========================================================
    // await expect(page).toHaveURL('https://instainsure-uat.apps-hdfclife.com/basic-details/C2A/HBANKOM/NW5xN0RxanFZS3BScnZlSnd1UmN5');
    await page.waitForLoadState('load');
    await expect(page1.getByRole('heading', { name: 'Basic Details', exact: true })).toBeVisible();

    await page1.getByRole('textbox', { name: 'Enter father\'s full name' }).click();
    await page1.getByRole('textbox', { name: 'Enter father\'s full name' }).fill('POASA NAMINEe');
    //await page1.locator('#Selector').first().selectOption('MARRIED');
    await page1.locator('#Selector').first().selectOption('5');
    await page1.locator('[id="0"]').selectOption('6');
    await page1.getByRole('textbox', { name: '0' }).click();
    await page1.getByRole('textbox', { name: '0' }).fill('75');
    await page1.locator('#ga_basic_tobacco_yes').click();
    await page1.getByTestId('opmk-form-occupation').nth(1).selectOption('TT_BD');
    await page1.locator('input[name="tobaccoConsume"]').click();
    await page1.locator('input[name="tobaccoConsume"]').fill('9');
    await page1.locator('#Selector').selectOption('Information Technology');
    await page1.locator('#Selector').selectOption('Manager');
    await page1.getByRole('textbox', { name: 'Employer/Business Name' }).click();
    await page1.getByRole('textbox', { name: 'Employer/Business Name' }).fill('Hdfc Life');
    await page1.getByRole('textbox', { name: 'Employer/Business Pincode' }).click();
    await page1.getByRole('textbox', { name: 'Employer/Business Pincode' }).fill('400001');
    await page1.getByRole('button', { name: 'PROCEED' }).click();

    // =========================================================
    // 9. Plan Details Page
    // =========================================================
    await page1.locator('div:nth-child(2) > ._ui-accordion-wrapper > .accordion-title-custom').click();
    await page1.locator('.input-range__track.input-range__track--active').first().click();
    await page1.getByRole('button', { name: 'PROCEED' }).click();

    // =========================================================
    // 10. Declaration Page
    // =========================================================
    await page
     page1.waitForLoadState('load');
    await page1.getByRole('heading', { name: 'My Declarations' }).click();
    await page1.locator('span').nth(1).click();
    await page1.getByRole('button', { name: 'PROCEED' }).click();

    // =========================================================
    // 11. Nominee Details
    // =========================================================
    await page1.locator('#Selector').first().selectOption('mr');
    await page1.getByRole('textbox', { name: 'Full Name' }).fill('Mayaa Shinde');
    await page1.locator('input[name="day"]').fill('05');
    await page1.locator('input[name="month"]').fill('06');
    await page1.getByRole('spinbutton', { name: '----' }).fill('1950');
    await page1.getByRole('spinbutton', { name: '0' }).fill('100');
    await page1.locator('#Selector').last().selectOption('father');
    await page1.getByRole('button', { name: 'Save' }).click();

    // =========================================================
    // 12. Proceed
    // =========================================================
    await page1.getByRole('button', { name: 'PROCEED' }).click();

    // Payment Page

    await page1.locator('label').click();
    const downloadPromise = page1.waitForEvent('download');
    await page1.getByRole('button', { name: 'Download Illustration' }).click();
    const download = await downloadPromise;
    //   await page1.locator('label').nth(1).click();
    //   await page1.getByRole('button', { name: 'Submit Application & Pay Now' }).click();
    //   await page1.getByText('Proceed', { exact: true }).click();
    //   //await page1.goto('https://onlineinsuranceuat.hdfclife.com/PaymentPage?&app=fXb56592207uO&prodcd=C2ACH&source=&agentcode=&finalize=N');
    //   await page1.waitForLoadState('load');
    //   await expect(page1.getByRole('button', { name: 'PROCEED TO PAYMENT', exact: true })).toBeVisible();
    // })

    // =========================================================
    // Submit Application & Pay Now
    // =========================================================

    await page1.locator('label').nth(1).click();

    await page1.getByRole('button', { name: 'Submit Application & Pay Now', exact: true }).click();

    // =========================================================
    // Capture Payment Page Popup
    // =========================================================

    await page1.waitForLoadState('load');
    //const page2Promise = page1.waitForEvent('popup');

    await page1.getByText('Proceed', { exact: true }).click();

    //const page2 = await page2Promise;

    await page1.waitForLoadState('load');

    // =========================================================
    // Verify Payment Page
    // =========================================================

    // const paymentButton = page2.getByRole('button', { name: 'PROCEED TO PAYMENT',exact: true});

    // await expect(paymentButton).toBeVisible();

    // console.log('PROCEED TO PAYMENT button is displayed.');
    // const paymentText = page1.getByText('PROCEED TO PAYMENT', {
    //     exact: true
    //});


    // if (await paymentText.isVisible()) {
    //     console.log('PASS: PROCEED TO PAYMENT text is displayed.');
    // } else {
    //     console.log('FAIL: PROCEED TO PAYMENT text is not displayed.');
    // }

    // await expect(paymentText).toBeVisible();
});