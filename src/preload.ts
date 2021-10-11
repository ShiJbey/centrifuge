import { ipcRenderer, contextBridge } from 'electron';
import fs from 'fs';
import path from 'path';
import { v1 as uuid_v1 } from 'uuid';
import ElectronAPI, {
    SaveFileRequest,
    SaveFileResponse,
} from './utility/electronApi';
import { OPEN_SAVE_AS } from './utility/electronChannels';
import SavedPatternData from './utility/models/savedPatternData';

const api: ElectronAPI = {
    listDirectory: async (dir: string): Promise<string[]> => {
        try {
            return fs
                .readdirSync(dir)
                .filter((filename) => path.extname(filename) === '.json');
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    readDiagramFile: async (filename: string): Promise<SavedPatternData> => {
        return JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }));
    },
    saveAs: async (): Promise<SaveFileRequest> => {
        return ipcRenderer.invoke(OPEN_SAVE_AS);
    },
    writeFile: async (
        filename: string,
        data: any
    ): Promise<SaveFileResponse> => {
        try {
            fs.writeFileSync(filename, data);
            return {
                status: 'ok',
                msg: 'File save successful',
            };
        } catch (error) {
            return {
                status: 'error',
                msg: (error as Error).message,
                payload: error,
            };
        }
    },
    invoke: (channel: string, ...data: any[]): Promise<any> => {
        return ipcRenderer.invoke(channel, data);
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
    removeListener: (channel: string, cb: (...args: any[]) => void) =>
        ipcRenderer.removeListener(channel, cb),
    removeAllListeners: (channel: string) =>
        ipcRenderer.removeAllListeners(channel),
    createUUID: () => {
        return uuid_v1();
    },
    getFileBasename: (filepath: string) => {
        return path.basename(filepath);
    },
};

contextBridge.exposeInMainWorld('electron', api);
