/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the Achievements.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import AchievementsView from '../AchievementsView.vue';
import { describe, expect, test, it } from 'vitest';

const achievements = [{name: "From Paris to Berlin", achieved: "Not Unlocked"}]


describe('HomePage Component Unit Tests: ', () => {
    // Tests that the wrapper successfully mounts
    test('is a Vue instance', () => {
      const wrapper = mount(AchievementsView);
      expect(wrapper).toBeTruthy();
    })
    // This just checks that all the DOM elements render correctly, and that the buttons emit the correct events.
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(AchievementsView, {propsData: { achievements: achievements}});
      expect(wrapper.text()).toContain("Passive Mode Achievements are unlocked while passively browsing");
      expect(wrapper.find('h2').exists()).toBeFalsy()
      expect(wrapper.find('img').exists()).toBeFalsy()
      expect(wrapper.find('button').exists()).toBeTruthy()
      expect(wrapper.text()).toContain("From Paris to Berlin");
      expect(wrapper.text()).toContain("Not Unlocked")

      var backButton = await wrapper.find('#Back');
      backButton.trigger('click');
      expect(wrapper.emitted().backToPassive).toBeTruthy();

      var HomeButton = await wrapper.find('#Home');
      HomeButton.trigger('click');
      expect(wrapper.emitted().exitToHomePage).toBeTruthy();
    })
})