const { program } = require('commander')

const {
  createVue2Action,
  createVue2ComponentAction,
  createVue2PageAction,
  createVue2ModuleStore
} = require('./create_actions')

function createCommand () {
  program
    .command('create_vue2 <name>')
    .description('create your vue2 app')
    .action(createVue2Action)

  program
    .command('add_vue2Cpn <name>')
    .description('create your vue2 component')
    .action(name => {
      createVue2ComponentAction(name, program.opts().destination || 'src/components')
    })

  program
    .command('add_vue2Page <name>')
    .description('create your vue2 page')
    .action(name => {
      createVue2PageAction(name, program.opts().destination || 'src/views')
    })
  program
    .command('add_vue2Store <name>')
    .description('create your vue2 moduleStore')
    .action(name => {
      createVue2ModuleStore(name, program.opts().destination || 'src/store/modules')
    })
}

module.exports = createCommand
