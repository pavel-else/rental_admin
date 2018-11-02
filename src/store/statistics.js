import {writeLog} from '@/functions/logs'
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

        const objectDate = new Date(order.start_time)
        const year = objectDate.getFullYear()
        const month = objectDate.getMonth() + 1 <= 9 ? '0' + objectDate.getMonth() + 1 : objectDate.getMonth() + 1
        const date = objectDate.getDate()

        const day = (year && month && date) ? `${year}-${month}-${date}` : undefined

        if (!day) {
          writeLog('State, setStatstics', 'error to parse date', {year, month, date})
          return acc
        }

        if (acc[day]) {
          acc[day].push(item)
        } else {
          acc[day] = [item]
        }

        return acc
      }, {})

      state.statistics = statistics
    }
  },
  getters: {
    statistics: state => ({from, to, id }) => {

    }
  }
  // this.$store.getters.statistics('cashTotal', '2018-09-01 00:00', '2018-09-30 23:59', 8800000001) // 15890 
}