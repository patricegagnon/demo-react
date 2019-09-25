const crypto = require('crypto')

let ts = 1


const buildMarvelHash = (ts, privateKey, publicKey) => {
  const value = ts + privateKey + publicKey
  const hash = crypto.createHash('md5').update(value).digest("hex")
  return hash
}

export const buildNewRequestMarvelAuthParams = (privateKey, publicKey) => {
  const reqTs = ts++
  return {
    ts: reqTs,
    apikey: publicKey,
    hash: buildMarvelHash(reqTs, privateKey, publicKey)
  }
}