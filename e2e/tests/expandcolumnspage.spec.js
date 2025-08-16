const { test } = require('../base/baseTest.js')


test.describe('Expand Columns Page Tests', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story/')
   });

   test('Verify column expansion and validate data format.', async ({ expandColumnsPage }) => {
      await expandColumnsPage.verifyValidExpandedColumnDataFormat();

   });

   test('Verify invalid data formats in expanded columns.', async ({ expandColumnsPage }) => {
      await expandColumnsPage.verifyInvalidExpandedColumnDataFormat();
   });

})