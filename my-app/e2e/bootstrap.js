// Adapted https://tweak-extension.com/blog/complete-guide-test-chrome-extension-puppeteer/

const { Puppeteer } = require("puppeteer")
const { devtools = false, slowMo = false, appUrl } = options;

async function boostrap(options = {}){
    const browser = await Puppeteer.launch({
        headless: false,
        devtools,
        args: [
            '--disable-extensions-except=./replacer-chrome-extension',
            '--load-extension=./replacer-chrome-extension',
        ],
        ...(slowMo && { slowMo }),
    })

    const page = await browser.newPage();
    await page.goto("www.google.com", {waitUntil: 'load'});

    const targets = await browser.targets();
    const extension = targets.find(target => target.url().includes('chrome-extension'));
    var extensionURL = extension.url() || '';
    var [, , extensionID] = extensionURL.split('/')

    const extPage = await browser.newPage();
    var extensionURLFull = `chrome-extension://${extensionID}/popup.html`;
    await extPage.goto(extensionURLFull,  { waitUntil: 'load'});

    return {
        appPage,
        browser,
        extensionURLFull,
        extPage,
    }
}
module.exports = { bootstrap };

