export default interface ElectronAPI {
  listDirectory: (dir: string) => string[];
  writeFile: (filename: string, data: any) => void;
  saveAs: () => Promise<string>;
  readDiagramFile: (filename: string) => any;
  openFile: () => void;
  send: (channel: string, ...data: any[]) => void;
  sendSync: (channel: string, ...data: any[]) => any;
  receive: (channel: string, func: (event: Electron.IpcRendererEvent, ...v: any[]) => void) => void;
  on: (channel: string, func: (event: Electron.IpcRendererEvent, ...v: any[]) => void) => void;
  removeListener: (channel: string, cb: (...args: any[]) => void) => void;
  removeAllListeners: (channel: string) => void;
}
