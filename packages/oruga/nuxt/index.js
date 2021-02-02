const { resolve } = require('path')

// --- Main Nuxt.js module ---
module.exports = function nuxtOruga(moduleOptions = {}) {
  this.nuxt.hook('build:before', () => {

    const options = Object.assign({}, this.options.oruga, moduleOptions)

    // Add css
    if (options.includeCss === 'vars') {
        this.options.css.unshift('@oruga-ui/oruga/dist/oruga-full-vars.css');
    }
    else if (options.includeCss === 'full') {
        this.options.css.unshift('@oruga-ui/oruga/dist/oruga-full.css');
    }
    else if (options.includeCss !== false) {
        this.options.css.unshift('@oruga-ui/oruga/dist/oruga.css');
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
