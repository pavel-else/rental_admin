import {writeLog} from './logs'

/**
* makeDate('2018-09-01 10:15:27') // '2018-09-01'
*/
export const makeDate = (fullDate /*str*/, mod) => {
  // Если передан пустой параметр, генерируется дата от сегодняшнего дня
  if (!fullDate) {
    fullDate = new Date().toString();
  }

  const objectDate = new Date(fullDate)

  if (isNaN(objectDate)) {
    writeLog('date.js, makeDate', 'error to parse date', {fullDate})
    return undefined
  }

  const year = objectDate.getFullYear();
  const month = +objectDate.getMonth() + 1 <= 9 ? `0${+objectDate.getMonth() + 1}` : `${+objectDate.getMonth() + 1}`;
  const day = +objectDate.getDate() <= 9 ? `0${+objectDate.getDate()}` : objectDate.getDate();
  const hours = +objectDate.getHours() <= 9 ? `0${+objectDate.getHours()}` : objectDate.getHours();
  const minutes = +objectDate.getMinutes() <= 9 ? `0${+objectDate.getMinutes()}` : objectDate.getMinutes();

  if (!year || !month || !day) {
    writeLog('date.js, makeDate', 'error to parse date', { year, month, day });
    return undefined;
  }

  if (mod && (!hours || !minutes)) {
    writeLog('date.js, makeDate', 'error to parse hourse', { mod, hours });
    return undefined;
  }

  return mod ? `${year}-${month}-${day} ${hours}:${minutes}` :`${year}-${month}-${day}`;
};


/**
* getNextDay('2018-09-01') return '2018-09-02'
* getNextDay('2018-09-01', 10) return '2018-09-11'
* getNextDay('2018-09-01', -10) return '2018-08-20' ??????
*/
export const getNextDay = (today /*str*/, mult = 1) => {
  if (!today) {
    writeLog('date.js, getNextDay', 'empty today', {today});
    return null;
  }
  if (isNaN(+mult)) {
    writeLog('date.js, getNextDay', 'multiplier is not a number', {mult});
    return null;
  }

  const objectDate = new Date(today);

  if (isNaN(objectDate)) {
    writeLog('date.js, getNextDay', 'error to parse date', today);
    return null;
  }

  const todayTimestamp = Date.parse(today);
  const dayInMs = 24 * 60 * 60 * 1000 * mult;

  const tomorrow = new Date(todayTimestamp + dayInMs);

  return makeDate(tomorrow);
};

export const getNextDateAndHours = (date /*str*/, mult = 1) => {
  if (!date) {
    writeLog('date.js, getNextDateAndHours', 'empty date', {date});
    return null;
  }
  if (isNaN(+mult)) {
    writeLog('date.js, getNextDateAndHours', 'multiplier is not a number', {mult});
    return null;
  }

  const objectDate = new Date(date);
  if (isNaN(objectDate)) {
    writeLog('date.js, getNextDateAndHours', 'error to parse date', {date});
    return null;
  }
  const timestamp = Date.parse(date);
  const hourInMs = 60 * 60 * 1000 * mult;
  const nextDate = new Date(timestamp + hourInMs);

  return makeDate(nextDate, 'h');
};


/**
* createPeriod('2018-09-01 00:00', '2018-09-30 00:00', 'Day') should return ['00:00', '01:00', ... , '23:00', '00:00']
* createPeriod('2018-09-01', '2018-09-30', 'Month') should return ['2018-09-01', '2018-09-02', ... , '2018-09-30']
*/
export const createPeriod = (_from, _to, type = 'Month') => {
  if (!_from || !_to) {
    writeLog('date.js, createPeriod', 'empty parameters', {_from, _to});
    return null;
  }

  const createForMonth = (_from, _to) => {
    const from = makeDate(_from);
    const to = makeDate(_to);
    
    if (!from || !to) {
      writeLog('date.js, createPeriod, createForMonth', 'error to parse date', {_from, from, _to, to});
      return null;
    }
    if (firstOverSecond(from, to)) {
      writeLog('date.js, createPeriod, createForMonth', 'logical error. From > To', {from, to});
      return null;
    }
    const period = [];
    let today = from;
    let i = 1;
    let lim = 1000; // day, looping protection

    for (; i < lim; i++) {
      period.push(today);
      if (today === to) {
        break;
      }

      today = getNextDay(today);
    }

    if (i === lim) {
      writeLog('createPeriod.js', 'warning! Perion exceeds the limit', {from, to, lim});
      writeLog('createPeriod.js', 'warning! Perion exceeds the limit', {from, to, lim});
      return null;
    }

    return period;
  };

  const createForDay = (_from, _to) => {
    let from = makeDate(_from, 'h');
    const to = makeDate(_to, 'h');
    
    if (!from || !to) {
      writeLog('date.js, createPeriod, createForDay', 'error to parse date', {_from, from, _to, to});
      return null;
    }
    if (firstOverSecond(from, to)) {
      writeLog('date.js, createPeriod, createForDay', 'logical error. From > To', {from, to});
      return null;
    }

    const period = [];

    let i = 1;
    let lim = 1000; // hours, looping protection

    for (; i < lim; i += 1) {
      if (firstOverSecond(from, to)) {
        break;
      }
      period.push(getCurrentHours(from));
      from = getNextDateAndHours(from);
    }
    return period;
  };

  const createForYear = (from, to) => {};


  switch (type) {
    case 'Day' : return createForDay(_from, _to);
    case 'Month' : return createForMonth(_from, _to);
    case 'Year' : return createForYear(_from, _to);
  }
};

/**
* If today is '2018-11-09 11:30', getCurrentHours() should return '11'
*/
export const getCurrentHours = (date) => {
  const objectDate = date ? new Date(date) : new Date();
  if (isNaN(objectDate)) {
    writeLog('date.js, getCurrentHours', 'parse date error', {date});
  }

  return objectDate.getHours();
};

export const firstOverSecond = (firstDate, secondDate) => {
  return Date.parse(new Date(firstDate)) > Date.parse(new Date(secondDate))
};