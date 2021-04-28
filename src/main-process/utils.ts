import { dialog } from 'electron';
import * as fs from 'fs';

export function openDataFile(): Promise<any> {
  const filePaths = dialog.showOpenDialogSync({
    filters: [{
      name: 'Json', extensions: ['json', 'JSON']
    }],
    title: 'Open Simulation Data JSON',
    properties: ['openFile']
  });

  if (filePaths.length) {
    const [path] = filePaths;
    try {
      return JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
    } catch (error) {
      console.error(error);
    }
  }
}
