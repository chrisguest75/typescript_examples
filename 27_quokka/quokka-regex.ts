

function distanceToMetres(distance: string) {
  // regex to extract number with groups
  const regex = /(\d+.\d+|\d+) (\w+)/;
  const match = distance.match(regex);
  if (match) {
    const d = parseFloat(match[1]);
    const unit = match[2];
    if (unit === "km") {
      return Math.ceil(d * 1000);
    }
    if (unit === "m") {
      return d;
    }
  }

  return 0;
}

console.log(distanceToMetres('5 km'))
console.log(distanceToMetres('5.5 km'))
console.log(distanceToMetres('5 m'))
console.log(distanceToMetres('5.5 m'))
console.log(distanceToMetres('m'))
console.log(distanceToMetres('2.01 km'))

