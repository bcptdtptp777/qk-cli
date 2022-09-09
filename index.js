#!/usr/bin/env node

const { program } = require('commander')

const createVue2Command = require('./lib/core/vue2/create_command.js')
const createOptions = require('./lib/core/create_options')

createOptions() // 公共option
createVue2Command() // vue2命令

program.parse(process.argv)
