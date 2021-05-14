import {
  BrowserWindow,
  dialog,
} from 'electron';
import * as fs from 'fs';

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

export async function openDirectory(win: BrowserWindow): Promise<OpenDirectoryResponse> {
  try {
    const ret = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    });

    if (!ret.canceled) {
      const [path] = ret.filePaths;

      const files = fs.readdirSync(path);

      const response: OpenDirectoryResponse = {
        path,
        files,
        status: 'ok',
      };

      return response
    }
  } catch (error) {
    return {
      status: 'error',
      path: '',
      files: [],
      msg: error.message ?? 'Error encountered while opening folder',
    };
  }
}

export async function openFile(win: BrowserWindow, filters?: Electron.FileFilter[]): Promise<OpenFileResponse> {
  try {
    const ret = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
      filters
    });

    if (!ret.canceled) {
      const [path] = ret.filePaths;

      const data = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));

      const response: OpenFileResponse = {
        status: 'ok',
        payload: data,
      };

      return response;
    }
  } catch (error) {
    return {
      status: 'error',
      msg: error.message ?? 'Error encountered while opening file',
    };
  }
}

export async function saveFile(): Promise<SaveFileRequest> {
  const request: SaveFileRequest = {};
  return request;
}

export async function savePatternAs(win: BrowserWindow): Promise<SaveFileRequest> {
  try {
    const ret = await dialog.showSaveDialog(win, {
      title: 'Save Pattern',
      buttonLabel: 'Save',
      defaultPath: './New Pattern',
      filters: [
        {
          name: 'Centrifuge Pattern',
          extensions: ['ctr'],
        },
      ],
    });

    if (!ret.canceled) {
      const request: SaveFileRequest = {
        path: ret.filePath,
      };
      return request;
    }
  } catch (error) {
    return null;
  }
}
