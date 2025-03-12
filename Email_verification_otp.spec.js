// pageObject.js
class EmailVerificationPage {
    constructor(page) {
        this.page = page;
        this.otpInput = 'input[data-input-otp=true]';
        this.continueButton = 'button[type=submit]';
        this.resendButton = 'button:text("Resend")';
        this.errorMessage = 'span.text-red-400';
    }

    async enterOTP(otp) {
        await this.page.typ(this.otpInput, otp);
    }

    async clickContinue() {
        await this.page.click(this.continueButton);
    }

    async clickResend() {
        await this.page.click(this.resendButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
}

// emailVerification.spec.js
const { test, expect } = require('@playwright/test');
//const EmailVerificationPage = require('./pageObject');

test.describe('Email Verification Tests', () => {
    let emailVerificationPage;

    test.beforeEach(async ({ page }) => {
        emailVerificationPage = new EmailVerificationPage(page);
        await page.goto('https://ardilla-retail-withdraw.vercel.app/');
    });

    test('should enter OTP and click continue', async () => {
        await emailVerificationPage.enterOTP('9931560');
        await emailVerificationPage.clickContinue();
        // Add assertion for successful navigation or action after clicking continue
        await expect(page).toHaveURL('https://ardilla-retail-withdraw.vercel.app/dashboard');
    });

    test('should show error message for invalid OTP', async () => {
        await emailVerificationPage.enterOTP('invalid');
        await emailVerificationPage.clickContinue();
        const errorMessage = await emailVerificationPage.getErrorMessage();
        expect(errorMessage).toBe('Invalid OTP');
    });

    test('should resend OTP when clicked', async () => {
        await emailVerificationPage.clickResend();
        // Add assertion to verify OTP was resent, e.g. checking for a success message
        const successMessage = await emailVerificationPage.getSuccessMessage();
        expect(successMessage).toBe("Cannot read properties of undefined (reading 'code')");
    });

    test('should disable continue button when OTP is empty', async () => {
        await emailVerificationPage.enterOTP('');
        const isDisabled = await emailVerificationPage.page.isDisabled(emailVerificationPage.continueButton);
        expect(isDisabled).toBe(true);
    });
});