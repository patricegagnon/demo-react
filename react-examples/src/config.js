const baseConfig = {
  marvelProxyServiceBaseUrl: envConfig.marvelProxyServiceBaseUrl,
  googleApiKey: null
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