//const { expect } = require('@playwright/test');
const FilterPage = require('../pages/FilterPage')
const { expect } = require('@chromatic-com/playwright')

class SortingPage {
  constructor(page) {
    this.page = page;

    this.columnLocatorMap = {
      "First Name": "tbody[class^='mantine-'] tr td:nth-child(2)",
      "Last Name": "tbody[class^='mantine-'] tr td:nth-child(3)",
      "Address": "tbody[class^='mantine-'] tr td:nth-child(4)",
    };
  }

  getHeaderColumnName(columnName) {
    return this.page.locator('th div[class^="mantine"]').filter({ hasText: columnName })
      .locator('div button[aria-label="Column Actions"]');
  }

  clickOnColumnNameAscendingMenu(columnName) {
    return this.page.locator("div button[class^='mantine-']")
      .filter({ hasText: `Sort by ${columnName} ascending` })
  }

  clickOnColumnNameDescendingMenu(columnName) {
    return this.page.locator("div button[class^='mantine-']")
      .filter({ hasText: `Sort by ${columnName} descending` })
  }

  async getColumnValues(columnName) {
    const locatorStr = this.columnLocatorMap[columnName];
    if (!locatorStr) {
      throw new Error(`No locator defined for column: ${columnName}`);
    }
    const cells = this.page.locator(locatorStr);
    return (await cells.allTextContents()).map(v => v.trim());
  }

  async verifyColumnNameAscendingOrder(columnName) {
    await this.page.locator('th div[class^="mantine"]').filter({ hasText: columnName }).first().waitFor();
    const beforeValues = await this.getColumnValues(columnName)
    console.log('Before Sorting:', beforeValues);
    await this.getHeaderColumnName(columnName).click();
    await this.clickOnColumnNameAscendingMenu(columnName).click();
    const afterValues = await this.getColumnValues(columnName)
    console.log('After Sorting:', afterValues);
    const expectedSortedNames = [...beforeValues].sort((a, b) => a.localeCompare(b));
    console.log('Expected Sorted:', expectedSortedNames);
    expect(afterValues).toEqual(expectedSortedNames);
    return afterValues
  }

  async verifyColumnNameDescendingOrder(columnName) {
    await this.page.locator('th div[class^="mantine"]').filter({ hasText: columnName }).first().waitFor();
    const beforeValues = await this.getColumnValues(columnName)
    console.log('Before Sorting:', beforeValues);
    await this.getHeaderColumnName(columnName).click();
    await this.clickOnColumnNameDescendingMenu(columnName).click();
    const afterValues = await this.getColumnValues(columnName)
    console.log('After Sorting:', afterValues);
    const sortedNames = [...beforeValues].sort((a, b) => b.localeCompare(a))
    console.log('Expected Sorted:', sortedNames);
    expect(afterValues).toEqual(sortedNames)
  }

  async verifySortingRetentionAfterFilter(columnName, filterPage) {
    const ascendValues = await this.verifyColumnNameAscendingOrder(columnName)
    await filterPage.validFilterColumn(columnName)
    await this.page.locator('div button[title="Clear filter"]').click()
    const afterClearValues = await this.page.locator(this.columnLocatorMap[columnName]).allTextContents();
    expect(afterClearValues).toEqual(ascendValues);
    console.log(afterClearValues)
  }

}


module.exports = SortingPage;
