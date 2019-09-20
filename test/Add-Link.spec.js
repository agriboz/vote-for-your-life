import { mount } from '@vue/test-utils'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/nuxt'
import AddLink from '@/pages/add-Link.vue'

Vue.use(BootstrapVue)

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AddLink)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
