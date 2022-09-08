/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the IntroPage.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import IntroPage from '../IntroPage.vue';
import { describe, expect, test, it } from 'vitest';

describe('IntroPage Component Unit Tests: ', () => {
  // First test ensures that this component successfully mounts.
  test('is a Vue instance', () => {
    const wrapper = mount(IntroPage);
    expect(wrapper).toBeTruthy();
  })
  // Second test ensures that all expected DOM elements are rendered
  it("All DOM Components render correctly", async() => {
    var wrapper = mount(IntroPage);
    expect(wrapper.text()).toContain("Who is watching you?" && "To use TrackerHunt")
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()
  })
  // Originally made to determine whether the logo was the correct size, however, cannot check this with Vitest. Therefore, it now just ensures the logo is rendered.
  it("Check that logo is rendered", () => {
    var wrapper = mount(IntroPage);
    const image = wrapper.get('img');
    expect(wrapper.find('img').exists())
  })
  // Test for clicking the button and ensuring an event is fired. In this instance, we cannot check the full functionality as we cannot communicate with background scripts while unit testing. 
  it("clicking button", async() =>  {
    var wrapper = mount(IntroPage);
    await wrapper.find('button').trigger('click');
    // We can't test the login functionality here as Vitest can't replicate interactions with background scripts. 
    expect(wrapper.text()).toContain("TrackerHunt")
  })
  
})
    


