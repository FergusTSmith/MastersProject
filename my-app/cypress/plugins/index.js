const extensionLoader = require('cypress-browser-extension-plugin/loader');

module.exports = (on) => {
    on('before:browser:launch', extensionLoader.load('Users/fergussmith/tracker-hunt/my-app/dist'))
}