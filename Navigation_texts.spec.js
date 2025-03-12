// pageObjects/checkWithdrawPage.js
class CheckWithdrawPage {
  constructor(page) {
      this.page = page;
      this.sidebarMenu = page.locator('[data-sidebar=menu]');
      this.checkWithdrawaLink = page.locator('a[href="/dashboard/check-withdraw"]');
      this.initiateWithdrawaLink = page.locator('a[href="/dashboard/initiate-withdraw"]');
  }

  async navigateToCheckWithdraw() {
      await this.checkWithdrawLink.click();
  }

  async assertCheckWithdrawLinkVisible() {
      await this.checkWithdrawLink.isVisible();
  }

  async assertInitiateWithdrawLinkVisible() {
      await this.initiateWithdrawLink.isVisible();
  }
}

// tests/checkWithdraw.test.js
const { test, expect } = require('@playwright/test');
const CheckWithdrawPage = require('../pageObjects/checkWithdrawPage');

test.describe('Check Withdraw Page Tests', () => {
  let checkWithdrawPage;

  test.beforeEach(async ({ page }) => {
      checkWithdrawPage = new CheckWithdrawPage(page);
      await page.goto('https://ardilla-retail-withdraw.vercel.app/dashboard/check-withdraw');
  });

  test('Check if Check Withdraw link is visible', async () => {
      await checkWithdrawPage.assertCheckWithdrawLinkVisible();
  });

  test('Check if Initiate Withdraw link is visible', async () => {
      await checkWithdrawPage.assertInitiateWithdrawLinkVisible();
  });

  test('Navigate to Check Withdraw page', async () => {
      await checkWithdrawPage.navigateToCheckWithdraw();
      await expect(checkWithdrawPage.checkWithdrawLink).toBeVisible();
  });
});