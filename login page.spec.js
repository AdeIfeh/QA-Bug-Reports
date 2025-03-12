// validating for both negative and positive assertions using pageObject
// PageObject.test.js

/*class LoginPage {
  constructor(page) {
      this.page = page;
      this.emailInput = 'input[name="email"]';
      this.passwordInput = 'input[name="password"]';
      this.continueButton = 'button[type="button"]:has-text("Continue")';
      this.emailError = 'span.text-red-400:nth-of-type(1)';
      this.passwordError = 'span.text-red-400.text-sm';
  }

  async enterEmail(email) {
      await this.page.fill(this.emailInput, email);
  }

  async enterPassword(password) {
      await this.page.fill(this.passwordInput, password);
  }

  async clickContinue() {
      await this.page.click(this.continueButton);
  }

  async getEmailError() {
      return this.page.textContent(this.emailError);
  }

  async getPasswordError() {
      return this.page.textContent(this.passwordError);
  }
}

// validating Login.test.js
const { test, expect } = require('@playwright/test');
//const LoginPage = require('./pageObject');

test.describe('Login Page Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://ardilla-retail-withdraw.vercel.app/');
    });

    test('should show error for empty email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.enterPassword('heaphe');
        await loginPage.clickContinue();
        expect(await loginPage.getEmailError()).toContain('required');
    });

    test('should show error for empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.enterEmail('iadebayoelizabeth@gmail.com');
        await loginPage.clickContinue();
        expect(await loginPage.getPasswordError()).toContain("required");

    });

    test('should show error for invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.enterEmail('iadebayoelizabethgmail.com');
        await loginPage.enterPassword('heaphe');
        await loginPage.clickContinue();
        expect(await loginPage.getEmailError()).toContain('Invalid email');
    });

    test('should proceed to next step with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.enterEmail('iadebayoelizabeth@gmail.com');
        await loginPage.enterPassword('heaphe');
        await loginPage.clickContinue();

        // ✅ Correct assertion for successful navigation
        await expect(page).toHaveURL('https://ardilla-retail-withdraw.vercel.app/'); 
        
    });

});*/

// For Only Positive assertions
import { test, expect } from '@playwright/test';

test('login page', async ({page}) =>{

    //validating for text input fields
page.goto('https://ardilla-retail-withdraw.vercel.app/')

await page.fill('input[name="email"]', 'iadebayoelizabeth@gmail.com')
await page.fill('input[name="password"]', 'heaphe')
await page.click('button[type="button"]:has-text("Continue")');

//validating for the next page, timeout and close of the page
await expect(page).toHaveURL('https://ardilla-retail-withdraw.vercel.app/')
await page.waitForTimeout(5000)
await page.close()
});
