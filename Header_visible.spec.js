// pageObjects/Header.js
class Header {
  constructor(page) {
      this.page = page;
      this.logoSelector = 'div[data-sidebar="header"] img';
  }

  async isLogoVisible() {
      return await this.page.isVisible(this.logoSelector);
  }

  async getLogoAltText() {
      return await this.page.getAttribute(this.logoSelector, 'alt');
  }
}

module.exports = Header;

// tests/header.test.js
const { test, expect } = require('@playwright/test');
const Header = require('../pageObjects/Header');

test.describe('Header Tests', () => {
  let header;

  test.beforeEach(async ({ page }) => {
      await page.goto('https://ardilla-retail-withdraw.vercel.app/dashboard/check-withdraw');
      header = new Header(page);
  });

  test('should display the logo in the header', async () => {
      const isVisible = await header.isLogoVisible();
      expect(isVisible).toBe(true);
  });

  test('should have the correct alt text for the logo', async () => {
      const altText = await header.getLogoAltText();
      expect(altText).toBe('logo');
  });
});