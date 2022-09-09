const path = require('path')
const ejs = require('ejs')

/*
  解析ejs模板文件，返回解析完成后的string
  @parmas { string } templateUrl - 需要解析ejs文件的目标路径
    *已经将路径定位在`templates`文件夹下
  @params { object } data - 提供给ejs文件内使用的变量
*/
function compileTemplate (templateUrl, data) {
  const templatePath = path.resolve(__dirname, `../templates/${templateUrl}`)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, {}, (err, str) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(str)
    })
  })
}


module.exports = compileTemplate
