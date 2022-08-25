/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import IntroPage from '../IntroPage.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

describe('IntroPage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(IntroPage);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(IntroPage);
    expect(wrapper.text()).toContain("Who is watching you?" && "To use TrackerHunt")
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  it("size of logo is correct", () => {
    var wrapper = mount(IntroPage);
    const image = wrapper.get('img');
  })

  it("clicking button", async() =>  {
    var wrapper = mount(IntroPage);
    await wrapper.find('button').trigger('click');
    //expect(wrapper.text()).toContain("Welcome Back")

    //Come back to - need to test clicking this works
  })
  
})
    


