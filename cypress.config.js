const extensionLoader = require('../cypress-browser-extension-plugin/loader');
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', extensionLoader.load('User/fergussmith/tracker-hunt/my-app/dist'));
    },
  },
};
