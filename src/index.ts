import * as fs from "fs";
import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { createMenu } from "./main-process/menu";
import { GET_INIT_DATA, OPEN_SAVE_AS } from "./utility/electronChannels";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
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
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
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
      const data = fs.readFileSync(openFilePath, "utf-8");
      event.returnValue = data;
    }
  }
  event.returnValue = null;
});

ipcMain.handle(OPEN_SAVE_AS, () => {
  const path = dialog.showSaveDialogSync({
    title: 'Save Diagram As...',
    buttonLabel: 'Save',
    defaultPath: './New Diagram',
    filters: [
      {
        name: 'Centrifuge Diagram',
        extensions: ['ctr']
      }
    ]
  });

  return path;
});
