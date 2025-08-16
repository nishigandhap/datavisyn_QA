
# Test feature of  Mantine React Table

The objective is to automate key features of the Mantine React Table, such as Sorting, Search, Hide Columns, Filter, and Expand Columns, using Playwright, with automatic generation of screenshots, traces, and Allure reports for test execution.

## Table of Contents

* Site reference
* Scenarios
* Installation
* Running Tests
* Git repo link


## Link Reference

Web link

```
https://www.mantine-react-table.dev/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story
```


## Test Scenarios 

## Sorting
1. Sort the column in ascending order.
2. Sort the column in descending order.
3. Verify that the column sorting is retained after applying filters.

## Search
1. Search by a valid name and verify the name appears in the results.
2. Search by an invalid name and verify no results are displayed.

## Hide columns
1. Hide column and verify it is hidden.
2. Hide and Unhide column and verify it becomes visible.

## Filter columns
1. Validate column filtering with correct data.
2. Validate column filtering with incorrect data.

## Expand columns
1. Verify column expansion and validate data format.
2. Verify invalid data formats in expanded columns.



## Installation

Before you start installing Playwright and Node, make sure that you have the following installed on your computer:

```
Node.js
VS code
```
## Installing Node.js

Node.js is a JavaScript runtime environment that is used to run JavaScript code outside of a web browser. To install Node.js, follow these steps:

  1. Go to the Node.js official website: https://nodejs.org/
  2. Click on the “Download” button for the latest version of Node.js.
  3. Follow the instructions for your operating system to install Node.js.
  4. Verify that Node.js has been installed successfully by opening a terminal or command prompt and running the following command:

```
node -v
```
## Installing Playwright

Playwright is a JavaScript-based end-to-end testing framework. To install it, follow these steps:

Open a terminal or command prompt and navigate to the root directory of your project.
Run the following command to install Playwright as a development dependency:

```
npm init playwright@latest
```

Choose between TypeScript or JavaScript 

Verify that Playwright has been installed successfully by running the following command:
```
npx playwright test
```
This should open the Playwright Test Runner in your default web browser.

With these steps, you should have both Node.js and Playwright installed on your computer and ready to use. If you encounter any issues during the installation process, refer to the official documentation for Node.js and Playwright(https://playwright.dev/docs/intro) for more information and support.


## Installing Allure Report (Mac Users)

1. Install Allure Playwright reporter:

```
npm install --save-dev @playwright/test allure-playwright
```
2. If you face permission issues:
```
sudo chown -R $(id -u):$(id -g) ~/.npm
```
3. Clear cache

```
npm cache clean --force
```

4. Check version for allure:

```
allure --version
```

5. Add Allure Playwright as a reporter in playwright.config.js
```
export default defineConfig({
  // ...
  reporter: [["line"], ["allure-playwright"]],
});
```

## For more information: https://allurereport.org/docs/playwright/


## Running Tests

Add the following scripts to package.json:
```
"scripts": {
   "reportTest": "npx playwright test"
  },
```
```
npm run reportTest

```
## To generate and view Allure report separately:
```
allure serve allure-results
```

## Git clone

```
git clone https://github.com/nishigandhap/datavisyn_QA
```
