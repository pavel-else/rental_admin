
export const getRentCount = (subOrders) => {
  const monthMap = createMonthMap(9)

  subOrders.map(i => {
    const dayNumber = getDayNumber(i.start_time, monthMap)

    if (dayNumber) {
      monthMap[dayNumber]['count']++
    }
  })

  return makeArray(monthMap, 'count')
}

export const getRentHours = (subOrders) => {
  const monthMap = createMonthMap(9)

  subOrders.map(i => {
    const dayStart = getDayNumber(i.start_time, monthMap)
    if (dayStart) {
      const diff = Date.parse(i.end_time) - Date.parse(i.start_time)
      const hours = Math.floor(diff / 1000 / 60 / 60)
      const normalHours = hours > 24 ? 24 : hours
      
      monthMap[dayStart]['hours'] += normalHours > 0 ? normalHours : 0      
    }
  })
  return makeArray(monthMap, 'hours')
}

export const getRentCash = (subOrders) => {
  const monthMap = createMonthMap(9)

  subOrders.map(i => {
    const dayNumber = getDayNumber(i.start_time, monthMap)
    if (dayNumber) {
      monthMap[dayNumber]['cash'] += +i.bill_rent + +i.bill_access
    }

    console.log('cash', makeArray(monthMap, 'cash'))
  })

  return makeArray(monthMap, 'cash')
}

const getDayNumber = (date, monthMap) => {
  const timeStamp = Date.parse(date)

  for (let i in monthMap) {
    if (timeStamp >= monthMap[i].min && timeStamp <= monthMap[i].max) {
      return i
    }
  }

  return undefined
}

const createMonthMap = (monthNumber) => {
  let monthMap = {}
  for (let day = 30; day > 0; day--) {
    monthMap[day] = {}
    monthMap[day].min = Date.parse(`2018-${monthNumber}-${day} 00:00`)
    monthMap[day].max = Date.parse(`2018-${monthNumber}-${day} 23:59`)
    monthMap[day].count = 0
    monthMap[day].hours = 0
    monthMap[day].cash = 0
  }
  
  return monthMap
}

const makeArray = (monthMap, field) => {
  let result = []
  for (let i in monthMap) {
    result.push(monthMap[i][field])
  }

  return result
}

