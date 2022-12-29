var stdin = process.stdin

console.log('⌨️ Press any key to continue or ctrl+c to abort...')

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (key) {
  if (key === '\u0003') {
    process.exit(1)
  } else {
    process.exit(0)
  }
})
