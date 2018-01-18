export default {
  namespaced: true,
  state: {
    init: false,
    page_show: false,
    swiper_list: [],
    rec_hot: [],
    share: {}
  },
  mutations: {
    setState (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    setState ({commit}, data) {
      commit('setState', data)
    }
  }
}
