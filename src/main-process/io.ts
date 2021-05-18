import { BrowserWindow, dialog, WebContents } from 'electron';
import * as fs from 'fs';
import dirTree, { DirectoryTree } from 'directory-tree';
import chokidar from 'chokidar';
import { DIR_CHANGE } from '../utility/electronChannels';

// Map watcher objects to windows
const watchers: {
  [key: number]: { watcher: chokidar.FSWatcher; path: string };
} = {};

export interface OpenDirectoryResponse {
  payload?: DirectoryTree;
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

export interface SaveFileResponse {
  msg?: string;
  payload?: any;
  status: 'ok' | 'error';
}

export async function openDirectory(
  win?: BrowserWindow
): Promise<OpenDirectoryResponse> {
  try {
    const ret = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    });

    if (!ret.canceled) {
      const [path] = ret.filePaths;

      const payload = dirTree(path);

      const response: OpenDirectoryResponse = {
        payload,
        status: 'ok',
      };

      return response;
    }
  } catch (error) {
    return {
      status: 'error',
      msg: error.message ?? 'Error encountered while opening folder',
    };
  }
}

export async function openFile(
  win?: BrowserWindow,
  filters?: Electron.FileFilter[]
): Promise<OpenFileResponse> {
  try {
    const ret = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
      filters,
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

export async function savePatternAs(
  win?: BrowserWindow
): Promise<SaveFileRequest> {
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

export function watchDirectory(path: string, renderer: WebContents): void {
  const watcher = chokidar.watch(path).on('all', () => {
    renderer.send(DIR_CHANGE, dirTree(path));
  });

  watchers[renderer.getProcessId()] = { watcher, path };
}

export function unWatchDirectory(renderer: WebContents): void {
  const processId = renderer.getProcessId();
  const path = watchers[processId].path;
  const watcher = watchers[processId].watcher;
  watcher.unwatch(path);
  delete watchers[processId];
}
