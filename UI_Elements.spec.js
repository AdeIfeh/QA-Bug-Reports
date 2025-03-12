// pageObject.js
class Navbar {
  constructor(page) {
      this.page = page;
      this.titleSelector = 'h1.text-[#8F8F8F]';
      this.avatarSelector = 'div.bg-[#FE3C3C]';
      this.toggleButtonSelector = 'button[data-sidebar=trigger]';
  }

  async getTitleText() {
      return await this.page.textContent(this.titleSelector);
  }

  async clickAvatar() {
      await this.page.click(this.avatarSelector);
  }

  async clickToggleButton() {
      await this.page.click(this.toggleButtonSelector);
  }

  async isAvatarVisible() {
      return await this.page.isVisible(this.avatarSelector);
  }

  async isToggleButtonVisible() {
      return await this.page.isVisible(this.toggleButtonSelector);
  }
}

// navbar.test.js
const { test, expect } = require('@playwright/test');
const Navbar = require('./pageObject');

test.describe('Navbar Tests', () => {
  let navbar;

  test.beforeEach(async ({ page }) => {
      await page.goto('https://ardilla-retail-withdraw.vercel.app/dashboard/check-withdraw');
      navbar = new Navbar(page);
  });

  test('should display correct title', async () => {
      const titleText = await navbar.getTitleText();
      expect(titleText).toBe('Ardilla admin withdrawal');
  });

  test('should display avatar', async () => {
      const isVisible = await navbar.isAvatarVisible();
      expect(isVisible).toBe(true);
  });

  test('should display toggle button', async () => {
      const isVisible = await navbar.isToggleButtonVisible();
      expect(isVisible).toBe(true);
  });

  test('should click avatar', async () => {
      await navbar.clickAvatar();
      // Add assertion based on expected behavior after clicking the avatar
  });

  test('should click toggle button', async () => {
      await navbar.clickToggleButton();
      // Add assertion based on expected behavior after clicking the toggle button
  });
});