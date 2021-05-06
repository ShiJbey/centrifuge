import {BrowserWindow, Menu, MenuItemConstructorOptions, dialog} from 'electron';
import fs from 'fs';
import { OPEN_DIR, SAVE_DIAGRAM, SAVE_DIAGRAM_ERROR } from '../utility/electronChannels';

const isMac = process.platform === 'darwin';

export function createMenu(win: BrowserWindow): Menu {
  const template: MenuItemConstructorOptions[] = [
    ...(isMac ? [{role: 'appMenu'}] as  MenuItemConstructorOptions[]: []),
    {
      role: 'fileMenu',
      label: 'File',
      submenu: [
        {
          label: 'Save Diagram',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            win.webContents.send(SAVE_DIAGRAM, null);
          }
        },
        {
          label: 'Save Diagram As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: async () => {
            try {
              const ret = await dialog.showSaveDialog({
                title: 'Save Diagram',
                buttonLabel: 'Save',
                defaultPath: './New Diagram',
                filters: [
                  {
                    name: 'Centrifuge Diagram',
                    extensions: ['ctr']
                  }
                ]
              });

              if (!ret.canceled) {
                win.webContents.send(SAVE_DIAGRAM, ret.filePath);
              }
            } catch (error) {
              console.error(error);
              win.webContents.send(SAVE_DIAGRAM_ERROR, error);
            }
          }
        },
        {
          label: 'Open Diagram File',
          click: async () => {
            try {
              const ret = await dialog.showOpenDialog(win, {
                properties: ['openFile']
              });

              if (!ret.canceled) {
                const [path] = ret.filePaths;

                const data = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}));

                win.webContents.send('OPEN_DIAGRAM_FILE', data);
              }

            } catch (error) {
              console.error(error);
              win.webContents.send('OPEN_FILE_ERROR', error);
            }
          }
        },
        {
          label: 'Open Folder',
          click: async () => {
            try {
              const ret = await dialog.showOpenDialog(win, {
                properties: ['openDirectory']
              });
              if (!ret.canceled) {
                const [path] = ret.filePaths;
                win.webContents.send(OPEN_DIR, path);
              }
            } catch (error) {
              console.error(error);
            }
          }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
  ];

  return Menu.buildFromTemplate(template);
}
