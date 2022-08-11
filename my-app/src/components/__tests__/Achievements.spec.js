import { mount } from '@vue/test-utils';
import AchievementsView from '../AchievementsView.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

const achievements = [{name: "From Paris to Berlin", achieved: "Not Unlocked"}]


describe('HomePage Component Unit Tests: ', () => {
    
    test('is a Vue instance', () => {
      const wrapper = mount(AchievementsView);
      expect(wrapper).toBeTruthy();
    })
  
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(AchievementsView, {propsData: { achievements: achievements}});
      expect(wrapper.text()).toContain("Passive Mode Achievements are unlocked while passively browsing");
      expect(wrapper.find('h2').exists()).toBeFalsy()
      expect(wrapper.find('img').exists()).toBeFalsy()
      expect(wrapper.find('button').exists()).toBeTruthy()
      expect(wrapper.text()).toContain("From Paris to Berlin");
      expect(wrapper.text()).toContain("Not Unlocked")
    })
})