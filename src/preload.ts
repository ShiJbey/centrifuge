import { ipcRenderer } from "electron";

(() => {
  const ret = ipcRenderer.sendSync('get-init-file');
  console.log(ret);
})
