import * as moment from "moment";

const today = moment()
const oneWeekLater = today.add(1, "week")
const twoWeeksLater = today.add(2, "week")
console.log({ 
    today: today.format('DD/MM/YYYY'), 
    oneWeekLater: oneWeekLater.format('DD/MM/YYYY'), 
    twoWeeksLater: twoWeeksLater.format('DD/MM/YYYY') 
})


