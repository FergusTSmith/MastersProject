// The structure of these E2E tests was adapted from a Youtube Tutorial: End to End testing for a Chrome Extension - With Puppeteer Chromium, (Jan. 10, 2022). Accessed: Sep. 02, 2022. [Online Video]. Available: https://www.youtube.com/watch?v=l6cZ6zs7dTg
// Also, heavily inspired by the following tutorial: [1] G. Kathirevl, ‘Automate the UI Testing of your chrome extension - Gokul Kathirvel’, Automate the UI Testing of your chrome extension, Apr. 18, 2019. https://gokatz.me/blog/automate-chrome-extension-testing/ (accessed Sep. 02, 2022).

/* This file contains the end to end tests for the TrackerHunt Application.
These tests are 5 total, one for launching the application, two for solo games and two for multiplayer games. 
This file is automatically detected and run by Vitest upon running the unit tests for this application. 
*/

import puppeteer from "puppeteer"
const Extension_Path = "dist/";
const extensionName = 'TrackerHunt';
var testTimeout = 100000;

// Test One: Ensuring the application successfully launches.
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
        var [page] = await browser.pages();
        await page.goto(`chrome-extension://bgjhibncalnohjalebjpmgboleachfbc/popup.html`)
        await page.bringToFront();
        await page.waitForSelector("button")
        const buttonText = await page.$("button");
        const text = await (await buttonText.getProperty('textContent')).jsonValue();
        // Test that we have opened the application successfully:
        expect(text).toEqual(expect.stringContaining("Login"));
        browser.close(); 
    }, 100000)
    
    // Test to play a solo game in classic mode for two minutes
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

        // Scrolling down pages inspried by the answer by "paulirish" on : [1] ‘page.scroll()? · Issue #305 · puppeteer/puppeteer’, GitHub. https://github.com/puppeteer/puppeteer/issues/305 (accessed Sep. 02, 2022).
        browsingPage.evaluate(_ => {
            window.scrollBy(0, window.innerHeight)
         })

        await browsingPage.goto('http://www.bbc.co.uk/');

        // Test to ensure that trackers were encountered and logged
        const countryList = await page.$(".TrackedCountry");
        let value = await page.evaluate(el => el.textContent, countryList);
        console.log(value);
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

    // Test for a Solo Bingo game that lasts for five minutes
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
        
        // Selects the game mode and the time.
        const BingoBut = await page.$('div.RadioButtons > #Bingo');
        const FiveMin = await page.$('div.RadioButtons > #fiveMin');
        BingoBut.checked = true;
        FiveMin.checked = true;
        BingoBut.selected = true;
        FiveMin.selected = true;
        await page.click('#fiveMinTest');
        await page.click('#BingoTest');
        await page.click('.BeginGame');
        await page.waitForSelector('#StartSoloGame')
        await page.click('#StartSoloGame')
        // Test we are successfully in Bingo Mode
        const toLocate = await page.$('.Guide');
        let value4 = await page.evaluate(el => el.textContent, toLocate);
        console.log(value4);
        expect(value4).toEqual(expect.stringContaining("Countries To Locate:"))

        // Click End Game and approve functionality to see if the game over screen is shown
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

    // Test that runs a multiplayer game with the settings of classic mode for ten minutes
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

        // Clicking the radio buttons to customise the game
        const ClassicBut = await page.$('div.RadioButtons > #ClassicRadio');
        const TenMin = await page.$('div.RadioButtons > #tenMinsRadio');
        await page.click('#ClassicRadio');
        await page.click('#tenMinsRadio');
        await page.click('#beginGame');
        await page.waitForSelector('#Ready');
        await page.click('#Ready');

        // Promise function used in testing to ensure that we do not time out before the test completes.
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

        // Scrolling down pages inspried by the answer by "paulirish" on : [1] ‘page.scroll()? · Issue #305 · puppeteer/puppeteer’, GitHub. https://github.com/puppeteer/puppeteer/issues/305 (accessed Sep. 02, 2022).
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
    
    // Test to initiate a Bingo Mode game in Multiplayer for five minutes.
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

        // Clicking the radio buttons and customising the game
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

