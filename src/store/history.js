export default {
  state: {
    history: []
  },
  mutations: {
    setHistory(state, history) {
      state.history = history
    }
  },
  getters: {
    getHistory(state) {
      return state.history
    }
  }
}