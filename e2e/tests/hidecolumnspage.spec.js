const { test } = require('../base/baseTest.js');


test.describe('Column visibility tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story/');
    });

    test('Hide column and verify it is hidden.', async ({ hideColumnsPage }) => {
        await hideColumnsPage.hideColumn('Address');
        await hideColumnsPage.verifyColumnIsHidden('Address');
    });

    test('Hide and Unhide column and verify it becomes visible.', async ({ hideColumnsPage }) => {
        await hideColumnsPage.hideAndUnhideColumnVerify('Last Name', 'Address');
    });

})

