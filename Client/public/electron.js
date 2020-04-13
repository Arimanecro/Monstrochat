/* eslint-disable */
const ELECTRON_IS_DEV = process.env.ELECTRON_IS_DEV = 0;

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const contextMenu = require('electron-context-menu');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: ELECTRON_IS_DEV ? 800 : 306,
    height: ELECTRON_IS_DEV ? 800 : 665,
    icon: path.join(__dirname, '/monstro.ico'),
    alwaysOnTop: true,
    resizable: ELECTRON_IS_DEV ? true : false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen:true
      // preload: path.join(__dirname, 'preload.js')
    }
  });
  
  contextMenu();
  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadURL(ELECTRON_IS_DEV ? 'https://localhost:3000/' : `file://${path.join(__dirname,'../build/index.html')}`, {userAgent: 'Chrome'})

  // Open the DevTools.
  ELECTRON_IS_DEV ? mainWindow.webContents.openDevTools() : null;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
