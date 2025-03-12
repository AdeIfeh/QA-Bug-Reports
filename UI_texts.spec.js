// total withdrawal requests (text)
class WithdrawPage {
  constructor(page) {
      this.page = page;
  }

  get totalWithdrawalRequests() {
      return this.page.locator('h5.text-[#4E4E4E].font-[700].text-[24px]');
  }

  async navigate() {
      await this.page.goto('https://ardilla-retail-withdraw.vercel.app/dashboard/check-withdraw');
  }

  async getTotalWithdrawalRequestsText() {
      return await this.totalWithdrawalRequests.innerText();
  }
}

module.exports = WithdrawPage;

// tests/withdraw.test.js
const { test, expect } = require('@playwright/test');
const WithdrawPage = require('../pageObjects/WithdrawPage');

test.describe('Withdraw Page Tests', () => {
  let withdrawPage;

  test.beforeEach(async ({ page }) => {
      withdrawPage = new WithdrawPage(page);
      await withdrawPage.navigate();
  });

  test('should display correct total withdrawal requests', async () => {
      const totalRequests = await withdrawPage.getTotalWithdrawalRequestsText();
      expect(totalRequests).toBe('9');
  });

  test('should display total withdrawal requests as a number', async () => {
      const totalRequests = await withdrawPage.getTotalWithdrawalRequestsText();
      expect(Number(totalRequests)).toBeGreaterThan(0);
  });

  test('should have total withdrawal requests element visible', async () => {
      await expect(withdrawPage.totalWithdrawalRequests).toBeVisible();
  });

  test('should have correct styling for total withdrawal requests', async () => {
      const style = await withdrawPage.totalWithdrawalRequests.evaluate(el => getComputedStyle(el).fontWeight);
      expect(style).toBe('700');
  });
});

// pageObjects/WithdrawalPage.js
class WithdrawalPage {
  constructor(page) {
      this.page = page;
      this.approvedWithdrawalSelector = '.border-[1px]';
      this.totalWithdrawalTitleSelector = 'h1.text-[14px]';
      this.totalWithdrawalValueSelector = 'h5.text-[#4E4E4E]';
  }

  async navigate() {
      await this.page.goto('https://ardilla-retail-withdraw.vercel.app/dashboard/check-withdraw');
  }

  async getTotalWithdrawalTitle() {
      return await this.page.textContent(this.totalWithdrawalTitleSelector);
  }

  async getTotalWithdrawalValue() {
      return await this.page.textContent(this.totalWithdrawalValueSelector);
  }

  async isApprovedWithdrawalVisible() {
      return await this.page.isVisible(this.approvedWithdrawalSelector);
  }
}

// tests/withdrawal.test.js
const { test, expect } = require('@playwright/test');
const WithdrawalPage = require('../pageObjects/WithdrawalPage');

test.describe('Withdrawal Dashboard Tests', () => {
  let withdrawalPage;

  test.beforeEach(async ({ page }) => {
      withdrawalPage = new WithdrawalPage(page);
      await withdrawalPage.navigate();
  });

  test('should display approved withdrawal section', async () => {
      const isVisible = await withdrawalPage.isApprovedWithdrawalVisible();
      expect(isVisible).toBeTruthy();
  });

  test('should display correct total withdrawal title', async () => {
      const title = await withdrawalPage.getTotalWithdrawalTitle();
      expect(title).toBe('Total withdrawal approved');
  });

  test('should display correct total withdrawal value', async () => {
      const value = await withdrawalPage.getTotalWithdrawalValue();
      expect(value).toBe('3');
  });

  test('should have a numeric total withdrawal value', async () => {
      const value = await withdrawalPage.getTotalWithdrawalValue();
      expect(Number(value)).toBeGreaterThan(0);
  });
});


// withdrawal approved tests
class WithdrawalPage {
  constructor(page) {
      this.page = page;
  }

  get totalWithdrawalDeclinedHeader() {
      return this.page.locator('h1.text-[14px].font-[400].text-[#8F8F8F].mb-3');
  }

  get totalWithdrawalDeclinedCount() {
      return this.page.locator('h5.text-[#4E4E4E].font-[700].text-[24px]');
  }

  async getTotalWithdrawalDeclined() {
      return await this.totalWithdrawalDeclinedCount.textContent();
  }

  async getTotalWithdrawalDeclinedHeaderText() {
      return await this.totalWithdrawalDeclinedHeader.textContent();
  }
}

// withdrawal declined tests
const { test, expect } = require('@playwright/test');
const WithdrawalPage = require('../pageObjects/withdrawalPage');

test.describe('Withdrawal Page Tests', () => {
  let withdrawalPage;

  test.beforeEach(async ({ page }) => {
      withdrawalPage = new WithdrawalPage(page);
      await page.goto('https://ardilla-retail-withdraw.vercel.app/dashboard/check-withdraw');
  });

  test('Verify total withdrawal declined header text', async () => {
      const headerText = await withdrawalPage.getTotalWithdrawalDeclinedHeaderText();
      expect(headerText).toBe('Total withdrawal declined');
  });

  test('Verify total withdrawal declined count is displayed correctly', async () => {
      const countText = await withdrawalPage.getTotalWithdrawalDeclined();
      expect(countText).toBe('3');
  });

  test('Verify total withdrawal declined count is a number', async () => {
      const countText = await withdrawalPage.getTotalWithdrawalDeclined();
      expect(Number(countText)).toBeGreaterThanOrEqual(0);
  });

  test('Verify the total withdrawal declined count is not empty', async () => {
      const countText = await withdrawalPage.getTotalWithdrawalDeclined();
      expect(countText).not.toBe('');
  });
});