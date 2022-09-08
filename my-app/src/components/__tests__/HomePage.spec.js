/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the HomePage.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
 Coverage in this file is lower, due to the inability to test socket methods.
*/
import { mount } from '@vue/test-utils';
import HomePage from '../HomePageView.vue';
import { describe, expect, test, it } from 'vitest';

// Initialising prop data in order to mount the Component
var gamesPlayed = 100;
var gamesWon = 10;
var UsersID = "Goose96";
var userProfile = {username: "Goose96", googleID: "1245145"};
var UserGoogleID = "1245145"
var userSoloContinue = false;
var userMultiContinue = false;
var multiGameDetails = {};
var UsersInLobby = [{userID: "Goose96", googleID: "1245145"}]

describe('HomePage Component Unit Tests: ', () => {
  // First test ensures that this mounts correctly
  test('is a Vue instance', () => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    expect(wrapper).toBeTruthy();
  })
  // Second test ensures that all expected DOM elements render correctly.
  it("All DOM Components render correctly", async() => {
    var UsersID = "TestUser"
    var wrapper = mount(HomePage, {propsData: { UsersID: UsersID}});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Welcome back, " + UsersID)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()

    expect(wrapper.find('#Solo').exists()).toBeTruthy()
    expect(wrapper.find('#NewLobby').exists()).toBeTruthy()
    expect(wrapper.find('#Passive').exists()).toBeTruthy()
    expect(wrapper.find('#Lobby').exists()).toBeTruthy()
    expect(wrapper.find('#Options').exists()).toBeTruthy()
    expect(wrapper.find('#Leaderboards').exists()).toBeTruthy()
    expect(wrapper.find('div').exists()).toBeTruthy();

  })
  // Originally created to determine whether the size of the logo was correct. As this can't be checked in Vitest, this was amended to just make sure that the image renders.
  it("size of logo is correct", () => {
    var wrapper = mount(HomePage);
    const image = wrapper.get('img');
    expect(image).toBeTruthy();
  })
  // Tests the clicking of the solo button. 
  it("clicking solo", async() => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    var soloBut = await wrapper.find('#Solo');
    await soloBut.trigger('click');
    console.log(wrapper.text());
    expect(wrapper.text()).toContain("Solo") // Vitest doesn't like when we change components during a test. Therefore, we can't test whether we land on the solo page with this.
  })
  // Test the creation of a new lobby, and ensure that the DOM is updated.
  it("Create new lobby", async() => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    var newLobby = await wrapper.find("#NewLobby");
    await newLobby.trigger('click');
    console.log(wrapper.text());
    expect(wrapper.text()).toContain("Lobby ID:");
  })
  // Test that clicking the passive mode button opens the passive mode page.
  it("Enter Passive Mode", async() => {
    var wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    var passBut = await wrapper.find('#Passive');
    await passBut.trigger('click');
    console.log(wrapper.text());
    expect(wrapper.text()).toContain("Passive Mode")
  })
  // Test that clicking Join Lobby brings up the Join Lobby Page.
  it("Enter join lobby", async() => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    var lobby = await wrapper.find('#Lobby');
    await lobby.trigger('click');
    expect(wrapper.text()).toContain("Enter Lobby ID:")
  })
  // Test that clicking Options opens the Options page.
  it("Enter options", async() => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    var options = await wrapper.find('#Options');
    await options.trigger('click');
    expect(wrapper.text()).toContain("Change Username");
  })
  // Test that clicking the Leaderboards button will open the Leader Boards page.
  it("Enter Leader Boards", async() => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    var leaderBoard = await wrapper.find('#Leaderboards');
    await leaderBoard.trigger('click');
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("LeaderBoards");
  })

  
})
    


