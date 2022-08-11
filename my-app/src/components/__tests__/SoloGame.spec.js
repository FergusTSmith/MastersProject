/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import SoloGame from '../SoloGamePage.vue';
//import { render, screen } from "@testing-library/vue"
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


describe('HomePage Component Unit Tests: ', () => {
    
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
    var startGameButton = await wrapper.find('#Start');
    await startGameButton.trigger('click');
    expect(wrapper.emitted().gameSetup).toBeTruthy;

    //Come back to to test that clicking start causes the timer to start ticking down

  })

  it("Clicking End game", async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});

    var endGameButton = await wrapper.find('#EndGameButton');
    await endGameButton.trigger('click');

    expect(wrapper.emitted().endGame).toBeTruthy();

    console.log(wrapper.text());

    //expect(wrapper.text()).toContain("Game Over");
    //expect(wrapper.text()).toContain("Your Score was:");
  })

  it("Checking Game Over DOM elements are rendered correctly"), async() => {
    var wrapper = mount(SoloGame, {propsData: { categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: true, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    expect(wrapper.text()).toContain("Game Over");
    expect(wrapper.text()).toContain("Your score was");
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
    


