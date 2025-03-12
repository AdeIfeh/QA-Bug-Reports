

const { test, expect } = require('@playwright/test');
const WithdrawPage = require('./pageObject');

test.describe('Withdraw Page Tests', () => {
  let withdrawPage;

  test.beforeEach(async ({ page }) => {
    withdrawPage = new WithdrawPage(page);
    await withdrawPage.navigate();
  });

  test('Verify Pending Withdrawals Tab', async () => {
    await withdrawPage.clickPendingTab();
    const rowCount = await withdrawPage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Verify Approved Withdrawals Tab', async () => {
    await withdrawPage.clickApprovedTab();
    const rowCount = await withdrawPage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Verify Declined Withdrawals Tab', async () => {
    await withdrawPage.clickDeclinedTab();
    const rowCount = await withdrawPage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Approve a Pending Withdrawal', async () => {
    await withdrawPage.clickPendingTab();
    const initialRowCount = await withdrawPage.getRowCount();
    await withdrawPage.approveWithdraw(0);
    const newRowCount = await withdrawPage.getRowCount();
    expect(newRowCount).toBeLessThan(initialRowCount);
  });

  test('Decline a Pending Withdrawal', async () => {
    await withdrawPage.clickPendingTab();
    const initialRowCount = await withdrawPage.getRowCount();
    await withdrawPage.declineWithdraw(0);
    const newRowCount = await withdrawPage.getRowCount();
    expect(newRowCount).toBeLessThan(initialRowCount);
  });

  test('Verify Row Data in Pending Tab', async () => {
    await withdrawPage.clickPendingTab();
    const rowData = await withdrawPage.getRowData(0);
    expect(rowData.name).toBeTruthy();
    expect(rowData.date).toMatch(/\d{1,2}[a-z]{2} \w{3}, \d{4}/);
    expect(rowData.accountInfo).toBeTruthy();
    expect(rowData.bank).toBeTruthy();
    expect(rowData.amount).toMatch(/^NGN\s*\d{1,3}(,\d{3})*(\.\d{2})?$/);
    expect(rowData.daysLeft).toMatch(/^\d+\s*days$/);
  });
});