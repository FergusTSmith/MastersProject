/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import SoloLobby from '../SoloLobby.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

const testScores = [{username: "Goose96", Score: 23, createdAt: "01/01/2000"}, {username: "Goose96", Score: 48, createdAt: "01/01/2000"}, {username: "Goose96", Score: 67, createdAt: "01/01/2000"}, {username: "Goose96", Score: 120, createdAt: "01/01/2000"}]

describe('HomePage Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(SoloLobby);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(SoloLobby, {propsData: { personalSoloHS: testScores}});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Solo Mode")
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('input[type="radio"')).toBeTruthy()
    expect(wrapper.find('li').exists()).toBeTruthy()
    expect(wrapper.text()).toContain("Goose96");
    expect(wrapper.text()).toContain("01/01/2000");
    expect(wrapper.text()).toContain("23")
  })

  it("clicking GameMode buttons", async() => {
    var wrapper = mount(SoloLobby, {propsData: { personalSoloHS: testScores}});
    var classicRadio = await wrapper.find('#Classic')
    //classicRadio.element.selected = true;
    await classicRadio.setChecked()
    expect(classicRadio.element.checked).toBeTruthy();
    var bingoRadio = wrapper.find('#Bingo')
    //bingoRadio.element.selected = true;
    await bingoRadio.setChecked();
    expect(classicRadio.element.checked).toBeFalsy();
    expect(bingoRadio.element.checked).toBeTruthy();
  })

  it("Clicking round length buttons", async() => {
    var wrapper = mount(SoloLobby, {propsData: { personalSoloHS: testScores}});
    var TwoMin = await wrapper.find('#twoMin');
    await TwoMin.setChecked();
    expect(TwoMin.element.checked).toBeTruthy();
    var FiveMin = await wrapper.find('#fiveMin');
    await FiveMin.setChecked();
    expect(FiveMin.element.checked).toBeTruthy();
    expect(TwoMin.element.checked).toBeFalsy();
  })
  
})
    


