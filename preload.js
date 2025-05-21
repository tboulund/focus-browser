// preload.js
const { contextBridge, ipcRenderer } = require('electron');
// const fs = require('fs');
// const path = require('path');

contextBridge.exposeInMainWorld('electronAPI', {
  openURL: (url) => ipcRenderer.send('open-url', url),
  getBookmarks: () => ipcRenderer.invoke('get-bookmarks')
});