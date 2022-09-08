/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the SoloGamePage.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import SoloGame from '../SoloGamePage.vue';
import { describe, expect, test, it } from 'vitest';

const categoryList = [{name: "Shopping", count: 13}, {name: "News", count: 8}, {name: "Business", count: 20}, ]
var timer = 120; 
var gameMode = "Classic";
var gameOver = false;
var timeLeft = 120;
var startTime = 120;
var userScore = 0;
var VisitedCountries = [{name: "United States", count: 4}, {name: "United Kingdom", count: 10}];
var numberOfCookies = 0;
var gameStarted = false;
var countriesToFind = [{name: "United States", found: false}, {name: "Russia", found: false}, {name: "Germany", found: false},]


describe('Solo Game Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(SoloGame);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Solo Mode - Classic")
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.text()).toContain("During this session");

    var BaseTimer = await wrapper.findComponent('BaseTimer');
    expect(BaseTimer.exists).toBeTruthy();

    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: "Bingo", gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    expect(wrapper.text()).toContain("Countries To Locate:");
    expect(wrapper.text()).toContain("Countries Located");
  })

  it("clicking Start button", async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    var startGameButton = await wrapper.find('#StartSoloGame');
    await startGameButton.trigger('click');
    expect(wrapper.emitted().gameSetup).toBeTruthy;
  })

  it("Clicking End game", async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    var endGameButton = await wrapper.find('#EndGameButton');
    await endGameButton.trigger('click');
    console.log(wrapper.text());
    await wrapper.find('.CategoryText');

    expect(wrapper.text()).toContain("GAME OVER");
    expect(wrapper.text()).toContain("Your score was:");
  })

  it("Checking Game Over DOM elements are rendered correctly & Homepage works"), async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: true, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    expect(wrapper.text()).toContain("GAME OVER");
    expect(wrapper.text()).toContain("Your score was");

    var homeButton = await wrapper.find('#Home');
    await homeButton.trigger('click');
    expect(wrapper.emitted().exitToHomePageReset).toBeTruthy();
  }

  it("Information Boxes test"), async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    var informationButton = wrapper.find('#Info');
    await informationButton.trigger('click');
    expect(wrapper.emitted().displayInformation).toBeTruthy();
    expect(wrapper.test()).toContain("In Classic mode, points are awarded");
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: "Bingo", gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    informationButton = wrapper.find('#Info');
    await informationButton.trigger('click');
    expect(wrapper.emitted().displayInformation).toBeTruthy();
    expect(wrapper.test()).toContain("In Bingo mode, users are challenged");

  }
  
})
    


