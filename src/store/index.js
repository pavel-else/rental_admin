import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import history from './history'
import subOrders from './subOrders'
import statistics from './statistics'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    subOrders,
    statistics
  },

  actions: {
    /*
    * Функция предназначена для отправки данных на сервер и обработки ответа с сервера
    * Принимает массив объектов в формате [{cmd, value}, {cmd, value}]
    * Также может принимать и одиночные объекты {cmd, value}, функция обернет в массив автоматом
    * На сервер отправляется массив, содерж во-первых сеттеры, во-вторых геттеры для обновл. фронта
    * Сеттеров может и не быть, тогда отправляются только команды обновления
    * Внимание! Здесь все асинхронно!
    */
    send({commit}) {
      console.log('front --> back')

      const url = 'http://overhost.net/rental2/api_v1/ajax/App/request.php'
      const config = {}
      const cmds = [
        'getHistory',
        'getSubOrders' 
      ]
      const queue = cmds.map(i => {
        return {cmd: i}
      })     

      axios({
          method: 'post',
          url,
          data: {
            queue
          },
          config          
      })
      .catch(e => {
        console.log(e)
      })
      .then(r => {
        console.log('front <-- back', r)

        commit('setHistory', r.data.history)
        commit('setSubOrders', {subOrders: r.data.sub_orders, orders: r.data.history})
        commit('setStatistics', {subOrders: r.data.sub_orders, orders: r.data.history})
      })
    }
  },
})