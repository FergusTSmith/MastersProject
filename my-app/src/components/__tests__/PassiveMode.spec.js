/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */

import { mount } from '@vue/test-utils';
import PassiveMode from '../PassiveMode.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

var totalRequests = 1000;
var passiveModeTotalTrackers = 100;
var passiveModeUniqueHosts = 10;
var passiveModeTotalCounties = 3;

describe('PassiveMode Component Unit Tests: ', () => {
    
  test('is a Vue instance', () => {
    const wrapper = mount(PassiveMode);
    expect(wrapper).toBeTruthy();
  })

  it("All DOM Components render correctly", async() => {
    var wrapper = mount(PassiveMode, {propsData: { totalRequests: totalRequests, passiveModeTotalTrackers: passiveModeTotalTrackers, passiveModeUniqueHosts: passiveModeUniqueHosts, passiveModeTotalCounties: passiveModeTotalCounties}});
    console.log(wrapper.text())
    expect(wrapper.text()).toContain("Blocked Requests: 100")
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeFalsy()
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.text()).toContain("Total Requests: 1000");
    expect(wrapper.findComponent('PassiveModeChart')).toBeTruthy();
  })
})
    


