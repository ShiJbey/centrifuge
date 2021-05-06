import { ipcRenderer, contextBridge, dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import ElectronAPI from './utility/electronApi';
import { OPEN_SAVE_AS } from './utility/electronChannels';

const api: ElectronAPI = {
  listDirectory: (dir: string): string[] => {
    try {
      return fs
        .readdirSync(dir)
        .filter((filename) => path.extname(filename) === '.ctr');
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  readDiagramFile: (filename: string): any => {
    try {
      return JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }));
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  saveAs: async (): Promise<string> => {
    try {
      const path = await ipcRenderer.invoke(OPEN_SAVE_AS);
      return path;
    } catch (error) {
      console.error(error);
    }
  },
  writeFile: (filename: string, data: any): void => {
    try {
      fs.writeFileSync(filename, data);
      console.log("Write Done");
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  openFile: () => {
    return dialog.showSaveDialog({
      title: 'Save Diagram',
      buttonLabel: 'Save',
      filters: [
        {
          name: 'Diagram Files',
          extensions: ['json', 'JSON', 'centi'],
        },
      ],
    });
  },
  send: (channel: string, ...data: any[]): void => {
    ipcRenderer.send(channel, data);
  },
  sendSync: (channel: string, ...data: any[]): any => {
    return ipcRenderer.sendSync(channel, data);
  },
  receive: (
    channel: string,
    func: (event: Electron.IpcRendererEvent, ...v: any[]) => void
  ): void => {
    ipcRenderer.on(channel, func);
  },
  removeListener: (channel: string, cb: (...args: any[]) => void) => ipcRenderer.removeListener(channel, cb),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
  on: ipcRenderer.on,
};

contextBridge.exposeInMainWorld('electron', api);
