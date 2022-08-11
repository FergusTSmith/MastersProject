module.exports = (on) => {
  on('before:browser:launch', (extensions=['Users/fergussmith/tracker-hunt/my-app/dist'])  );
}


describe('Tests for TrackerHunt using Cypress E2E', () => {
    it('passes', () => {
        cy.visit('http://www.google.com')
    })
})