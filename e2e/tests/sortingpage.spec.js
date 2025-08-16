const { test } = require('../base/baseTest.js')
const FilterPage = require('../pages/FilterPage');

test.describe('Sorting tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story/')
    })

    test('Sort the column in ascending order.', async ({ sortingPage }) => {
        await sortingPage.verifyColumnNameAscendingOrder('Last Name')

    })

    test('Sort the column in descending order.', async ({ sortingPage }) => {
        await sortingPage.verifyColumnNameDescendingOrder('Last Name')
    })


    test('Verify that the column sorting is retained after applying filters.', async ({ page, sortingPage }) => {
        const filterPage = new FilterPage(page);
        await sortingPage.verifySortingRetentionAfterFilter('First Name', filterPage)
    })
})
