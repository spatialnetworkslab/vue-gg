const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (baseConfig, env, defaultConfig) => {
  // storybook storysource addon
  defaultConfig.module.rules.push({
    test: /index.js/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  })
  // Extend defaultConfig to alias @ to src/
  defaultConfig.resolve.alias['@'] = resolve('src')
  return defaultConfig
}
