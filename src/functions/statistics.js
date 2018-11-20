import writeLog from '@/functions/logs'
import * as shortDate from'@/functions/date'

/*
* Функция приводит статисику к виду:
* statistics: {'2018-09-01': [{subOrder1}, subOrder2, ...], '2018-09-02': [{subOrder3}, subOrder4, ...], ...}
* Используется в mutations
*/
/* makeStatisticsMap */
export const create  = (subOrders) => {
  if (!subOrders) {
    writeLog('index.js, setStatistics', 'empty suborders', { subOrders });
    return {};
  }

  const statistics = subOrders.reduce((acc, item) => {
    const date = shortDate.makeDate(item.start_time);

    if (!date) {
      writeLog('index.js, setStatstics', 'error to parse date', { start_time: start_time });
      return acc;
    }

    if (acc[date]) {
      acc[date].push(item);
    } else {
      acc[date] = [item];
    }

    return acc;
  }, {});

  // console.log(statistics)
  return statistics;
};


/**
* Функция осуществляет выборку объектов из заданного отрезка времени по всей статистики.
* Возвращает массив типа: [0:[{s1}, {s2}], 1:[{s4}, {s5}], ...]
*/
export const select = (statistics, from, to, id) => {
  const period = shortDate.createPeriod(from, to);

  if (!period) {
    writeLog('State, select', 'error creating period. period not defined', { period, from, to });
    return null;
  }

  return period.map(i => {
    const statisticsOfDay = statistics[i];
    // id? filter
    return statisticsOfDay;
  });
};


export const getRentStarts = (statistics, from, to, id) => {
  const list = select(statistics, from, to, id);

  //console.log(list)
  if (!list) {
    writeLog('statistics.js, getRentStarts', 'not statistics entered', {list});
    return [];
  }
  if (!list.map) {
    writeLog('statistics.js, getRentStarts', 'statistics list in not an array', {list});
    return [];
  }

  return list.map(i => {
    return (i && i.length) ? i.length : 0;
  })
};

export const getRentStartsPerDay = (statistics, from, to, id) => {
  const list = select(statistics, from, to, id);

  // Сливаем результаты с разными датами в единый массив данных
  // [{}, {}, {}]
  const collapse = list.reduce((acc, item) => {
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

export const getRentStartsPerYear = (statistics, from, to, id) => {
  const list = select(statistics, from, to, id);

  const result = list.reduce((acc, item) => {
    if (!item) {
      return acc;
    }
    // Нужна проверка по годам
    const objectDate = new Date(item[0].start_time);
    const month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();
    const key = `${year}-${month}`;

    if (acc[key]) {
      acc[key] += item.length;
    } else {
      acc[key] = item.length;
    }
    return acc;
  }, {});

  const period = shortDate.createPeriod(from, to, 'Year');
  console.log(period)

  return period.map(i => {
    return result[i] ? result[i] : 0;
  });
};

export const getRentCash = (statistics, from, to, id) => {
  const list = select(statistics, from, to, id);
  return list.map(i => {
    if (i === undefined) {
      return 0;
    }

    return i.reduce((acc, item) => {
      // Эти проверки нужно проводить на стадии прихода и записи данных в хранилище
      const billRent = Number(item.bill_rent);
      const billAccess = Number(item.bill_access);
      const sale = Number(item.sale);

      if (isNaN(billRent) || isNaN(billAccess) || isNaN(sale)) {
        writeLog('statistics.js, getRentCash', 'parse error, data is not a number', 
          {rent: item.bill_rent, access: item.bill_access, sale: item.sale}
        );
      }

      acc += billRent + billAccess - sale;
      return acc;
    }, 0);
  });
};

export const getRentCashPerDay = (statistics, from, to, id) => {
  const list = select(statistics, from, to, id);
  // Сливаем результаты с разными датами в единый массив данных
  // [{}, {}, {}]
  const collapse = list.reduce((acc, item) => {
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
      acc[h] += item.bill_total;
    } else {
      acc[h] = item.bill_total;
    }
    return acc;
  }, {});
  console.log(collapse)
  // Готовим статистику Для каждого часа в в виде
  // [0, 0, 0, 2, 0]
  const period = shortDate.createPeriod(from, to, 'Day');
  
  return period.map(i => {
    return result[i] ? result[i] : 0;
  });
};
