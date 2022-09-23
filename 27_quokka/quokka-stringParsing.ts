
const url = "ws://machine1:9000"

const urlSplit = url.split('://')[1].split(':')

urlSplit


//const fileName = 'file0000.wav.m4a'
const fileName = 'file0000'
console.log(fileName.split('.')[0])
const extracted = fileName.split('.')[0].match(/\d/g) as [];
console.log(parseInt(extracted.join(''), 10))
