export default interface ElectronAPI {
  openFile: () => void;
  send: (channel: string, ...data: any[]) => void;
  sendSync: (channel: string, ...data: any[]) => any;
  receive: (channel: string, ...data: any[]) => void;
}
