import {writeLog} from '@/functions/logs'
import makeShortDate from '@/functions/makeShortDate'

export default {
  state: {
    statistics: {}
  },
  mutations: {
    /*
     * Метод приводит статисику к виду:
     * statistics: {'2018-09-01': [{subOrder1}, subOrder2, ...], '2018-09-02': [{subOrder3}, subOrder4, ...], ...}
     */
    setStatistics(state, {subOrders, orders}) {
      if (!subOrders || !orders) {
        writeLog('State, setStatistics', 'empty suborders or orders', {subOrders, orders})
        return {}
      }

      const statistics = subOrders.reduce((acc, item) => {
        const order = orders.find(i => i.order_id === item.order_id)

        if (!order) {
          writeLog('State, setStatistics', 'order not found', item.order_id)
          return acc
        }
        if (!order.start_time) {
          writeLog('State, setStatistics', 'unknown start_time', order.order_id)
          return acc
        }

        const date = makeShortDate(order.start_time)

        if (!date) {
          writeLog('State, setStatstics', 'error to parse date', order.start_time)
          return acc
        }

        if (acc[date]) {
          acc[date].push(item)
        } else {
          acc[date] = [item]
        }

        return acc
      }, {})

      state.statistics = statistics
    }
  },
  getters: {
    statistics: state => ({cmd, from, to, id }) => {
      const select = (from, to, id) => {

      }
      switch (cmd) {
        case 'getCount' : getRentCount()
      }

    }
  }
}

const getRentCount = () => {}