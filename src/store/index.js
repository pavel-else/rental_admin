import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import * as Stat from '@/functions/statistics'
import { writeLog } from '@/functions/logs'
import * as shortDate from '@/functions/date'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    subOrders: [],
    statistics: {}
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    setSubOrders(state, subOrders) {
      state.subOrders = subOrders;
    },
    setStatistics(state, statistics) {
      state.statistics = statistics;
    }
  },

  actions: {
    send({ commit, dispatch }) {
      console.log('front --> back');

      const url = 'http://overhost.net/rental2/api_v1/ajax/App/request.php';
      const config = {};
      const cmds = [
        'getHistory',
        'getSubOrders' 
      ];
      const queue = cmds.map(i => {
        return {cmd: i}
      });    

      axios({ method: 'post', url, data: { queue }, config })
      .catch(e => {
        console.log(e);
      })
      .then(r => {
        console.log('front <-- back', r);
        dispatch('setData', { _orders: r.data.history, _subOrders: r.data.sub_orders });
      })
    },

    setData({ commit }, { _subOrders, _orders }) {
      //
      // SET ORDERS
      if (!_orders) {
        return false;
      }

      const orders = _orders.reduce((acc, item) => {
        const order_id = Number(item.order_id);
        const id_rental_org = Number(item.id_rental_org);
        const advance = Number(item.advance);
        const start_time = new Date(item.start_time);

        const stack = { order_id, id_rental_org, advance, start_time };

        for (let i in stack) {
          if (isNaN(stack[i])) {
            // Если привести к числу не получается, выбрасываем предупреждение, оставляем свойство в исходном значении
            writeLog('index.js, setOrders', 'parse error', {order_id, key: i, value: item[i] });
            stack[i] = item[i];
          }
        }

        acc.push(stack);
        return acc;
      }, []);

      commit('setOrders', orders);

      //
      // SET SUBORDERS
      if (!_subOrders) {
        writeLog('index.js, setSubOrders', 'empty subOrders', { _subOrders });
        return [];
      }

      const subOrders = _subOrders.reduce((acc, item) => {

        const order = orders.find(i => i.order_id == item.order_id);
        // Сабордер не может существовать без ордера
        if (!order) {
          writeLog('index.js, setSubOrders', 'order not found', { order_id: item.order_id });
          return acc;
        }

        // Сабордер не имеющий начала не должен включаться в статистику
        if (isNaN(new Date(order.start_time))) {
          writeLog(
            'index.js, setSubOrders',
            'date parse error to start_time. This suborder is excluded from the statistics.',
            { start_time: order.start_time }
          );
          return acc;
        }

        const end_time = new Date(item.end_time);
        // Сабордер не имеющий конца не должен включаться в статистику
        if (isNaN(end_time)) {
          writeLog(
            'index.js, setSubOrders', 
            'date parse error to end_time. This suborder is excluded from the statistics.', 
            { order_id: item.order_id, end_time: item.end_time }
          );
          return acc;
        }

        // Далее следует провека типов свойств
        const bill_access = Number(item.bill_access);
        const bill_rent = Number(item.bill_rent);
        const id = Number(item.id);
        const id_rent = Number(item.id_rent);
        const id_rental_org = Number(item.id_rental_org);
        const order_id = Number(item.order_id);
        const pause_time = Number(item.pause_time);
        const sale = Number(item.sale);

        const stack = { bill_access, bill_rent, end_time, id, id_rent, id_rental_org, order_id, pause_time, sale };

        for (let i in stack) {
          if (isNaN(stack[i])) {
            // Если привести к числу не получается, выбрасываем предупреждение, оставляем свойство в исходном значении
            writeLog('index.js, setSubOrders', 'parse error', { order_id: item.order_id, key: i, value: item[i] });
            stack[i] = item[i];
          }
        }

        // Добавляется Cуммарная стоимость сабордера
        stack.bill_total = stack.bill_access + stack.bill_rent - stack.sale;

        // Добавляется время старта
        stack.start_time = order.start_time;

        acc.push(stack);
        return acc;
      }, []);

      commit('setSubOrders', subOrders);

      //
      // SET STATISTICS
      const statistics = Stat.create(subOrders);
      commit('setStatistics', statistics);
    }
  },

  getters: {
    orders: state => state.orders,
    subOrders: state => state.subOrders,

    /**
    * Геттер реализует механизм выдачи статистики на основании общей функции выборки информации (select) и роутера (switch).
    * В зависимости от приходящей команды (cmd) роутер передает выборку данных определенной функции для посл. обработки
    */
    statistics: (state) => ({ cmd, type, from, to, id }) => {
      if (!cmd) {
        writeLog('statistics, getters', 'cmd is not defined', { cmd });       
        return false;
      }

      if (!shortDate.makeDate(from) || !shortDate.makeDate(to)) {
        writeLog('statistics.js, getters', 'short date (from or to) is not defined', { from, to });
        return false;
      }

      if (!state.statistics) {
        writeLog('index.js, statistics (getters)', 'empty statistics', { statistics: state.statistics });
        return [];
      }

      switch (cmd) {
        case 'getStarts': return Stat.getRentStarts(state.statistics, from, to, id); // month & to-from
        case 'getStartsPerDay': return Stat.getRentStartsPerDay(state.statistics, from, to);
        case 'getStartsPerYear': return Stat.getRentStartsPerYear(state.statistics, from, to, id);
        
        case 'getCashPerMonth' : return Stat.getRentCash(state.statistics, from, to, id);
        case 'getCashPerFromTo' : return Stat.getRentCash(state.statistics, from, to, id);
        case 'getCashPerDay' : return Stat.getRentCashPerDay(state.statistics, from, to, id);
        //case 'getHours'
        default : writeLog('statistics.js, select', 'unknown cmd', { cmd });
      }
    }
  }
});
