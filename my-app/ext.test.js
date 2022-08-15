// Adapated from https://www.youtube.com/watch?v=l6cZ6zs7dTg - Used to test Puppeteer - https://gokatz.me/blog/automate-chrome-extension-testing/

//Structured on https://www.youtube.com/watch?v=l6cZ6zs7dTg&ab_channel=RustyZone

const puppeteer = require('puppeteer');
const Extension_Path = "dist/";
const extensionName = 'TrackerHunt';

tester();

async function tester(){

    
    //Following code is taken from https://gokatz.me/blog/automate-chrome-extension-testing/ to allow testing of a chrome extension E2E with Puppeteer
    
    //const dummyPage = await browser.newPage();
    const pathToExtension = require('path').join(__dirname, 'dist')
    
    let browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`
        ]
    })
    browser.on('targetcreated', async (target) => {
        if(target.type() === 'page'){
            console.log("NEW PAGE CREATED")
        }
    })

    const targets = await browser.targets();
    const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
    const backgroundPage = await backgroundPageTarget.page();

    //backgroundPage.goto('www.google.com')

    var [page] = await browser.pages();
    await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
    await page.bringToFront();
    await page.waitForSelector("button")

    const loginButton = await page.$$("button.loginButton")
    //console.log(loginButton)
    
    //await page.waitForSelector('input[type="email"]');
    //console.log(page);

    // https://pocketadmin.tech/en/puppeteer-popup-window/

    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    
    await page.click('.loginButton')

    //var pages = await browser.pages();
    //var popupPage = pages[pages.length-1];
    //console.log(popupPage === page)
    const newPage = await newPagePromise;

    //newPage.waitForSelector('input[type="email"]')
    //console.log(popupPage)
    //const emailInput=await newPage.$('input[type="email"]')
    //console.log(emailInput);

    //await popupPage.type('input[type="email"]', 'test@test.com')



}

function delay(time){
    return new Promise(function(resolve){
        setTimeout(resolve, time)
    })
}

const getExtensionID = async(browser) => {
    const targets = await browser.targets();
    const extensionTarget = targets.find(({ _targetInfo}) => {
        console.log(_targetInfo);
        return (_targetInfo.title === extensionName && _targetInfo.type === "background_page");
    })
    
    const extensionURL = extensionTarget._targetInfo.url || '';
    const [,, extensionID] = extensionURL.split('/')

    return extensionID;
}
/*
describe("TrackerHunt tests", () => {
    it("Test One: Opens", async() => {
        const pathToExtension = require('path').join(__dirname, 'dist')
    
        let browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`
            ]
        })

        const targets = await browser.targets();
        const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
        const backgroundPage = await backgroundPageTarget.page();

        //backgroundPage.goto('www.google.com')

        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")

        const loginButton = await page.$$("button.loginButton")
        await loginButton.click();


    })
})

*/