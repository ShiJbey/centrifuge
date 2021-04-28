import { ipcRenderer, contextBridge, dialog } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openFile: () => {
    return dialog.showSaveDialog({
      title: 'Save Diagram',
      buttonLabel: 'Save',
      filters: [
        {
          name: 'Diagram Files',
          extensions: ['json', 'JSON', 'centi']
        }
      ]
    })
  },
  send: (channel: string, ...data: any[]) => {
    // whitelist channels
    const validChannels = ['get_init_file'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  sendSync: (channel: string, ...data: any[]) => {
    // whitelist channels
    const validChannels = ['get_init_file'];
    if (validChannels.includes(channel)) {
      return ipcRenderer.sendSync(channel, data);
    }
  },
  receive: (channel: string, func: (...v: any[]) => void) => {
    const validChannels = ['diagram_data', 'save_diagram'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
