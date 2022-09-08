/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the PassiveMode.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import PassiveMode from '../PassiveMode.vue';
import { describe, expect, test, it } from 'vitest';

var totalRequests = 1000;
var passiveModeTotalTrackers = 100;
var passiveModeUniqueHosts = 10;
var passiveModeTotalCounties = 3;
var passiveModeCountries = [{name: "United Kingdom", count: 1}];
var passiveModeCategoryList = [{name: "Health", count: 1}];
var passiveModeHosts = [{URL: 'Facebook.com', count: 1}]

describe('PassiveMode Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(PassiveMode);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(PassiveMode, {propsData: { totalRequests: totalRequests, passiveModeTotalTrackers: passiveModeTotalTrackers, passiveModeUniqueHosts: passiveModeUniqueHosts, passiveModeTotalCounties: passiveModeTotalCounties}});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Blocked Requests: 100")
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeFalsy()
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.text()).toContain("Total Requests: 1000");
    expect(wrapper.findComponent('PassiveModeChart')).toBeTruthy();
  })

  it("Clicking different buttons", async() => {
    var wrapper = mount(PassiveMode, {propsData: {passiveModeHosts:passiveModeHosts, passiveCategoryList:passiveModeCategoryList,passiveModeCountries:passiveModeCountries, totalRequests: totalRequests, passiveModeTotalTrackers: passiveModeTotalTrackers, passiveModeUniqueHosts: passiveModeUniqueHosts, passiveModeTotalCounties: passiveModeTotalCounties}});
    await wrapper.setData({isTest: true})
    var hostsButton = await wrapper.find('#Hosts');
    await hostsButton.trigger('click');
    expect(wrapper.text()).toContain("Complete list of Hosts")
  })

  it("Checking Achievements", async() => {
    var wrapper = mount(PassiveMode, {propsData: {passiveModeHosts:passiveModeHosts, passiveCategoryList:passiveModeCategoryList,passiveModeCountries:passiveModeCountries, totalRequests: totalRequests, passiveModeTotalTrackers: passiveModeTotalTrackers, passiveModeUniqueHosts: passiveModeUniqueHosts, passiveModeTotalCounties: passiveModeTotalCounties}});
    await wrapper.setData({isTest: true});    
    var achievements = await wrapper.find('#Achievements')
    await achievements.trigger('click');
    expect(wrapper.text()).toContain("Achievements")
    // Above test is broken due to the inability of Vitest to work with the extensions scripts. Therefore, an error will show instead of allowing us to test this. Will just give an error about chrome, due to the beforeUpdate() method.
  })

  it("Checking Countries", async() => {
    var wrapper = mount(PassiveMode, {propsData: {passiveModeHosts:passiveModeHosts, passiveCategoryList:passiveModeCategoryList,passiveModeCountries:passiveModeCountries, totalRequests: totalRequests, passiveModeTotalTrackers: passiveModeTotalTrackers, passiveModeUniqueHosts: passiveModeUniqueHosts, passiveModeTotalCounties: passiveModeTotalCounties}});
    await wrapper.setData({isTest: true})
    var countries = await wrapper.find('#Countries');
    await countries.trigger('click');
    expect(wrapper.text()).toContain("Complete list of Countries")
  })

  it("Exit to homepage", async() => {
    var wrapper = mount(PassiveMode, {propsData: {passiveModeHosts:passiveModeHosts, passiveCategoryList:passiveModeCategoryList,passiveModeCountries:passiveModeCountries, totalRequests: totalRequests, passiveModeTotalTrackers: passiveModeTotalTrackers, passiveModeUniqueHosts: passiveModeUniqueHosts, passiveModeTotalCounties: passiveModeTotalCounties}});
    await wrapper.setData({isTest: true})
    var homebutton = await wrapper.find('#Home');
    await homebutton.trigger('click');
    expect(wrapper.emitted().exitToHomePage).toBeTruthy();
  })


})
    



