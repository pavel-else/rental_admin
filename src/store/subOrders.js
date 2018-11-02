import moment from 'moment'

export default {
  state: {
    subOrders: []
  },
  mutations: {
    setSubOrders(state, subOrders) {
      if (!subOrders) {
        return []
      }
      state.subOrders = subOrders
    }
  },
  getters: {
    subOrders(state) {
      return state.subOrders
    }
  }
}