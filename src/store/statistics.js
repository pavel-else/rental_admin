import {writeLog} from '@/functions/logs'
import makeShortDate from '@/functions/makeShortDate'
import getNextDay from '@/functions/getNextDay'
import createPeriod from '@/functions/createPeriod'
import copy from '@/functions/copy'

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

      const statistics = subOrders.reduce((acc, _item) => {
        const item = copy(_item)
        const order = copy(orders.find(i => i.order_id === item.order_id))

        if (!order) {
          writeLog('State, setStatistics', 'order not found', item.order_id)
          return acc
        }
        if (!order.start_time) {
          writeLog('State, setStatistics', 'unknown start_time', order.order_id)
          return acc
        }

        item.start_time = order.start_time

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
    /**
    * Геттер реализует механизм выдачи статистики на основании общей функции выборки информации (select) и роутера (switch).
    * В зависимости от приходящей команды (cmd) роутер передает выборку данных определенной функции для посл. обработки
    */
    statistics: state => ({ cmd, from, to, id }) => {
      if (!cmd) {
        writeLog('statistics, getters', 'cmd is not defined', {cmd})        
        return false
      }

      if (!makeShortDate(from) || !makeShortDate(to)) {
        writeLog('statistics.js, getters', 'short date (from or to) is not defined', {from, to})
        return false
      }

      const select = (from, to, id) => {
        /**
        * Функция осуществляет выборку объектов из заданного отрезка времени из всей статистики.
        * Возвращает массив типа: [0:[{s1}, {s2}], 1:[{s4}, {s5}], ...]
        */
        const period = createPeriod(from, to)
        if (!period) {
          writeLog('State, select', 'error creating period. period not defined', {period, from, to})
          return null
        }
        
        return period.map(i => {
          const statisticsOfDay = state.statistics[i]
          // id? filter
          return statisticsOfDay
        })
      }

      switch (cmd) {
        case 'getCount': return getRentCount(select(from, to, id))
        //case 'getCash'
        //case 'getHours'
      }
    }
  }
}

const getRentCount = (list) => {
  if (!list) {
    writeLog('statistics.js, getRentCount', 'not statistics entered', {list})
    return []
  }
  if (!list.map) {
    writeLog('statistics.js, getRentCount', 'statistics list in not an array', {list})
    return []
  }
  console.log(list)

  return list.map(i => {
    return (i && i.length) ? i.length : 0
  })
}