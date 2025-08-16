const { expect } = require('@playwright/test');

class HideColumnsPage {
    constructor(page) {
        this.page = page;
    }

    checkColumnName(columnName) {
        return this.page.locator('table[class^="mantine-"] tr:first-child', { hasText: columnName });
    }

    getColumnMenuButton(columnName) {
        return this.page.locator('th div[class^="mantine"]').filter({ hasText: columnName })
            .locator('div button[aria-label="Column Actions"]');
    }

    clickOnHideColumnMenu(columnName) {
        return this.page.locator("div button[class^='mantine-']")
            .filter({ hasText: `Hide ${columnName} column` });
    }

    clickOnShowColumnMenu() {
        return this.page.locator("div button[class^='mantine-']")
            .filter({ hasText: 'Show all columns' });
    }

    async hideColumn(columnName) {
        await this.getColumnMenuButton(columnName).click();
        await this.clickOnHideColumnMenu(columnName).click();
    }

    async verifyColumnIsHidden(columnName) {
        await expect(this.checkColumnName(columnName)).toBeHidden();
    }

    async hideAndUnhideColumnVerify(columnName, colName2) {
        await this.hideColumn(columnName);
        await this.verifyColumnIsHidden(columnName);
        await this.getColumnMenuButton(colName2).click();
        await this.clickOnShowColumnMenu().click();
        await expect(this.checkColumnName(columnName)).toBeVisible();
    }
}


module.exports = HideColumnsPage;