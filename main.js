const {app, BrowserWindow} =  require('electron')
const isDev = require('electron-is-dev')
app.on('ready', () => {
  const window = new BrowserWindow({
    width:1080,
    height:640
  })
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
  window.loadURL(urlLocation)
})