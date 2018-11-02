import {writeLog} from './logs'

/**
* makeShortDate('2018-09-01 10:15:27') // '2018-09-01'
*/
export default (fullDate /*str*/) => {
  if (!fullDate) {
    writeLog('makeShortDate.js', 'empty date', fullDate)
    return undefined
  }

  const objectDate = new Date(fullDate)

  if (isNaN(objectDate)) {
    writeLog('makeShortDate.js', 'error to parse date', fullDate)
    return undefined
  }

  const year = objectDate.getFullYear()
  const month = objectDate.getMonth() + 1 <= 9 ? '0' + objectDate.getMonth() + 1 : objectDate.getMonth() + 1
  const date = objectDate.getDate()

  return (year && month && date) ? `${year}-${month}-${date}` : undefined
}