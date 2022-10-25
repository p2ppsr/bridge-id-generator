const bsv = require('babbage-bsv')

const privateKey = bsv.PrivateKey.fromRandom()

console.log(`Bridge ID Private Key: ${privateKey.toWIF()}`)
console.log(`Bridge ID: ${privateKey.toAddress().toString()}`)
