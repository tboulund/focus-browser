// preload.js
const { contextBridge, ipcRenderer, clipboard } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openURL: (url) => ipcRenderer.send('open-url', url),
  getBookmarks: () => ipcRenderer.invoke('get-bookmarks'),
  copyText: (text) => clipboard.writeText(text)
});