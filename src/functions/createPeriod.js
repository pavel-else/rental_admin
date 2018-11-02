import {writeLog} from './logs'
import makeShortDate from './makeShortDate'
import getNextDay from './getNextDay'

/**
* fillPeriod('2018-09-01', '2018-09-30') should return ['2018-09-01', '2018-09-02', ... , '2018-09-30']
*/
export default (_from, _to) => {
  if (!_from || !_to) {
    writeLog('fillPeriod.js', 'empty parameters', {_from, _to})
    return undefined
  }

  const from = makeShortDate(_from)
  const to = makeShortDate(_to)

  if (!from || !to) {
    writeLog('fillPeriod.js', 'error to parse date', {_from, _to})
    return undefined
  }
  if (Date.parse(new Date(from)) > Date.parse(new Date(to))) {
    writeLog('fillPeriod.js', 'logical error. From > To', {from, to})
    return undefined
  }

  const period = []
  let today = from
  let i = 0
  let lim = 1000 // day, looping protection

  for (; i < lim; i++) {
    period.push(today)
    if (today === to) {
      break
    }

    today = getNextDay(today)
  }

  if (i === lim) {
    writeLog('fillPeriod.js', 'warning! Perion exceeds the limit', {from, to, lim})
    return undefined
  }

  return period
}