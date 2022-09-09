const { program } = require('commander')

function createOptions () {
  program
    .option('-d, --destination <path>', '目标地址')
}

module.exports = createOptions
