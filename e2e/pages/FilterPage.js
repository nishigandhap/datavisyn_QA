const { expect } = require('@playwright/test');

class FilterPage {
    constructor(page) {
        this.page = page;
        this.filterButton = this.page.getByRole('button', { name: 'Show/Hide filters' })
        this.rowValue = this.page.locator("table[class^='mantine-'] tr:first-child td:nth-child(2)")

        this.columnLocatorMap = {
            "First Name": "tbody[class^='mantine-'] tr td:nth-child(2)",
            "Last Name": "tbody[class^='mantine-'] tr td:nth-child(3)",
            "Address": "tbody[class^='mantine-'] tr td:nth-child(4)",
        };
    }

    filterInput(columnNameValue) {
        return this.page.getByRole('textbox', { name: `Filter by ${columnNameValue}` })
    }

    async clickOnFilterButton() {
        await this.filterButton.click();
    }

    async validFilterColumn(columnNameValue) {
        await this.page.locator('th div[class^="mantine"]')
            .filter({ hasText: columnNameValue }).first().waitFor();

        const rowValues = await this.page.locator(this.columnLocatorMap[columnNameValue]).allTextContents();
        const firstRowValue = rowValues[0];
        console.log(firstRowValue)
        await this.clickOnFilterButton();
        await this.filterInput(columnNameValue).fill(firstRowValue)
        await this.filterInput(columnNameValue).press('Enter')
        await this.page.waitForTimeout(500)
        const filteredValues = await this.page.locator(this.columnLocatorMap[columnNameValue]).allTextContents();
        filteredValues.forEach(value => expect(value).toContain(firstRowValue))
    }

    async invalidFilterColumn(columnName, invalidFirstName) {
        await this.clickOnFilterButton()
        await this.filterInput(columnName).fill(invalidFirstName)
        await this.filterInput(columnName).press('Enter')
        const table = this.page.locator("table[class^='mantine-']");
        await expect(table.getByText('No results found')).toBeVisible();
    }

}

module.exports = FilterPage;