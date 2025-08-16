const { test } = require('../base/baseTest.js')

test.describe('Search Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story/')

  })

  test('Search by a valid name and verify the name appears in the results.', async ({ searchPage }) => {
    await searchPage.searchNameIsVisible()
  })

  test('Search by an invalid name and verify no results are displayed.', async ({ searchPage }) => {
    await searchPage.invalidNameIsNotVisible('InvalidName123')
  })
})


