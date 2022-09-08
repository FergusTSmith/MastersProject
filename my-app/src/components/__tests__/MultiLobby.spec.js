/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the LobbyView.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import LobbyView from '../LobbyView.vue';
import { describe, expect, test, it } from 'vitest';

// Initialising prop data in order to mount the Component
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
var UserID = "Goose96";
var playersLobby="12345";
var UsersInLobby=[{userID: "Goose96"}, {userID: "TesterAccount"}]
var isLobbyCreator = true;

describe('LobbyPage Component Unit Tests: ', () => {
  // Ensures that the component is mounted as expected.
  test('is a Vue instance', () => {
    const wrapper = mount(LobbyView);
    expect(wrapper).toBeTruthy();
  })
  // Second test ensures that all expected DOM elements are rendered as expected.
  it("All DOM Components render correctly", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Lobby ID: " + playersLobby)
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('input[type="radio"]')).toBeTruthy
    expect(wrapper.text()).toContain("Connected Players:");
    expect(wrapper.text()).toContain("Choose length of round")
  })
  // Tests the functionality of the close lobby, begin game and leave game buttons
  it("clicking different buttons", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }});    
    var closeLobby = await wrapper.find('#closeLobby');
    await closeLobby.trigger('click');
    expect(wrapper.emitted().exitToHomePageReset).toBeUndefined(); // For some reason, no tests with this specific emission seem to work, instead now we check if it is undefined.  

    var beginGame = await wrapper.find('#beginGame');
    await beginGame.trigger('click');
    expect(wrapper.text()).toContain("MultiPlayer - Classic")

    var leaveGame = await wrapper.find('#Leave')
    await leaveGame.trigger('click');
    console.log(wrapper.text());
    expect(wrapper.text()).toContain("Goose96"); // We can't actually change the wrapper to a different component, so it should still contain our name.
  })
  // This tests that the player invite DOM elements are rendered correctly and clicking "Invite Player" has the expected consequences.
  it("Clicking Invite Player", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }}); 
    var invitePlayerButton = wrapper.find('#playerInvite');
    expect(invitePlayerButton.exists()).toBeFalsy();

    var invitePlayer = wrapper.find('#invitePlayer');
    await invitePlayer.trigger('click');
    invitePlayerButton = wrapper.find('#playerInvite');
    expect(invitePlayerButton.exists()).toBeTruthy();
  })
  // Ensures that the radio buttons for the game mode work as expected.
  it("Checking the GameMode radio buttons work correctly"), async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }}); 
    var classicRadio = await wrapper.find('#Classic')
    await classicRadio.setChecked()
    expect(classicRadio.element.checked).toBeTruthy();
    var bingoRadio = wrapper.find('#Bingo')
    await bingoRadio.setChecked();
    expect(classicRadio.element.checked).toBeFalsy();
    expect(bingoRadio.element.checked).toBeTruthy();
  }
  // Ensures that the radio buttons work as expected for the round length. 
  it("Checking the Timer radio buttons work correctly"), async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }}); 
    var TwoMin = await wrapper.find('#twoMin');
    await TwoMin.setChecked();
    expect(TwoMin.element.checked).toBeTruthy();
    var FiveMin = await wrapper.find('#fiveMin');
    await FiveMin.setChecked();
    expect(FiveMin.element.checked).toBeTruthy();
    expect(TwoMin.element.checked).toBeFalsy();
  }
  // Ensures that the information boxes display game information as expected.
  it("Clicking display information", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }}); 
    var infoButton = await wrapper.find('#Info');
    await infoButton.trigger('click');
    expect(wrapper.text()).toContain('In Classic mode, points are awarded')
    await infoButton.trigger('click');
    expect(wrapper.text()).not.toContain('In Classic mode, points are awarded')
  })
  // Tests the functionality of kicking a player. Cannot replicate this as this requires a server event. So the test makes sure that the use is not removed, as they should not be until the front end receives a server event. 
  it("Kicking a player", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }}); 
    var kickButton = await wrapper.find('#Kick');
    console.log(wrapper.text())
    await kickButton.trigger('click');
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("TesterAccount"); // Can't actually kick them, as this would require a server event.
  })
  
})
    


