/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import UsernameChangePage from '../UsernameChange.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

describe('UsernameChangePage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    var wrapper = mount(UsernameChangePage, {propsData: {UsersID: "TesterAccount"}});
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(UsernameChangePage, {propsData: {UsersID: "TesterAccount"}});
    expect(wrapper.text()).toContain("Your current username is: TesterAccount")
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()

    expect(wrapper.find('#Save').exists()).toBeTruthy();
    expect(wrapper.find('#Back').exists()).toBeTruthy();
  })

  it("Change username", async() => {
    var wrapper = mount(UsernameChangePage, {propsData: {UsersID: "TesterAccount"}});
    var inputForUN = await wrapper.find('#input');
    inputForUN.setValue = "Test123";
    var saveButton = await wrapper.find('#Save');
    saveButton.trigger('click');
    expect(wrapper.emitted().changeUsername).toBeTruthy();
  })

  it("clicking button", async() =>  {
    var wrapper = mount(UsernameChangePage, {propsData: {UsersID: "TesterAccount"}});
    var backButton = await wrapper.find('#Back');
    await backButton.trigger('click');
    expect(wrapper.emitted().exitToHomePage).toBeTruthy();
    //expect(wrapper.text()).toContain("Welcome Back")

    //Come back to - need to test clicking this works
  })
  
})
    


