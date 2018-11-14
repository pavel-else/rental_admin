import { writeLog } from '@/functions/logs'

export default {
  state: {
    subOrders: []
  },
  mutations: {
    /**
    * Перед использованием данные сабордеров необходимо
    * 1) Обработать по типам
    * 2) Добавить end_time
    * 3) Просчитать и добавить bill_total
    */
    setSubOrders(state, subOrders) {
      if (!subOrders) {
        return [];
      }

      state.subOrders = subOrders.reduce((acc, item) => {
        const bill_access = Number(item.bill_access);
        const bill_rent = Number(item.bill_rent);
        const end_time = new Date(item.end_time);
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
            writeLog('subOrders.js, setSubOrders', 'parse error', { key: i, value: item[i] });
            stack[i] = item[i];
          }
        }

        // PART 2
        stack.bill_total = bill_access + bill_rent - sale;


        acc.push(stack);
        return acc;
      }, []);
    }
  },
  getters: {
    subOrders(state) {
      return state.subOrders
    }
  }
}