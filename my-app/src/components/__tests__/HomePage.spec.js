/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import HomePage from '../HomePageView.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

describe('HomePage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(HomePage);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var UsersID = "TestUser"
    var wrapper = mount(HomePage, {propsData: { UsersID: UsersID}});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Welcome back, " + UsersID)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('button').exists()).toBeTruthy()
  })

  it("size of logo is correct", () => {
    var wrapper = mount(HomePage);
    const image = wrapper.get('img');
  })

  it("clicking solo", async() => {
    var wrapper = mount(HomePage);
    await wrapper.find('#Solo').trigger('click');
    console.log(wrapper.text());
  })
  
})
    


