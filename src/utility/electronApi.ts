import { DirectoryTree } from 'directory-tree';
import SavedPatternData from './models/savedPatternData';

export default interface ElectronAPI {
    listDirectory: (dir: string) => Promise<string[]>;
    writeFile: (filename: string, data: any) => Promise<SaveFileResponse>;
    saveAs: () => Promise<SaveFileRequest>;
    readDiagramFile: (filename: string) => Promise<SavedPatternData>;
    invoke: (channel: string, ...data: any[]) => Promise<any>;
    send: (channel: string, ...data: any[]) => void;
    sendSync: (channel: string, ...data: any[]) => any;
    receive: (
        channel: string,
        func: (event: Electron.IpcRendererEvent, ...v: any[]) => void
    ) => void;
    removeListener: (channel: string, cb: (...args: any[]) => void) => void;
    removeAllListeners: (channel: string) => void;
    createUUID: () => string;
    getFileBasename: (path: string) => string;
}

export interface OpenDirectoryResponse {
    payload?: DirectoryTree;
    status: 'ok' | 'error' | 'canceled';
    msg?: string;
}

export interface OpenFileResponse<T = any> {
    msg?: string;
    payload?: {
        data: T;
        path: string;
        name: string;
        extension: string;
    };
    status: 'ok' | 'error' | 'cancel';
}

export interface SaveFileRequest {
    path?: string;
}

export interface SaveFileResponse {
    msg?: string;
    payload?: any;
    status: 'ok' | 'error';
}
