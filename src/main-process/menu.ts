import {BrowserWindow, Menu, MenuItemConstructorOptions, dialog} from 'electron';
import { openDataFile } from './utils';

const isMac = process.platform === 'darwin';

export function createMenu(win: BrowserWindow): Menu {
  const template: MenuItemConstructorOptions[] = [
    ...(isMac ? [{role: 'appMenu'}] as  MenuItemConstructorOptions[]: []),
    {
      role: 'fileMenu',
      label: 'File',
      submenu: [
        {
          label: 'Save As',
          click: async () => {
            const path = dialog.showSaveDialogSync({
              title: 'Save Diagram',
              buttonLabel: 'Save',
              filters: [
                {
                  name: 'Diagram Files',
                  extensions: ['json', 'JSON', 'centi']
                }
              ]
            });
            win.webContents.send('save_diagram', path);
          }
        },
        {
          label: 'open file',
          click: async () => {
            const data = await openDataFile();
            console.log('sending data')
            win.webContents.send('diagram_data', data);
          }
        },
        {
          label: 'export metrics as JSON'
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
  ];

  return Menu.buildFromTemplate(template);
}
