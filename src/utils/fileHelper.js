const fs = window.require('fs').promises
const path = window.require('path')
const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, {encoding: 'utf8'})
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, {encoding: 'utf8'})
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}
const testPath = path.join(__dirname, 'helper.js')
const testWrite = path.join(__dirname, 'hello.md')
fileHelper.readFile(testPath).then((data) => {console.log(data)})
fileHelper.writeFile(testWrite, '## Hello World').then(() => console.log('写入成功'))

export default fileHelper