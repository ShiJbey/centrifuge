import {
    BrowserWindow,
    dialog,
    OpenDialogReturnValue,
    SaveDialogReturnValue,
    WebContents,
} from 'electron';
import fs from 'fs';
import path from 'path';
import dirTree from 'directory-tree';
import chokidar from 'chokidar';
import { DIR_CHANGE } from '../utility/electronChannels';
import {
    OpenDirectoryResponse,
    OpenFileResponse,
    SaveFileRequest,
} from '../utility/electronApi';

// Map watcher objects to windows
const watchers: {
    [key: number]: { watcher: chokidar.FSWatcher; path: string };
} = {};

export async function openDirectory(
    win?: BrowserWindow
): Promise<OpenDirectoryResponse> {
    try {
        let ret: Electron.OpenDialogReturnValue;
        if (win) {
            ret = await dialog.showOpenDialog(win, {
                properties: ['openDirectory', 'createDirectory'],
            });
        } else {
            ret = await dialog.showOpenDialog({
                properties: ['openDirectory', 'createDirectory'],
            });
        }

        if (ret && !ret.canceled) {
            const [path] = ret.filePaths;

            const payload = dirTree(path, { extensions: /\.json/ });

            const response: OpenDirectoryResponse = {
                payload,
                status: 'ok',
            };

            return response;
        } else {
            return {
                status: 'canceled',
            };
        }
    } catch (error) {
        return {
            status: 'error',
            msg:
                (error as Error).message ??
                'Error encountered while opening folder',
        };
    }
}

export async function openFile(
    win?: BrowserWindow,
    filters?: Electron.FileFilter[]
): Promise<OpenFileResponse> {
    try {
        let ret: OpenDialogReturnValue;

        if (win) {
            ret = await dialog.showOpenDialog(win, {
                properties: ['openFile'],
                filters,
            });
        } else {
            ret = await dialog.showOpenDialog({
                properties: ['openFile'],
                filters,
            });
        }

        if (ret && !ret.canceled) {
            const [filepath] = ret.filePaths;

            const data = fs.readFileSync(filepath, { encoding: 'utf-8' });

            const response: OpenFileResponse = {
                status: 'ok',
                payload: {
                    data,
                    path: filepath,
                    name: path.basename(filepath),
                    extension: path.extname(filepath),
                },
            };

            return response;
        } else {
            return {
                status: 'cancel',
                msg: 'Open File Operation canceled',
            };
        }
    } catch (error) {
        return {
            status: 'error',
            msg:
                (error as Error).message ??
                'Error encountered while opening file',
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
        let ret: SaveDialogReturnValue;
        if (win) {
            ret = await dialog.showSaveDialog(win, {
                title: 'Save Pattern',
                buttonLabel: 'Save',
                defaultPath: './New Pattern',
                filters: [
                    {
                        name: 'Centrifuge Pattern',
                        extensions: ['json'],
                    },
                ],
            });
        } else {
            ret = await dialog.showSaveDialog({
                title: 'Save Pattern',
                buttonLabel: 'Save',
                defaultPath: './New Pattern',
                filters: [
                    {
                        name: 'Centrifuge Pattern',
                        extensions: ['json'],
                    },
                ],
            });
        }

        if (!ret.canceled) {
            const request: SaveFileRequest = {
                path: ret.filePath,
            };
            return request;
        }
    } catch (error) {
        console.error(error);
    }
    return {};
}

export function watchDirectory(path: string, renderer: WebContents): void {
    const watcher = chokidar.watch(path).on('all', () => {
        renderer.send(
            DIR_CHANGE,
            dirTree(path, {
                extensions: /\.json/,
                normalizePath: true,
            })
        );
    });

    watchers[renderer.getProcessId()] = { watcher, path };
}

export function unWatchDirectory(renderer: WebContents): void {
    const processId = renderer.getProcessId();
    const path = watchers[processId].path;
    const watcher = watchers[processId].watcher;
    watcher.unwatch(path);
    watcher.unwatch('*');
    watcher.removeAllListeners();
    delete watchers[processId];
}
