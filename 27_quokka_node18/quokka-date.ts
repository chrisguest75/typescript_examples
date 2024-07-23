import { addDays, addWeeks } from 'date-fns';

const navigator = {
    gb: 'en-GB',
    us: 'en-US'
}

const today = new Date()

const oneWeekLater = addDays(today, 7)
const twoWeeksLater = addWeeks(today, 2)
const fromISO = new Date("2024-07-30T07:23:53.000+00:00")
const fromISOPlusOne = new Date("2024-07-30T07:23:53.000+01:00")
//const fromISO_UTC = fromISO.utc()

const localeString = new Date(today).toLocaleString(
    navigator.us,
    {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
)

const defaultLocaleDateString = new Date(oneWeekLater).toLocaleDateString(
    navigator.gb,
  )

const longMonthLocaleDateString = new Date(oneWeekLater).toLocaleDateString(
    navigator.gb,
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
)

console.log({ 
    today: today,
    oneWeekLater: oneWeekLater, 
    twoWeeksLater: twoWeeksLater,
    fromISO: fromISO,
    fromISOStr: fromISO.toString(),
    fromISOPlueOne: fromISOPlusOne,
    fromISOPlueOneStr: fromISOPlusOne.toString(),
    //fromISO_UTC: fromISO_UTC.toString()
    localeString,
    defaultLocaleDateString,
    longMonthLocaleDateString
})


console.log({
    isoGreater: fromISO > fromISOPlusOne
})

const intlDateTimeFormat = new Intl.DateTimeFormat(
  navigator.us,
  {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  },
).format(today);

console.log({
  intlDateTimeFormat
})
