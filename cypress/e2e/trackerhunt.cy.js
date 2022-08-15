const extensionLoader = require('../cypress-browser-extension-plugin/loader');

module.exports = (on) => {
  on('before:browser:launch', extensionLoader.load('User/fergussmith/tracker-hunt/my-app/dist'));
}


describe('Tests for TrackerHunt using Cypress E2E', () => {
    it('passes', () => {
        cy.visit('http://www.google.com')
    })
})