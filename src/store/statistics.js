import {writeLog} from '@/functions/logs'
import makeShortDate from '@/functions/makeShortDate'
import getNextDay from '@/functions/getNextDay'
import * as shortDate from '@/functions/date'
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
    statistics: state => ({ cmd, type, from, to, id }) => {
      if (!cmd) {
        writeLog('statistics, getters', 'cmd is not defined', {cmd})        
        return false
      }

      if (!makeShortDate(from) || !makeShortDate(to)) {
        writeLog('statistics.js, getters', 'short date (from or to) is not defined', {from, to})
        return false
      }

      /**
      * Функция осуществляет выборку объектов из заданного отрезка времени из всей статистики.
      * Возвращает массив типа: [0:[{s1}, {s2}], 1:[{s4}, {s5}], ...]
      */
      const select = (from, to, id) => {
        const period = shortDate.createPeriod(from, to)
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
        case 'getStarts': return getRentStarts(select(from, to, id));
        case 'getStartsPerDay': return getRentStartsPerDay(select(from, to, id), from, to);
        //case 'getCash'
        //case 'getHours'
      }
    }
  }
}

const getRentStarts = (list) => {
  if (!list) {
    writeLog('statistics.js, getRentStarts', 'not statistics entered', {list})
    return []
  }
  if (!list.map) {
    writeLog('statistics.js, getRentStarts', 'statistics list in not an array', {list})
    return []
  }

  return list.map(i => {
    return (i && i.length) ? i.length : 0
  })
};

const getRentStartsPerDay = (selected, from, to) => {

// Сливаем результаты с разными датами в единый массив данных
// [{}, {}, {}]
  const collapse = selected.reduce((acc, item) => {
    if (item && item.length > 0) {
      acc = [...acc, ...item];
    }
    return acc;
  }, []);
  
  // Подсчитываем результаты для каждого часа
  // {21: 2, 23: 1}
  const result = collapse.reduce((acc, item) => {
    const h = shortDate.getCurrentHours(item.start_time);

    if (acc[h]) {
      acc[h] += 1;
    } else {
      acc[h] = 1;
    }
    return acc;
  }, {});

  // Готовим статистику Для каждого часа в в виде
  // [0, 0, 0, 2, 0]
  const period = shortDate.createPeriod(from, to, 'Day');
  return period.map(i => {
    return result[i] ? result[i] : 0;
  });
};