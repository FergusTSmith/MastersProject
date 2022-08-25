/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import OptionsView from '../OptionsView.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

describe('UsernameChangePage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()

    expect(wrapper.find('.OptionsButton').exists()).toBeTruthy();
  })

  it("Logout", async() => {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    var logoutButton = await wrapper.find('#Logout');
    await logoutButton.trigger('click');
    console.log(wrapper.emitted().click.MouseEvent);
  })

  it("clicking change username", async() =>  {
    var wrapper = mount(OptionsView, {propsData: {UsersID: "TesterAccount"}});
    var changeUserButton = await wrapper.find('#ChangeUser');
    await changeUserButton.trigger('click');
    //expect(wrapper.emitted().changeUsername).toBeTruthy();
  })
})
    


