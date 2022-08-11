import { mount } from '@vue/test-utils';
import JoinLobby from '../JoinLobby.vue';
//import { render, screen } from "@testing-library/vue"
import { describe, expect, test, it } from 'vitest';

describe('HomePage Component Unit Tests: ', () => {
    
    test('is a Vue instance', () => {
      const wrapper = mount(JoinLobby);
      expect(wrapper).toBeTruthy();
    })
  
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(JoinLobby);
        expect(wrapper.text()).toContain("Enter lobby ID")
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.find('img').exists()).toBeTruthy()
        expect(wrapper.find('button').exists()).toBeTruthy()
    })
  
    it("Clicking buttons and entering a new username", async() => {
        var wrapper = mount(JoinLobby);
        var join = await wrapper.find('#Join');
        await join.trigger('click');

        //expect(wrapper.emitted().enterLobby).toBeFalsy(); Come back to to fix this test;

        var textBod = await wrapper.find('#LobbyID');
        textBod.setValue("1g55h6");
        await join.trigger('click');
        expect(wrapper.emitted().enterLobby).toBeTruthy();
    })
  
    
  })