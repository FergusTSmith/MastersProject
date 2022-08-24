// Adapated from https://www.youtube.com/watch?v=l6cZ6zs7dTg - Used to test Puppeteer - https://gokatz.me/blog/automate-chrome-extension-testing/

//Structured on https://www.youtube.com/watch?v=l6cZ6zs7dTg&ab_channel=RustyZone

//const puppeteer = require('puppeteer');
import puppeteer from "puppeteer"
const Extension_Path = "dist/";
const extensionName = 'TrackerHunt';
var testTimeout = 100000;

describe("End to End Testing - TrackerHunt", () => {
    test("Application launches", async() => {
        const pathToExtension = require('path').join(__dirname, 'dist')
        let browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`
            ]
        })
        //setTimeout(1000000);
        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")
        const buttonText = await page.$("button");
        const text = await (await buttonText.getProperty('textContent')).jsonValue();
        expect(text).toEqual(expect.stringContaining("Login"));
        browser.close();
        
    }, 100000)
    
    test("Solo Game - Classic 2 Minutes", async() => {
        const pathToExtension = require('path').join(__dirname, 'dist')
        let browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`
            ]
        })
        // Initiating Game
        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")
        const buttonText = await page.$("button");
        await page.click('.DevLogin');
        await page.waitForSelector('#Solo')
        await page.click('#Solo');
        await page.waitForSelector('#Classic')
        await page.click('.BeginGame');

        await page.waitForSelector('#StartSoloGame')
        await page.click('#StartSoloGame')

        // Started game, now browsing other pages for this to track

        var browsingPage = await browser.newPage();
        await browsingPage.goto('https://edition.cnn.com/')

        // https://github.com/puppeteer/puppeteer/issues/305
        browsingPage.evaluate(_ => {
            window.scrollBy(0, window.innerHeight)
         })

        await browsingPage.goto('http://www.bbc.co.uk/');

        // Test to ensure that trackers were encountered and logged

        const countryList = await page.$(".TrackedCountry");
        let value = await page.evaluate(el => el.textContent, countryList);
        console.log(value);
        //expect(value).toEqual(expect.stringContaining("United States") || expect.stringContaining("Unknown")); Too inconsistent
        let UserScore = await page.$('.UserScore');
        let score = await page.evaluate(el => el.textContent, UserScore);
        expect(parseInt(score)).toBeGreaterThan(0);

        // Test to ensure that the game successfully reopens

        var newPage = await browser.newPage();
        page.close();
        await newPage.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await newPage.waitForSelector("button")
        await newPage.click('.DevLogin');
        await newPage.waitForSelector(".TrackedCountry");
        const countryListNew = await newPage.$(".TrackedCountry");
        const userScore2 = await newPage.$('UserScore');
        
        let value2 = await newPage.evaluate(el => el.textContent, countryListNew);
        expect(value2).toEqual(expect.stringContaining("United") || expect.stringContaining("Unknown"));

        // Test that end game works correctly: 
        await newPage.waitForSelector('#EndGameButton');
        await newPage.click('#EndGameButton');
        await newPage.waitForSelector('.GameOver');
        const gameOver = await newPage.$('.GameOver');
        let value3 = await newPage.evaluate(el => el.textContent, gameOver);
        expect(value3).toEqual(expect.stringContaining("GAME OVER"));
        browser.close();
    }, 100000) 

    test("Solo Game - Bingo Five Minutes", async() => {
        const pathToExtension = require('path').join(__dirname, 'dist')
        let browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`
            ]
        })
        // Initiating Game
        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")
        const buttonText = await page.$("button");
        await page.click('.DevLogin');
        await page.waitForSelector('#Solo')
        await page.click('#Solo')
        await page.waitForSelector('div.RadioButtons');
        var radioSpace = page.$('div.RadioButtons');


        const BingoBut = await page.$('div.RadioButtons > #Bingo');
        const FiveMin = await page.$('div.RadioButtons > #fiveMin');
        BingoBut.checked = true;
        FiveMin.checked = true;
        BingoBut.selected = true;
        FiveMin.selected = true;
        await page.click('#fiveMinTest');
        await page.click('#BingoTest');

        //await page.evaluate(() => {let radio = document.querySelector('#Bingo'); let radio2 = document.querySelector('#fiveMin'); radio.click() radio2.click()})

        await page.click('.BeginGame');

        await page.waitForSelector('#StartSoloGame')
        await page.click('#StartSoloGame')

        // Test we are successfully in Bingo Mode

        const toLocate = await page.$('.Guide');
        let value4 = await page.evaluate(el => el.textContent, toLocate);
        console.log(value4);
        expect(value4).toEqual(expect.stringContaining("Countries To Locate:"))

        // Click End Game and approve functionality
        await page.waitForSelector('#EndGameButton');
        await page.click('#EndGameButton');
        await page.waitForSelector('.GameOver');
        const gameOver = await page.$('.GameOver');
        let value5 = await page.evaluate(el => el.textContent, gameOver);
        expect(value5).toEqual(expect.stringContaining("GAME OVER"));

        const gameOverText = await page.$('.GameOverText');
        let value6 = await page.evaluate(el => el.textContent, gameOverText);
        expect(value6).toEqual(expect.stringContaining("Unfortunately, you did not manage to find the tracking nations in the given time period."))

        browser.close();
    }, 100000)

    test("Multiplayer - Classic Ten Minutes", async() => {
        const pathToExtension = require('path').join(__dirname, 'dist')
        let browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`
            ]
        })

        //Initialise Multiplayer Classic Game
        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")
        const buttonText = await page.$("button");
        await page.click('.DevLogin');
        await page.waitForSelector('#NewLobby');
        await page.click('#NewLobby');

        const ClassicBut = await page.$('div.RadioButtons > #ClassicRadio');
        const TenMin = await page.$('div.RadioButtons > #tenMinsRadio');
        await page.click('#ClassicRadio');
        await page.click('#tenMinsRadio');
        await page.click('#beginGame');
        await page.waitForSelector('#Ready');
        await page.click('#Ready');

        await page.evaluate(async() => {
            await new Promise(function(resolve){
                setTimeout(resolve, 1000);
            })
        })

        await page.waitForSelector('#Start');
        await page.click('#Start')


        // Browse pages to test tracking

        var browsingPage = await browser.newPage();
        await browsingPage.goto('https://edition.cnn.com/')

        // https://github.com/puppeteer/puppeteer/issues/305
        browsingPage.evaluate(_ => {
            window.scrollBy(0, window.innerHeight)
         })

        await browsingPage.goto('http://www.bbc.co.uk/');

        // Test to ensure that trackers were encountered and logged

        const userScore = await page.$(".UserScore");
        let value = await page.evaluate(el => el.textContent, userScore);
        console.log(value);
        expect(parseInt(value)).toBeGreaterThan(0);
        await page.waitForSelector('#Leave');
        await page.click('#Leave');
        browser.close();

    }, 1000000)

    it("Multiplayer - Bingo 5 minutes", async() => {
        const pathToExtension = require('path').join(__dirname, 'dist')
        let browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`
            ]
        })
        // Initiating Game
        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")
        const buttonText = await page.$("button");
        await page.click('.DevLogin');

        await page.waitForSelector('#NewLobby');
        await page.click('#NewLobby');

        await page.waitForSelector('div.RadioButtons > #BingoRadio');
        await page.waitForSelector('div.RadioButtons > #fiveMinsRadio');
        await page.click('#BingoRadio');
        await page.click('#fiveMinsRadio');
        await page.click('#beginGame');
        await page.waitForSelector('#Ready');
        await page.click('#Ready');

        await page.evaluate(async() => {
            await new Promise(function(resolve){
                setTimeout(resolve, 1000);
            })
        })

        await page.waitForSelector('#Start');
        await page.click('#Start')

        // Test we are successfully in Bingo Mode

        const toLocate = await page.$('.Guide');
        let value4 = await page.evaluate(el => el.textContent, toLocate);
        console.log(value4);
        expect(value4).toEqual(expect.stringContaining("Countries To Locate:"))

        browser.close();


    }, 100000)


})

