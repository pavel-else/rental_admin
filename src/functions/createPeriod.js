import {writeLog} from './logs'
import makeShortDate from './makeShortDate'
import getNextDay from './getNextDay'

/**
* createPeriod('2018-09-01', '2018-09-30') should return ['2018-09-01', '2018-09-02', ... , '2018-09-30']
*/
export default (_from, _to) => {
  if (!_from || !_to) {
    writeLog('createPeriod.js', 'empty parameters', {_from, _to})
    return null
  }

  const from = makeShortDate(_from)
  const to = makeShortDate(_to)

  if (!from || !to) {
    writeLog('createPeriod.js', 'error to parse date', {_from, _to})
    return null
  }
  if (Date.parse(new Date(from)) > Date.parse(new Date(to))) {
    writeLog('createPeriod.js', 'logical error. From > To', {from, to})
    return null
  }

  const period = []
  let today = from
  let i = 1
  let lim = 1000 // day, looping protection

  for (; i < lim; i++) {
    period.push(today)
    if (today === to) {
      break
    }

    today = getNextDay(today)
  }

  if (i === lim) {
    writeLog('createPeriod.js', 'warning! Perion exceeds the limit', {from, to, lim})
    writeLog('createPeriod.js', 'warning! Perion exceeds the limit', {from, to, lim})
    return null
  }

  return period
}