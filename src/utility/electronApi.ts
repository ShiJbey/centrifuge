export default interface ElectronAPI {
  listDirectory: (dir: string) => string[];
  writeFile: (filename: string, data: any) => void;
  saveAs: () => Promise<SaveFileRequest>;
  readDiagramFile: (filename: string) => any;
  openTownFile: () => Promise<OpenFileResponse>;
  send: (channel: string, ...data: any[]) => void;
  sendSync: (channel: string, ...data: any[]) => any;
  receive: (channel: string, func: (event: Electron.IpcRendererEvent, ...v: any[]) => void) => void;
  removeListener: (channel: string, cb: (...args: any[]) => void) => void;
  removeAllListeners: (channel: string) => void;
}

export interface OpenDirectoryResponse {
  path: string;
  files: string[];
  status: 'ok' | 'error' | 'canceled';
  msg?: string;
}

export interface OpenFileResponse {
  msg?: string;
  payload?: any;
  status: 'ok' | 'error' | 'cancel';
}

export interface SaveFileRequest {
  path?: string;
}
