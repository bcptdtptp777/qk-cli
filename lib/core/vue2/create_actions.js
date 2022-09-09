const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const download = promisify(require('download-git-repo'))
// const open = require('open')
const { vue2GithubUrl } = require('../../config/vue2.config')
const checkMkdir = require('../../utils/check_mkdir.js')

const { commandSpawn } = require('../../utils/terminal.js')
const compileTemplate = require('../../utils/compile_template')

// 创建vue2项目
async function createVue2Action (name) {
  await download(
    vue2GithubUrl,
    name,
    { clone: true }
  )
  await commandSpawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['i'], { cwd: `./${name}` })
  commandSpawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'serve'], { cwd: `./${name}` })
  // open('http://localhost:8080')
}

// 创建vue2组件
async function createVue2ComponentAction (name, destination) {
  try {
    const result = await compileTemplate('vue2/component.ejs', { name })
    await fs.promises.writeFile(path.resolve(destination, `${name}.vue`), result, { flag: 'wx' })
    console.log('state: success')
  } catch (err) {
    console.log(err, 'state: error')
  }
}

// 创建vue2页面
async function createVue2PageAction (name, destination) {
  try {
    const componentReult = await compileTemplate('vue2/component.ejs', { name })
    const routerReult = await compileTemplate('vue2/router.ejs', { name })
    const realPath = path.resolve(destination, name)
    checkMkdir(realPath)
    await fs.promises.writeFile(path.resolve(realPath, 'index.vue'), componentReult, { flag: 'wx' })
    await fs.promises.writeFile(path.resolve(realPath, 'router.js'), routerReult, { flag: 'wx' })
    console.log('state: success')
  } catch (err) {
    console.log(err, 'state: error')
  }
}

// 创建vue2 module-stroe
async function createVue2ModuleStore (name, destination) {
  try {
    const result = await compileTemplate('vue2/store.ejs', { name })
    await fs.promises.writeFile(path.resolve(destination, `${name}.js`), result, { flag: 'wx' })
    console.log('state: success')
  } catch (err) {
    console.log(err)
    console.log(err, 'state: error')
  }
}

module.exports = {
  createVue2Action,
  createVue2ComponentAction,
  createVue2PageAction,
  createVue2ModuleStore
}