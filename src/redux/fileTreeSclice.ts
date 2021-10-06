import { DirectoryTree } from 'directory-tree';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FileTreeState {
    directoryTree?: DirectoryTree;
}

const initialState: FileTreeState = {};

export const FileTreeSlice = createSlice({
    name: 'filetree',
    initialState,
    reducers: {
        updateDirectoryTree: (state, action: PayloadAction<DirectoryTree>) => {
            return {
                directoryTree: action.payload,
            };
        },
        clearDirectoryTree: () => {
            return {};
        },
    },
});

export const { updateDirectoryTree, clearDirectoryTree } =
    FileTreeSlice.actions;
