/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the IntroPage.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import IntroPage from '../IntroPage.vue';
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

  it("Check that logo is rendered", () => {
    var wrapper = mount(IntroPage);
    const image = wrapper.get('img');
    // Wanted to check the logo was rendered with the correct dimensions, but I don't think you can check that with Vitest.
    expect(wrapper.find('img').exists())
  })

  it("clicking button", async() =>  {
    var wrapper = mount(IntroPage);
    await wrapper.find('button').trigger('click');
    // We can't test the login functionality here as it can't replicate interactions with background scripts.
    expect(wrapper.text()).toContain("TrackerHunt")
  })
  
})
    


