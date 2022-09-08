/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the HostPage.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import HostsView from '../HostsView.vue';
import { describe, expect, test, it } from 'vitest';

// Initialising prop data in order to mount the Component
const passiveModeHosts = [{name: "Example.com", count: 4}, {name: "test.com", count: 6 }, {name: "Lol.com", count: 2},]

describe('HomePage Component Unit Tests: ', () => {
    // First test ensures that the component successfully mounts.
    test('is a Vue instance', () => {
      const wrapper = mount(HostsView);
      expect(wrapper).toBeTruthy();
    })
    // Second test ensures that all expected DOM elements are rendered.
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(HostsView, {propsData: { passiveModeHosts: passiveModeHosts}});
      expect(wrapper.text()).toContain("Passive Mode - Complete list of Hosts");
      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.find('img').exists()).toBeFalsy()
      expect(wrapper.find('button').exists()).toBeTruthy()
    })
    // Last test checks that the Homepage and Back buttons work as expected.
    it("All buttons click correctly", async() => {
      var wrapper = mount(HostsView, {propsData: { passiveModeHosts: passiveModeHosts}});
      await wrapper.find('#Home').trigger('click');
      expect(wrapper.emitted().exitToHomePage).toBeTruthy();
      
      wrapper = mount(HostsView, {propsData: { passiveModeHosts: passiveModeHosts}});
      await wrapper.find('#Back').trigger('click');
      expect(wrapper.emitted().HostToPassive).toBeTruthy();
    })
})