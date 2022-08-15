// Adapated from https://www.youtube.com/watch?v=l6cZ6zs7dTg - Used to test Puppeteer - https://gokatz.me/blog/automate-chrome-extension-testing/

const puppeteer = require('puppeteer');
const Extension_Path = "Users/fergussmith/tracker-hunt/my-app/dist";
const extensionName = "TrackerHunt";

tester();

async function tester(){
    let browser = await puppeteer.launch({
        headless: false,
        args: [
            `--load-extension=/Users/fergussmith/tracker-hunt/my-app/dist`
        ]
    })
    
    //Following code is taken from https://gokatz.me/blog/automate-chrome-extension-testing/ to allow testing of a chrome extension E2E with Puppeteer
    
    const dummyPage = await browser.newPage();
    const dummyPage2 = await browser.newPage();
    
    await dummyPage.waitForFileChooser();
    dummyPage.click('#upload-file-button')
    
    const targets = await browser.targets();
    const extensionTarget = targets.find(({ _targetInfo}) => {
        return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
    })
    
    const extensionURL = extensionTarget._targetInfo.url || '';
    const [,, extensionID] = extensionURL.split('/')
    
    const extensionPopupHtml = 'popup.html'
    
    const extensionPage = await browser.newPage();
    await extensionPage.goto(`chrome-extension://${extensionID}/${extensionPopupHtml}`)
}

