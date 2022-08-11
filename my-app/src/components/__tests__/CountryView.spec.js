import { mount } from '@vue/test-utils';
import CountryView from '../CountryView.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

const passiveCountryLabels = ["France", "United Kingdom", "United States"];
const passiveCountryCounts = [10, 13, 20];
const passiveModeCountries = [{name: "France", count: 10, shortname: "France"}, {name: "United Kingdom", count: 13, shortname: "UnitedKingdom"}, {name: "United States", count: 20, shortname: "United States"}];

describe('HomePage Component Unit Tests: ', () => {
    
    test('is a Vue instance', () => {
      const wrapper = mount(CountryView);
      expect(wrapper).toBeTruthy();
    })
  
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(CountryView, {propsData: { passiveCountryLabels: passiveCountryLabels, passiveCountryCounts: passiveCountryCounts, passiveModeCountries: passiveModeCountries }});
      expect(wrapper.text()).toContain("Passive Mode - Complete list of Countries");
      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.find('img').exists()).toBeTruthy()
      expect(wrapper.find('button').exists()).toBeTruthy()
    })
})