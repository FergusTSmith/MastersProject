/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the CountryView.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import CountryView from '../CountryView.vue';
import { describe, expect, test, it } from 'vitest';

// Initialising prop data in order to mount the Component
const passiveCountryLabels = ["France", "United Kingdom", "United States"];
const passiveCountryCounts = [10, 13, 20];
const passiveModeCountries = [{name: "France", count: 10, shortname: "France"}, {name: "United Kingdom", count: 13, shortname: "UnitedKingdom"}, {name: "United States", count: 20, shortname: "United States"}];

describe('HomePage Component Unit Tests: ', () => {
    // First test this successfully mounts
    test('is a Vue instance', () => {
      const wrapper = mount(CountryView);
      expect(wrapper).toBeTruthy();
    })
    // Second test is to ensure all the correct DOM elements appear on the page
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(CountryView, {propsData: { passiveCountryLabels: passiveCountryLabels, passiveCountryCounts: passiveCountryCounts, passiveModeCountries: passiveModeCountries }});
      expect(wrapper.text()).toContain("Passive Mode - Complete list of Countries");
      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.find('img').exists()).toBeTruthy()
      expect(wrapper.find('button').exists()).toBeTruthy()
      expect(wrapper.find('#HomePage').exists()).toBeTruthy()
      expect(wrapper.find('#Back').exists()).toBeTruthy()
      expect(wrapper.find('li').exists()).toBeTruthy()
    })
    // This test is for the home button and ensures that this fires its event as expected
    it("Home Button work as expected", async() => {
      var wrapper = mount(CountryView, {propsData: { passiveCountryLabels: passiveCountryLabels, passiveCountryCounts: passiveCountryCounts, passiveModeCountries: passiveModeCountries }});
      var homePageButton = await wrapper.find('#HomePage');
      await homePageButton.trigger('click');
      expect(wrapper.emitted().exitToHomePage).toBeTruthy;
    })
    // This test is for the back button and ensures that the event is fired by this button successfully.
    it("Back button works as expected", async() => {
      var wrapper = mount(CountryView, {propsData: { passiveCountryLabels: passiveCountryLabels, passiveCountryCounts: passiveCountryCounts, passiveModeCountries: passiveModeCountries }});
      var BackButton = await wrapper.find('#Back');
      await BackButton.trigger('click');
      expect(wrapper.emitted().CountToPassive).toBeTruthy;
    })


})