const { resolve } = require('path')

// --- Main Nuxt.js module ---
module.exports = function nuxtOruga(moduleOptions = {}) {
  this.nuxt.hook('build:before', () => {

    const options = Object.assign({}, this.options.oruga, moduleOptions)

    // Add css
    if (options.css !== false) {
        this.options.css.unshift('@oruga-ui/oruga/dist/oruga.css');
    }

    if (options.cssVars !== false) {
        this.options.css.unshift('@oruga-ui/oruga/dist/oruga-vars.css');
    }

    if (options.cssLite !== false) {
        this.options.css.unshift('@oruga-ui/oruga/dist/oruga-lite.css');
    }

    // Register plugin
    this.addPlugin({
        src: resolve(__dirname, 'plugin.template.js'),
        fileName: 'oruga.js',
        options
    })
  })
}

module.exports.meta = require(__dirname, '../package.json')
