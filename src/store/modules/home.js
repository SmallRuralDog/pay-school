export default {
  namespaced: true,
  state: {
    loading: false,
    page: 1,
    no_more: false,
    load_err: false,
    load_more_tip: '别拉了，到底了',
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
