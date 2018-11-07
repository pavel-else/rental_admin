import {writeLog} from './logs'

/**
* make('2018-09-01 10:15:27') // '2018-09-01'
*/
export const make = (fullDate /*str*/) => {
  if (!fullDate) {
    writeLog('makeShortDate.js', 'empty date', {fullDate})
    return undefined
  }

  const objectDate = new Date(fullDate)

  if (isNaN(objectDate)) {
    writeLog('makeShortDate.js', 'error to parse date', {fullDate})
    return undefined
  }

  const year = objectDate.getFullYear()
  const month = +objectDate.getMonth() + 1 <= 9 ? `0${+objectDate.getMonth() + 1}` : `${+objectDate.getMonth() + 1}`
  const date = +objectDate.getDate() <= 9 ? `0${+objectDate.getDate()}` : objectDate.getDate()

  return (year && month && date) ? `${year}-${month}-${date}` : undefined
}


/**
* getNextDay('2018-09-01') return '2018-09-02'
* getNextDay('2018-09-01', 10) return '2018-09-11'
* getNextDay('2018-09-01', -10) return '2018-08-20' ??????
*/
export const getNextDay = (today /*str*/, mult = 1) => {
  if (!today) {
    writeLog('date.js, getNextDay', 'empty today', {today})
    return undefined
  }
  if (isNaN(+mult)) {
    writeLog('date.js, getNextDay', 'multiplier is not a number', {mult})
    return undefined
  }

  const objectDate = new Date(today)

  if (isNaN(objectDate)) {
    writeLog('getNextDay.js', 'error to parse date', today)
    return undefined
  }

  const todayTimestamp = Date.parse(today)
  const dayInMs = 24 * 60 * 60 * 1000 * mult

  const tomorrow = new Date(todayTimestamp + dayInMs)

  return make(tomorrow)
}