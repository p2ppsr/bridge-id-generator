#! /usr/bin/env node
const bsv = require('babbage-bsv')

const privateKey = bsv.PrivateKey.fromRandom()
const wif = privateKey.toWIF()
const address = privateKey.toAddress().toString()
const addressLower = address.toLowerCase()

console.log('\nGenerating a random Bridge ID address and private key...')
console.log('Be sure to save the private key and keep it secret before use!\n')
console.log('=======================')
console.log(`Bridge ID Private Key:  ${wif}`)
console.log(`Bridge ID:              ${address}`)
console.log('=======================\n')
console.log('To use this bridge, add the following snippet to your docker-compose.yml:')
console.log(`
  reader-${addressLower.slice(1, 5)}:
    hostname: "reader-${addressLower}"
    build: ../path/to/reader
    environment:
      BRIDGE: '${Buffer.from(JSON.stringify({
        id: `${address}`
      })).toString('base64')}'
      PORT: 80
      MONGODB_READ_CREDS: '${Buffer.from(`mongodb://bridgeport-mongo:3113/bridge_${address}`).toString('base64')}'
      MONGODB_DATABASE: 'bridge_${address}'
  transformer-${addressLower.slice(1, 5)}:
    hostname: "transformer-${addressLower}"
    build: ../path/to/transformer
    environment:
      PORT: 80
      MONGODB_WRITE_CREDS: 'mongodb://bridgeport-mongo:3113/bridge_${address}'
      MONGODB_DATABASE: 'bridge_${address}'
  `)
console.log('For support and documentation: https://projectbabbage.com/docs\n')
