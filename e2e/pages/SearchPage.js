const { expect } = require('@playwright/test')

class SearchPage {
    constructor(page) {
        this.page = page
        this.searchButton = this.page.getByRole('button', { name: 'Show/Hide search' })
        this.searchBarField = this.page.getByRole('textbox', { name: 'Search' })
    }

    async clickOnSearchButton() {
        await this.searchButton.click()
    }

    async searchNameIsVisible() {
        const firstNameText = (await this.page.locator("table[class^='mantine-'] tr:first-child td:nth-child(2)")
            .textContent()).trim()
        console.log('First Name:', firstNameText)
        await this.clickOnSearchButton()
        await this.searchBarField.fill(firstNameText)
        await this.searchBarField.press('Enter')
        const firstName = await this.page.locator(`table[class^='mantine-'] tr:first-child td:nth-child(2):has-text("${firstNameText}")`)
        await expect(firstName).toHaveText(firstNameText, { timeout: 5000 })

    }

    async invalidNameIsNotVisible(invalidFirstName) {
        await this.clickOnSearchButton()
        await this.searchBarField.fill(invalidFirstName)
        await this.searchBarField.press('Enter')
        const table = this.page.locator("table[class^='mantine-']");
        await expect(table.getByText('No results found')).toBeVisible();
    }
}

module.exports = SearchPage;