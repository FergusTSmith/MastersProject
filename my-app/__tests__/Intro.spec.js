/* Following This tutorial: https://www.digitalocean.com/community/tutorials/vuejs-vue-testing */
module.exports = {
    preset: '@vue/cli-plugin-unit-jest'
  }

import { mount } from '@vue/test-utils'
import App from './../src/App.vue'
import IntroPage from '@/components/IntroPage.vue'
import { describe, expect } from 'vitest'

describe('IntroPage Component Unit Tests: ', () => {
    const wrapper = mount(IntroPage);
    expect(wrapper.isVueInstance()).toBeTruthy();
})

