import { mount } from '@vue/test-utils';
import HostsView from '../HostsView.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

const passiveModeHosts = [{name: "Example.com", count: 4}, {name: "test.com", count: 6 }, {name: "Lol.com", count: 2},]

describe('HomePage Component Unit Tests: ', () => {
    
    test('is a Vue instance', () => {
      const wrapper = mount(HostsView);
      expect(wrapper).toBeTruthy();
    })
  
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(HostsView, {propsData: { passiveModeHosts: passiveModeHosts}});
      expect(wrapper.text()).toContain("Passive Mode - Complete list of Hosts");
      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.find('img').exists()).toBeFalsy()
      expect(wrapper.find('button').exists()).toBeTruthy()
    })

    it("All buttons click correctly", async() => {
        
    })
})