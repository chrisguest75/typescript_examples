import * as moment from "moment";

const today = moment()
const oneWeekLater = today.clone().add(1, "week")
const twoWeeksLater = today.clone().add(2, "week")
const fromISO = moment("2024-07-30T07:23:53.000+00:00")
const fromISO_UTC = fromISO.clone().utc()


console.log({ 
    today: today.format('DD/MM/YYYY'), 
    oneWeekLater: oneWeekLater.format('DD/MM/YYYY'), 
    twoWeeksLater: twoWeeksLater.format('DD/MM/YYYY'),
    fromISO: fromISO.toString(),
    fromISO_UTC: fromISO_UTC.toString()
})

console.log({
    greater_than: today > oneWeekLater,
    less_than: today < oneWeekLater,
    isAfter: today.isAfter(oneWeekLater)
})

