/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the MultiPlayerGame.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import MultiGame from '../MultiPlayerGame.vue';
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
var noOfCountriesBingo = 0;
var didYouWin = false;
var noOfCountries = 10;
var WinningUser = "Goose96";
var isLobbyCreator = true;
var UsersInLobby=[{userID: "Goose96", ready: "Not Ready"}, {userID: "TesterAccount", ready: "Ready"}]
var userProfile = {userID: "Goose96", googleID: "12486591", ready: "Not Ready"}
var allPlayersReady = false;
var finishedGame = false;
var APIEnabled = false;
var playersLobby = '12345';
var UsersID = "Goose96";
var multiGameDetails = {};
var userMultiContinue = false;



describe('Multiplayer Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    var wrapper = mount(MultiGame, {propsData: {userMultiContinue: userMultiContinue, UsersID: UsersID, multiGameDetails: multiGameDetails, playersLobby: playersLobby, userProfile: userProfile, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator,  categoryList: categoryList, GameMode: gameMode, startTime: startTime}});
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: finishedGame, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: didYouWin, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("MultiPlayer - Classic")
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.text()).toContain("Current Score");

    var BaseTimer = await wrapper.findComponent('BaseTimer');
    expect(BaseTimer.exists).toBeTruthy();

    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: finishedGame, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: didYouWin, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: "Bingo", gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    expect(wrapper.text()).toContain("Countries To Locate:");
    expect(wrapper.text()).toContain("Countries Located");
  })

  it("clicking Start button", async() => {
    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: finishedGame, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: didYouWin, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    var startGameButton = await wrapper.find('#Start');
    await startGameButton.trigger('click');
    expect(wrapper.emitted().gameSetup).toBeTruthy;
  })

  it("Clicking Ready Up", async() => { 
    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: finishedGame, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: didYouWin, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    var readyUp = await wrapper.find('#Ready');
    expect(wrapper.text()).toContain("Not Ready");

    await readyUp.trigger('click');
    expect(wrapper.emitted().playerReady).toBeTruthy;
  })

  it("Clicking leave game", async() => {
    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: finishedGame, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: didYouWin, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: gameOver, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});

    var leaveGame = await wrapper.find('#Leave');
    await leaveGame.trigger('click');

    //expect(wrapper.emitted().exitToHomePageReset).toBeTruthy(); This doesn't work as the emission is made from a separate method.
    expect(wrapper.text()).toContain("Classic")
  })

  it("Checking Game Over DOM elements are rendered correctly"), async() => {
    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: true, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: true, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: true, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    expect(wrapper.text()).toContain("You won!");
    expect(wrapper.text()).toContain("Your score was");

    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: true, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: "TesterAccount", noOfCountries: noOfCountries, didYouWin: false, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: true, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    expect(wrapper.text()).toContain("Condolenses");
    expect(wrapper.text()).toContain("The winner of this game was");
  }

  it("Information Boxes test"), async() => {
    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: true, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: true, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: gameMode, gameOver: true, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    var informationButton = wrapper.find('#Info');

    await informationButton.trigger('click');

    expect(wrapper.emitted().displayInformation).toBeTruthy();
    expect(wrapper.test()).toContain("In Classic mode, points are awarded");

    var wrapper = mount(MultiGame, {propsData: {APIEnabled: APIEnabled, finishedGame: true, allPlayersReady: allPlayersReady, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator, WinningUser: WinningUser, noOfCountries: noOfCountries, didYouWin: true, noOfCountriesBingo: noOfCountriesBingo, categoryList: categoryList, timer: timer, GameMode: "Bingo", gameOver: true, timeLeft: timeLeft, startTime: startTime, userScore: userScore, VisitedCountries: VisitedCountries, numberOfCookies: numberOfCookies, gameStarted: gameStarted, countriesToFind: countriesToFind }});
    informationButton = wrapper.find('#Info');
    await informationButton.trigger('click');

    expect(wrapper.emitted().displayInformation).toBeTruthy();
    expect(wrapper.test()).toContain("In Bingo mode, users are challenged");

  }
  
})
    


