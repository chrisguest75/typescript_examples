import * as fs from 'fs';
import * as process from 'process';
import lodash from 'lodash';

export interface Schedule {
  requestId:          string;
  took:               number;
  RateLimitState:     string;
  RateLimitReason:    string;
  RateLimitPeriod:    string;
  RetryCount:         number;
  _parent:            Parent;
  description:        string;
  ownerTeam:          BaseTimeline;
  startDate:          string;
  endDate:            string;
  finalTimeline:      FinalTimeline;
  baseTimeline:       BaseTimeline;
  overrideTimeline:   BaseTimeline;
  forwardingTimeline: BaseTimeline;
}

export interface Parent {
  id:      string;
  name:    string;
  enabled: boolean;
}

export interface BaseTimeline {
}

export interface FinalTimeline {
  rotations: Rotation[];
}

export interface Rotation {
  id:      string;
  name:    string;
  order:   number;
  periods: Period[];
}

export interface Period {
  startDate: string;
  endDate:   string;
  type:      PeriodType;
  recipient: Recipient;
}

export interface Recipient {
  type:     RecipientType;
  name:     string;
  id:       string;
  username: string;
}

export enum RecipientType {
  User = "user",
}

export enum PeriodType {
  Historical = "historical",
}

export interface CoveredPeriod {
  startDate: Date
  endDate:   Date
  dayRate: number
  engineer: string
  dayOfWeek: string
  duration: number
}

function timeConvert(n: number): number {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  //return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
  return hours
}

function loadSchedule(filePath: string): Schedule {
  const file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file);
}

function saveRate(filePath: string, data: string) {
  fs.writeFileSync(filePath, data);
}

let schedule1 = "schedule1"
let schedule2 = "schedule4"
let currentPath = process.cwd()
let filePath = currentPath + '/fakeschedule.json'
filePath

let schedule = loadSchedule(filePath)

schedule

// extract rotations
let rotations = schedule.finalTimeline.rotations
//filter out required schedules
let filtered = rotations.filter((r) => r.name === schedule1 || r.name === schedule2)
filtered 

// merge two schedules together
let periods: Array<Period> = [].concat(filtered[0].periods, filtered[1].periods)
//periods
let len = periods.length
len

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let covered: Array<CoveredPeriod> = []

periods.map((p) => {

  let startDate = Date.parse(p.startDate)
  let endDate = Date.parse(p.endDate)
  let dayOfWeek = days[new Date(startDate).getDay()]
  let duration = timeConvert((endDate - startDate) / 1000 / 60)

  let rate = 0
  let endDay = new Date(Date.parse(p.endDate)).getDay()
  let startDay = new Date(Date.parse(p.startDate)).getDay()
  let dateDiff = Math.abs((endDay + 1) - (startDay + 1))

  dateDiff
  if (dateDiff == 0) {
    // if less than 8am it's classed as overnight
    if (new Date(startDate).getHours() < 8) {
      rate = 1
    }
  } else {
    // if diff is 1 it's classed as overnight
    if (dateDiff == 1) {
      rate = 1
    } else {
      let date = new Date(startDate)
      for (let i = 0; i < dateDiff; i++) {
        // saturday and sunday
        if (date.getDay() === 0 || date.getDay() === 6) {
          rate+=2
        } else {
          rate+=1
        }
        date.setDate(date.getDate() + i)
      }
    }
  }
  let dayRate = rate

  let cover: CoveredPeriod = {
    startDate: new Date(startDate),
    endDate:   new Date(endDate),
    dayRate:  dayRate,
    engineer: p.recipient.name,
    dayOfWeek: dayOfWeek,
    duration: duration
  }
  covered.push(cover)

})

covered

var result = covered.reduce(function(r, e) {
  let s = {
    rates: 0,
    ranges: []
  }
  if (r[e.engineer]) {
    s = r[e.engineer]
  } 
  s.rates += e.dayRate
  s.ranges.push({
      startDate: e.startDate, 
      endDate: e.endDate,
      dayOfWeek: e.dayOfWeek
    })
  r[e.engineer] = s;
  return r;
}, {});

//result
// stringify json pretty
let aggregated = JSON.stringify(result, null, 2)
console.log(aggregated)
saveRate(currentPath + '/rates.json', aggregated)
