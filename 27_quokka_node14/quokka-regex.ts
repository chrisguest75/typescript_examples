
function validateFirstId(id: string) {
  // regex to extract number with groups
  const regex = new RegExp('^([0-9a-f]{24})$');

  const match = id.match(regex);
  return match 
}
function validateSecondId(id: string) {
  // regex to extract number with groups
  const regex = new RegExp('^([0-9a-zA-Z]{22})$');
  const match = id.match(regex);
  return match 
}

function validateCompoundId(id: string) {
  // regex to extract number with groups
  const regex = new RegExp('^([0-9a-f]{24})(\/)([0-9a-zA-Z]{22})$');
  const match = id.match(regex);
  return match 
}


function distanceToMetres(distance: string) {
  // regex to extract number with groups
  const regex = new RegExp('(\\d+.\\d+|\\d+) (\\w+)');
  const match = distance.match(regex);
  // console.log(match)
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

// valid
console.log(validateFirstId('999a773a2f2baa02f7917e61'))
// invalid
console.log(validateFirstId('999a773a2f2baa02f7917e61/'))


// valid
console.log(validateSecondId('IgtHPLKTku2r2LdLtOQpCQ'))
// invalid
console.log(validateSecondId('IgtHPLKTku2r2LdLtOQpCQ/'))


// valid
const match = validateCompoundId('999a773a2f2baa02f7917e61/IgtHPLKTku2r2LdLtOQpCQ')
console.log(match[1])
// invalid
console.log(validateCompoundId('999a773a2f2baa02f7917e61/'))
console.log(validateCompoundId('999a773a2f2baa02f7917e61'))
