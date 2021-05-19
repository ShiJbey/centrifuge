import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { CLOSE_DIR, OPEN_DIR, OPEN_PATTERN_FILE, OPEN_TOWN_FILE, SAVE_PATTERN } from '../utility/electronChannels';
import * as io from './io';

const isMac = process.platform === 'darwin';

export function createMenu(win: BrowserWindow): Menu {
  const template: MenuItemConstructorOptions[] = [
    ...(isMac ? ([{ role: 'appMenu' }] as MenuItemConstructorOptions[]) : []),
    {
      role: 'fileMenu',
      label: 'File',
      submenu: [
        {
          label: 'Save Pattern',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            io.saveFile()
              .then((res) => {
                win.webContents.send(SAVE_PATTERN, res);
              })
              .catch(console.error);
          },
        },
        {
          label: 'Save Pattern As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: async () => {
            io.savePatternAs(win)
              .then((res) => {
                win.webContents.send(SAVE_PATTERN, res);
              })
              .catch(console.error);
          },
        },
        {
          label: 'Open Pattern...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            io.openFile(win, [
              { name: 'Centrifuge Pattern', extensions: ['ctr'] },
            ])
              .then((res) => {
                if (res.status === 'ok')
                  res.payload.data = JSON.parse(res.payload.data);
                win.webContents.send(OPEN_PATTERN_FILE, res);
              })
              .catch(console.error);
          },
        },
        {
          label: 'Open Town...',
          accelerator: 'CmdOrCtrl+Shift+O',
          click: () => {
            io.openFile(win, [
              { name: 'Talktown Town', extensions: ['town'] },
            ])
              .then((res) => {
                if (res.status === 'ok')
                  res.payload.data = JSON.parse(res.payload.data);
                win.webContents.send(OPEN_TOWN_FILE, res);
              })
              .catch(console.error);
          },
        },
        {
          label: 'Open Folder...',
          accelerator: 'CmdOrCtrl+Alt+O',
          click: () => {
            io.openDirectory(win)
              .then((res) => {
                win.webContents.send(OPEN_DIR, res);
                // Watch the directory
                if (res.payload) {
                  io.watchDirectory(res.payload.path, win.webContents);
                }
              })
              .catch(console.error);
          },
        },
        {
          label: 'Close Folder',
          click: () => {
            io.unWatchDirectory(win.webContents);
            win.webContents.send(CLOSE_DIR);
          },
        },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
  ];

  return Menu.buildFromTemplate(template);
}
