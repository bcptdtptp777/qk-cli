const { spawn } = require('child_process')

function commandSpawn (...args) {
  return new Promise((resolve, reject) => {
    const ls = spawn(...args)
    ls.stdout.pipe(process.stdout)
    ls.stderr.pipe(process.stderr)
    ls.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}
