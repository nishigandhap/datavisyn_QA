//const { expect } = require('@playwright/test');
const { expect } = require('@chromatic-com/playwright')

const { valid, invalid } = require('../fixtures/custom-fixtures');
const { ValidCity, ValidState, ValidZip, ValidPhone } = valid;
const { InvalidCity, InvalidState, InvalidZip, InvalidPhone } = invalid;


class ExpandColumnsPage {
    constructor(page) {
        this.page = page;
        this.expandButton = this.page.getByRole('button', { name: 'Expand all' })
        this.rows = page.locator("table[class^='mantine-'] tbody tr");
    }

    async clickOnExpandButton() {
        await this.expandButton.click();
    }

    async verifyValidExpandedColumnDataFormat() {

        await this.clickOnExpandButton();
        const rowCount = await this.rows.count();
        let hasError = false;

        for (let i = 0; i < rowCount; i++) {
            const spans = this.rows.nth(i).locator('td div span');
            const spanCount = await spans.count();

            if (spanCount === 4) {
                const labels = ['City', 'State', 'Zip', 'Phone'];
                const patterns = [ValidCity, ValidState, ValidZip, ValidPhone];

                for (let j = 0; j < 4; j++) {
                    const text = (await spans.nth(j).textContent() || '').trim();
                    const value = text.replace(`${labels[j]}:`, '').trim();

                    if (!patterns[j].test(value)) {
                        console.error(` Row ${i + 1} - ${labels[j]} value "${value}" does not match expected format.`);
                        hasError = true;
                    } else {
                        console.log(` Row ${i + 1} - ${labels[j]} OK: "${value}"`);
                    }
                }
            }
        }
        if (hasError) {
            throw new Error("Some rows have invalid data formats. Check the logs above.");
        }
    }

    async verifyInvalidExpandedColumnDataFormat() {
        await this.clickOnExpandButton();

        const rowCount = await this.rows.count();
        let hasError = false;

        for (let i = 0; i < rowCount; i++) {
            const spans = this.rows.nth(i).locator('td div span');
            const spanCount = await spans.count();

            if (spanCount === 4) {
                const labels = ['City', 'State', 'Zip', 'Phone'];
                const patterns = [InvalidCity, InvalidState, InvalidZip, InvalidPhone];

                for (let j = 0; j < 4; j++) {
                    const text = (await spans.nth(j).textContent() || '').trim();
                    const value = text.replace(`${labels[j]}:`, '').trim();

                    if (patterns[j].test(value)) {
                        console.error(` Row ${i + 1} - ${labels[j]} value "${value}" matches INVALID format!`);
                        hasError = true;
                    } else {
                        console.log(` Row ${i + 1} - ${labels[j]} value "${value}" is valid`);
                    }
                }
            }
        }

        if (hasError) {
            throw new Error("Some rows have values matching invalid formats. Check logs above.");
        }
    }
}

module.exports = ExpandColumnsPage;