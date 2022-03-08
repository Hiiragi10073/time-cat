const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let win = null;

ipcMain.on('size-change', (event, flag) => {
  const [x, y] = win.getPosition();
  if (flag) {
    win.setSize(500, 300, true);
    win.setPosition(x, y - 300 + 75, true);
  } else {
    win.setSize(120, 75, true);
    win.setPosition(x, y + 300 - 75, true);
  }
});

ipcMain.on('pos-change', (event, { x, y }) => {
  win.setPosition(x, y, true);
});

const { getTodo, setTodo } = require('./store');

ipcMain.handle('get-todo', () => {
  console.log(getTodo());
  return getTodo();
});

ipcMain.on('set-todo', (e, value) => {
  setTodo(value);
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
      preload: path.join(__dirname, 'preload.js'),
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
  createWindow();
});
