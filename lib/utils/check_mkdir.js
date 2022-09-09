const fs = require('fs')
const path = require('path')

/*
  传入一个地址检测该地址是否真实存在路径
    *如果真实存在路径则返回 `true`
    *如果不存在路径则创建路径
    *该方法用于创建文件模板时检测对应路径
*/
function checkMkdir (destination) {
  if (fs.existsSync(destination)) {
    return true
  } else {
    if (checkMkdir(path.dirname(destination))) {
      fs.mkdirSync(destination)
      return true
    }
  }
}

module.exports = checkMkdir
