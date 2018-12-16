const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig to alias @ to src/
  defaultConfig.resolve.alias['@'] = resolve('src')
  return defaultConfig
}
