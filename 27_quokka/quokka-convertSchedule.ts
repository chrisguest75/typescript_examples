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

let currentPath = process.cwd()
let filePath = currentPath + '/schedule.json'
filePath

let schedule = loadSchedule(filePath)

schedule

// extract rotations
let rotations = schedule.finalTimeline.rotations
//filter out required schedules
let filtered = rotations.filter((r) => r.name === 'schedule1' || r.name === 'schedule3')
filtered 

// merge two schedules together
let periods: Array<Period> = [].concat(filtered[0].periods, filtered[1].periods)
//periods
let len = periods.length
len

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//splits: Array<Period> = [] 

periods.map((p) => {
  p['dayOfWeek'] = days[new Date(Date.parse(p.startDate)).getDay()]
  p['duration'] = timeConvert((Date.parse(p.endDate) - Date.parse(p.startDate)) / 1000 / 60)
})

periods

