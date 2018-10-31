import moment from 'moment'

export default {
  state: {
    subOrders: []
  },
  mutations: {
    setSubOrders(state, {subOrders, orders}) {
      if (!subOrders) {
        return 
      }

      state.subOrders = subOrders.reduce( (acc, item) => {
        const order = orders.find(order => order.order_id == item.order_id)

        if (order && order.start_time && item.end_time) {
          item.start_time = order.start_time

          acc.push(item)
        }

        return acc
      }, [])

      //console.log(state.subOrders)
    }
  },
  getters: {
    subOrders(state) {
      return state.subOrders
    }
  }
}