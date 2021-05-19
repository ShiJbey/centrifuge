import { DirectoryTree } from 'directory-tree';
import crypto from 'crypto';

export default interface ElectronAPI {
  listDirectory: (dir: string) => string[];
  writeFile: (filename: string, data: any) => void;
  saveAs: () => Promise<SaveFileRequest>;
  readDiagramFile: (filename: string) => any;
  openTownFile: () => Promise<OpenFileResponse>;
  invoke: (channel: string, ...data: any[]) => Promise<any>;
  send: (channel: string, ...data: any[]) => void;
  sendSync: (channel: string, ...data: any[]) => any;
  receive: (
    channel: string,
    func: (event: Electron.IpcRendererEvent, ...v: any[]) => void
  ) => void;
  removeListener: (channel: string, cb: (...args: any[]) => void) => void;
  removeAllListeners: (channel: string) => void;
  createSHA1: (str: string) => string;
  getFileBasename: (path: string) => string;
}

export interface OpenDirectoryResponse {
  payload?: DirectoryTree;
  status: 'ok' | 'error' | 'canceled';
  msg?: string;
}

export interface OpenFileResponse {
  msg?: string;
  payload?: {
    data: any;
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
