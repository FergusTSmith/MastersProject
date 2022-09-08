/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the Options.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import OptionsView from '../OptionsView.vue';
import { describe, expect, test, it } from 'vitest';

describe('UsernameChangePage Component Unit Tests: ', () => {
  // Ensures that the component can be mounted as expected.
  test('is a Vue instance', () => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    expect(wrapper).toBeTruthy();
  })
  // Ensures all the DOM elements of the Options page render as expected.
  it("All DOM Components render correctly", async() => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('.OptionsButton').exists()).toBeTruthy();
  })
  // This was designed to test the logout functionality. But, as we can't communicate with the background scripts, we can only ensure that a mouse event is emitted. 
  it("Logout", async() => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    var logoutButton = await wrapper.find('#Logout');
    await logoutButton.trigger('click');
    expect(wrapper.emitted().click.MouseEvent);
    // Can't check emission here due to lack of ability to communicate with background scripts.
  })
  // Ensures that clicking the change username page actually changes the DOM
  it("clicking change username", async() =>  {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    var changeUserButton = await wrapper.find('#ChangeUser');
    await changeUserButton.trigger('click');
    expect(wrapper.text()).toContain('Your current username')
  })
  // Made to test the pause blocking functionality. However, as we can't communicate with the background scripts, we cannot test this functionality, and can only test for if a mouse event is heard.
  it("Clicking pause blocking", async() => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    // Can't actually test this as we can't communicate with the background scripts.
    var pause = await wrapper.find('#Pause');
    await pause.trigger('click');
    expect(wrapper.emitted().click.MouseEvent);
  })
})
    


