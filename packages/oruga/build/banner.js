const pack = require('../package.json')
const bannerText = require('./bannertext')

const bannerTxt = bannerText.generate(pack.version)

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)
