const pack = require('../package.json')

const bannerTxt = `/*! Oruga v${pack.version} | MIT License | github.com/oruga-ui/oruga */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)