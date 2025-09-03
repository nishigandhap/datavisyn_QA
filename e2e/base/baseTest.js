const { test: base } = require('@chromatic-com/playwright')

const SearchPage = require('../pages/SearchPage.js')
const SortingPage = require('../pages/SortingPage.js')
const FilterPage = require('../pages/FilterPage.js')
const HideColumnsPage = require('../pages/HideColumnsPage.js')
const ExpandColumnsPage = require('../pages/ExpandColumnsPage.js')


const test = base.extend({

    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page))
    },

    sortingPage: async ({ page }, use) => {
        await use(new SortingPage(page))
    },

    filterPage: async ({ page }, use) => {
        await use(new FilterPage(page))
    },

    hideColumnsPage: async ({ page }, use) => {
        await use(new HideColumnsPage(page))
    },

    expandColumnsPage: async ({ page }, use) => {
        await use(new ExpandColumnsPage(page))
    }

})


module.exports = { test }
