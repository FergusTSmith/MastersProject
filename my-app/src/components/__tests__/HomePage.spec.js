/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import HomePage from '../HomePageView.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

var gamesPlayed = 100;
var gamesWon = 10;
var UsersID = "Goose96";
var userProfile = {username: "Goose96", googleID: "1245145"};
var UserGoogleID = "1245145"
var userSoloContinue = false;
var userMultiContinue = false;
var multiGameDetails = {};
var USersInLobby = [{userID: "Goose96", googleID: "1245145"}]

describe('HomePage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(HomePage, {propsData: {gamesPlayed: gamesPlayed, gamesWon: gamesWon, UsersID: UsersID, userProfile: userProfile, UserGoogleID: UserGoogleID, userSoloContinue: userSoloContinue, userMultiContinue: userMultiContinue, multiGameDetails: multiGameDetails}});
    expect(wrapper).toBeTruthy();
  })

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

  it("size of logo is correct", () => {
    var wrapper = mount(HomePage);
    const image = wrapper.get('img');
  })

  it("clicking solo", async() => {
    var wrapper = mount(HomePage, {propsData: { UsersID: UsersID}});
    await wrapper.find('#Solo').trigger('click');
    console.log(wrapper.text());
  })
  
})
    


