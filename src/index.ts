import fs from 'fs';
import path from 'path';
import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import { createMenu } from './main-process/menu';
import {
  CLOSE_DIR,
  GET_INIT_DATA,
  OPEN_DIR,
  OPEN_PATTERN_FILE,
  OPEN_SAVE_AS,
  OPEN_TOWN_FILE,
  SAVE_PATTERN,
} from './utility/electronChannels';
import * as io from './main-process/io';
import { OpenFileResponse, SaveFileResponse } from './utility/electronApi';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    minHeight: 600,
    minWidth: 800,
    // frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  Menu.setApplicationMenu(createMenu(mainWindow));

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on(GET_INIT_DATA, (event) => {
  if (process.argv.length >= 2) {
    const openFilePath = process.argv[1];
    if (fs.statSync(openFilePath).isFile()) {
      const data = fs.readFileSync(openFilePath, 'utf-8');
      event.returnValue = data;
    }
  }
  event.returnValue = null;
});

ipcMain.on(OPEN_DIR, async (event) => {
  const res = await io.openDirectory(null);
  io.watchDirectory(res.payload.path, event.sender);
  event.sender.send(OPEN_DIR, res);
});

ipcMain.on(CLOSE_DIR, async (event) => {
  io.unWatchDirectory(event.sender);
});

ipcMain.handle(
  OPEN_PATTERN_FILE,
  async (_, args: any[]): Promise<OpenFileResponse> => {
    try {
      const path = args[0];
      return {
        status: 'ok',
        payload: JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' })),
      };
    } catch (error) {
      return {
        status: 'error',
        msg: error.message,
        payload: error,
      };
    }
  }
);

ipcMain.handle(
  SAVE_PATTERN,
  async (_, args: any[]): Promise<SaveFileResponse> => {
    try {
      const path = args[0];
      const data = args[1];
      fs.writeFileSync(path, data, { encoding: 'utf-8' });
      return {
        status: 'ok',
      };
    } catch (error) {
      return {
        status: 'error',
        msg: error.message,
        payload: error,
      };
    }
  }
);

ipcMain.handle(OPEN_SAVE_AS, async () => {
  const res = await io.savePatternAs(null);
  return res;
});

ipcMain.handle(OPEN_TOWN_FILE, (): OpenFileResponse => {
  try {
    const [filepath] = dialog.showOpenDialogSync({
      title: 'Open Simulation File',
      buttonLabel: 'Open',
      filters: [
        {
          name: 'Talktown Simulation Data',
          extensions: ['json'],
        },
      ],
    });

    if (filepath) {
      const data = fs.readFileSync(filepath, { encoding: 'utf-8' });
      return {
        status: 'ok',
        payload: {
          data,
          name: path.basename(filepath),
          path: filepath,
          extension: path.extname(filepath),
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      msg: error.message,
      payload: error,
    };
  }

  return {
    status: 'cancel',
  };
});
