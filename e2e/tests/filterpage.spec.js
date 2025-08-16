const { test } = require('../base/baseTest.js')


test.describe('Filter Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story/')
    })

    test('Validate column filtering with correct data.', async ({ filterPage }) => {
        await filterPage.validFilterColumn('Address')
    })

    test('Validate column filtering with incorrect data.', async ({ filterPage }) => {
        await filterPage.invalidFilterColumn('Last Name', 'InvalidName123')
    })
})