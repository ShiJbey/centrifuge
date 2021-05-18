import {DirectoryTree} from 'directory-tree';
import { UpdateTreeAction, ClearTreeAction, UPDATE_TREE, CLEAR_TREE } from './fileTreeTypes';

export const updateDirectoryTree = (newTree: DirectoryTree): UpdateTreeAction => {
  return {
    type: UPDATE_TREE,
    payload: newTree,
  };
};

export const clearDirectoryTree = (): ClearTreeAction => {
  return {
    type: CLEAR_TREE,
  };
};
