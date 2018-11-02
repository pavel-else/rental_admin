import {writeLog} from './logs'
import makeShortDate from './makeShortDate'

/**
* getNextDay('2018-09-01') return '2018-09-02'
*/
export default (today /*str*/) => {
  if (!today) {
    writeLog('getNextDay.js', 'empty today', today)
    return undefined
  }

  const objectDate = new Date(today)

  if (isNaN(objectDate)) {
    writeLog('getNextDay.js', 'error to parse date', today)
    return undefined
  }

  const todayTimestamp = Date.parse(today)
  const dayInMs = 24 * 60 * 60 * 1000
  const tomorrow = new Date(todayTimestamp + dayInMs)

  return makeShortDate(tomorrow)
}