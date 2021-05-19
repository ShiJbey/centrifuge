import { DirectoryTree } from 'directory-tree';
import { Reducer } from 'react';
import { FileTreeActionType, UPDATE_TREE, CLEAR_TREE } from './fileTreeTypes';

export interface FileTreeState {
  directoryTree?: DirectoryTree;
}

export const fileTreeReducer: Reducer<FileTreeState, FileTreeActionType> = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TREE: {
      return {
        directoryTree: action.payload,
      };
    }
    case CLEAR_TREE: {
      return {};
    }
    default:
      return state;
  }
};

export default fileTreeReducer;
