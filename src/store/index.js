import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import member from './modules/member'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
  modules: {
    home,
    member
  },
  strict: true
})
store.registerModule('common', {
  state: {
    pageScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updatePagePosition (state, payload) {
      state.pageScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updatePagePosition ({commit}, top) {
      commit({type: 'updatePagePosition', top: top})
    }
  }
})

export default store
