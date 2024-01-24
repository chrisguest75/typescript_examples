import {
    randNumber,
    randBetweenDate,
    randBoolean,
    randUuid,
    randFilePath,
    randEmail,
    randFullName,
} from '@ngneat/falso'

type Datum = {
    size: number,
    id: string,
    file: string,
    deleted: boolean,
    email: string,
    name: string,
    created: Date,
    updated: Date,
  }

function addDays(startDate: Date, days: number) {
    const result = new Date(startDate)
    result.setDate(result.getDate() + days)
    return result
}

let faked: Array<Datum> = []

let count = 20

for (let i = 0; i < count; i++) {
    const startDate = randBetweenDate({ from: new Date('01/01/2021'), to: addDays(new Date(), -10) })
    const updateDate = randBetweenDate({ from: startDate, to: new Date() })
    const file: Datum = {
      size: randNumber({ min: 10, max: 2000 }),
      id: randUuid(),
      file: randFilePath(),
      deleted: randBoolean(),
      email: randEmail(),
      name: randFullName(),
      created: startDate,
      updated: updateDate,
    }

    faked.push(file)
}

faked