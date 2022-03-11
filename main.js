const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { install: storeInstall } = require('./store/index');

let win = null;

ipcMain.on('size-change', (event, flag) => {
  win.setOpacity(0);
  const [x, y] = win.getPosition();
  if (flag) {
    win.setBounds({
      x,
      y: y - 300 + 75,
      width: 500,
      height: 300,
    });
  } else {
    win.setBounds({
      x,
      y: y + 300 - 75,
      width: 120,
      height: 75,
    });
  }
  setTimeout(() => {
    win.setOpacity(1);
  }, 300);
});

ipcMain.on('pos-change', (event, { x, y }) => {
  win.setPosition(x, y, true);
});

function createWindow() {
  win = new BrowserWindow({
    width: 120,
    height: 75,
    maxHeight: 300,
    maxWidth: 500,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload/preload.js'),
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // win.loadURL('http://localhost:3000/');

  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  storeInstall();
  createWindow();
});
