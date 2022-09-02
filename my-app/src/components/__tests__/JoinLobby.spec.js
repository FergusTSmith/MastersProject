/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the JoinLobby.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import JoinLobby from '../JoinLobby.vue';
import { describe, expect, test, it } from 'vitest';

describe('Join Lobby Component Unit Tests: ', () => {
    
    test('is a Vue instance', () => {
      const wrapper = mount(JoinLobby);
      expect(wrapper).toBeTruthy();
    })
  
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(JoinLobby);
        expect(wrapper.text()).toContain("Enter Lobby ID")
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.find('img').exists()).toBeTruthy()
        expect(wrapper.find('button').exists()).toBeTruthy()
    })
  
    it("Clicking buttons and entering a new username", async() => {
        var wrapper = mount(JoinLobby);
        var join = await wrapper.find('#Join');
        await join.trigger('click');
        var textBod = await wrapper.find('#LobbyID');
        textBod.setValue("1g55h6");
        await join.trigger('click');
        expect(wrapper.emitted().enterLobby).toBeTruthy();

        wrapper = mount(JoinLobby);
        var backButton = await wrapper.find('#Back').trigger('click');
        expect(wrapper.emitted().exitToHomePage).toBeTruthy();
    })
  
    
  })