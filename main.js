// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    autoHideMenuBar: false,
    frame: false,
    webPreferences: {
		preload: path.join(__dirname, 'preload.js'),  
		contextIsolation: true,
		nodeIntegration: true,
		webviewTag: true // ✅ Add this
	}});

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-url', (event, url) => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
  });
  win.loadURL(url);
});

ipcMain.handle('get-bookmarks', async () => {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, 'bookmarks.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
});