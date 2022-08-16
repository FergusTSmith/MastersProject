/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import LobbyView from '../LobbyView.vue';
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

var UserID = "Goose96";
var playersLobby="12345";
var UsersInLobby=[{userID: "Goose96"}, {userID: "TesterAccount"}]
var isLobbyCreator = true;


describe('LobbyPage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(LobbyView);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Lobby ID: " + playersLobby)
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('input[type="radio"]')).toBeTruthy
    expect(wrapper.text()).toContain("Connected Players:");
    expect(wrapper.text()).toContain("Choose length of round")
  })

  it("clicking different buttons", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }});    
    var closeLobby = await wrapper.find('#closeLobby');
    await closeLobby.trigger('click');
    //expect(wrapper.emitted().exitToHomePageReset).toBeTruthy();

    var beginGame = await wrapper.find('#beginGame');
    await beginGame.trigger('click');
    expect(wrapper.emitted().multiGameInitiated).toBeTruthy();

    var leaveGame = await wrapper.find('#leaveGame')
    await leaveGame.trigger('click');
    expect(wrapper.emitted().leaveGame).toBeTruthy();

  })

  it("Clicking Invite Player", async() => {
    var wrapper = mount(LobbyView, {propsData: { UserID: UserID, playersLobby: playersLobby, UsersInLobby: UsersInLobby, isLobbyCreator: isLobbyCreator }}); 
    var invitePlayerButton = wrapper.find('#playerInvite');
    expect(invitePlayerButton.exists()).toBeFalsy();

    var invitePlayer = wrapper.find('#invitePlayer');
    await invitePlayer.trigger('click');
    invitePlayerButton = wrapper.find('#playerInvite');
    expect(invitePlayerButton.exists()).toBeTruthy();

  })

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
  
})
    

