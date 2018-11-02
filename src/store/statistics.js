import {writeLog} from '@/functions/logs'
export default {
  state: {
    statistics: {
      '2018-09-01' : [],
      '2018-09-01' : []
    }

    //   dates: ['2018-09-01', '2018-09-02', '2018-09-03'],
    //   rentCount: {
    //     8800000001: [20, 22, 8],
    //     9900000002: [0, 0, 0]
    //   },
    //   rentHours: {
    //     8800000001: [17.6, 22.4, 11.1],
    //     9900000002: [0, 0, 0]
    //   },
    //   rentCash: {
    //     8800000001: [2200, 3220, 1540],
    //     9900000002: [0, 0, 0]
    //   }
    // }
  },
  mutations: {
    /*
     * Метод приводит статисику к виду:
     * statistics: {'2018-09-01': [{subOrder1}, subOrder2, ...], '2018-09-02': [{subOrder3}, subOrder4, ...], ...}
     */
    setStatistics(state, {subOrders, orders}) {
      if (!subOrders) {
        return {}
      }

      const statistics = subOrders.reduce((acc, item) => {
        if (!item.start_time) {
          writeLog('State, setStatistics', 'unknown start_time', item.start_time)
          return acc
        }

        const objectDate = new Date(item.start_time)
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
    statistics: state => ({ cmd, from, to, id }) => {
      switch (cmd) {
        case 'cash' : return getCash(state.statistics, from, to, id)
      }
    }
  }
  // this.$store.getters.statistics('cashTotal', '2018-09-01 00:00', '2018-09-30 23:59', 8800000001) // 15890 
}

const getCash = (statistics, from, to, id) => {
  return 'statistics'
}