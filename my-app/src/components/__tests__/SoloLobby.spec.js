/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the SoloLobby.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import SoloLobby from '../SoloLobby.vue';
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
    await classicRadio.setChecked()
    expect(classicRadio.element.checked).toBeTruthy();
    var bingoRadio = wrapper.find('#Bingo')
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

  it("Clicking different buttons", async() => {
    var wrapper = mount(SoloLobby, {propsData: { personalSoloHS: testScores}});
    var beginGame = await wrapper.find('.BeginGame');
    await beginGame.trigger('click');
    expect(wrapper.text()).toContain("Solo Mode - Classic");

    wrapper = mount(SoloLobby, {propsData: { personalSoloHS: testScores}});
    var exitGame = await wrapper.find('#Exit');
    await exitGame.trigger('click');
    expect(wrapper.emitted().exitToHomePage).toBeTruthy();
  })
  it("Display boxes", async() => {
    var wrapper = mount(SoloLobby, {propsData: { personalSoloHS: testScores}});
    var infoButton = await wrapper.find('#Info');
    await infoButton.trigger('click');
    console.log(wrapper.text());
    expect(wrapper.text()).toContain("In Classic mode, points are awarded");
  })
  
})
    


