const baseConfig = {
  baseMarveLUrl: 'http://gateway.marvel.com/v1/public/',
  publicKey: '',
  privateKey: ''
}

let customConfig = {}
try {
  customConfig = require('./config.custom').default
}
catch (error) {}

export default {
  ...baseConfig,
  ...customConfig
}