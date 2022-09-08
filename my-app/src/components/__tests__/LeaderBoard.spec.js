/* The unit tests for this application were inspired by the following tutorial: [1] P. Mohan, ‘How to Test Your Vue Components Using the Jest Testing Framework | DigitalOcean’, Mar. 21, 2020. https://www.digitalocean.com/community/tutorials/vuejs-vue-testing (accessed Sep. 02, 2022). */

/* This file provides the Unit Tests for the LeaderBoard.vue component.
 Please note that the tests are limited in coverage due to Vite's inability to imitate server client interactions, or interactions between components. 
*/
import { mount } from '@vue/test-utils';
import LeaderBoard from '../LeaderBoard.vue';
import { describe, expect, test, it } from 'vitest';

// Initialising prop data in order to mount the Component
const gamesWon = 10;
const gamesPlayed = 100;
const personalSoloHS = [{username: "Goose96", Score: 23, createdAt: "01/01/2000", startTime:120}, {username: "Goose96", Score: 48, createdAt: "01/01/2000" , startTime:120}, {username: "Goose96", Score: 67, createdAt: "01/01/2000", startTime:120}, {username: "Goose96", Score: 120, createdAt: "01/01/2000", startTime:120}]
const soloClassicLeaderboard = [{username: "Test", Score: 100, createdAt: "01/01/2000", startTime:120}, {username: "Test", Score: 48, createdAt: "01/01/2000", startTime:300}, {username: "Test", Score: 67, createdAt: "01/01/2000"}, {username: "Test", Score: 120, createdAt: "01/01/2000", startTime:600}]
const multiClassicLeaderboard = [{username: "Test", Score: 23456, createdAt: "01/01/2000", startTime:120}, {username: "Test", Score: 6532, createdAt: "01/01/2000", startTime:300}, {username: "Test", Score: 1146, createdAt: "01/01/2000"}, {username: "Test", Score: 7542, createdAt: "01/01/2000", startTime:600}]

describe('HomePage Component Unit Tests: ', () => {
    // First test ensures that this component mounts correctly.
    test('is a Vue instance', () => {
      const wrapper = mount(LeaderBoard);
      expect(wrapper).toBeTruthy();
    })
    // Second test ensures that all the expected DOM elements are rendered as expected.
    it("All DOM Components render correctly", async() => {
      var wrapper = mount(LeaderBoard, {propsData: { gamesWon: gamesWon, gamesPlayed: gamesPlayed, personalSoloHS: personalSoloHS, soloClassicLeaderboard: soloClassicLeaderboard, multiClassicLeaderboard: multiClassicLeaderboard}});
      expect(wrapper.text()).toContain("Username | Score | Date");
      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.find('img').exists()).toBeFalsy()
      expect(wrapper.find('button').exists()).toBeTruthy()
    })
    // This test ensures that the correct use scores are shown for different combinations of solo/multiplayer and 2/5/10 minute rounds.
    it("Correct scores are displayed", async() => {
        var wrapper = mount(LeaderBoard, {propsData: { gamesWon: gamesWon, gamesPlayed: gamesPlayed, personalSoloHS: personalSoloHS, soloClassicLeaderboard: soloClassicLeaderboard, multiClassicLeaderboard: multiClassicLeaderboard}});
        var twoMinButton = await wrapper.find('#twoMin');
        var soloButton = await wrapper.find('#solo')
        
        await soloButton.trigger('click')
        await twoMinButton.trigger('click')

        var leadboard = await wrapper.find('#SoloBoard')
        console.log(leadboard);

        console.log(wrapper.text())

        expect(wrapper.text()).toContain("Test")

        var multiButton = await wrapper.find('#multi');
        await multiButton.trigger('click');
        
        expect(wrapper.text()).toContain("23456");

        var fiveMinButton = await wrapper.find('#fiveMin');
        await fiveMinButton.trigger('click');

        expect(wrapper.text()).toContain("6532");

        var tenMinButton = await wrapper.find('#tenMin');
        await tenMinButton.trigger('click');

        expect(wrapper.text()).toContain("7542")

    })
})