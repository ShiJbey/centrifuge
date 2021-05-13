export const OPEN_FILE_ERROR = 'OPEN_FILE_ERROR';
export const OPEN_DIR_ERROR = 'OPEN_DIR_ERROR';
export const OPEN_DIR = 'OPEN_DIR';
export const OPEN_DIAGRAM_FILE = 'OPEN_DIAGRAM_FILE';
export const SAVE_DIAGRAM = 'SAVE_DIAGRAM';
export const SAVE_DIAGRAM_ERROR = 'SAVE_DIAGRAM_ERROR';
export const OPEN_SIM_FILE = 'OPEN_FILE';
export const GET_INIT_DATA = 'GET_INIT_DATA';
export const OPEN_SAVE_AS = 'OPEN_SAVE_AS';

export interface OpenFileResponse {
  msg?: string;
  payload?: any;
  status: 'ok' | 'error' | 'cancel';
}
