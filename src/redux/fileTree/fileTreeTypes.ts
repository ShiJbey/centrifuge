import { DirectoryTree } from 'directory-tree';
import { Action } from 'redux';

export const UPDATE_TREE = 'UPDATE_TREE';
export const CLEAR_TREE = 'CLEAR_TREE';

export interface UpdateTreeAction extends Action {
  type: typeof UPDATE_TREE;
  payload: DirectoryTree;
}

export interface ClearTreeAction extends Action {
  type: typeof CLEAR_TREE;
}

export type FileTreeActionType =
  | ClearTreeAction
  | UpdateTreeAction;
