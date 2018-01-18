export default{
  namespaced: true,
  state: {
    init: false,
    user: {}
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
