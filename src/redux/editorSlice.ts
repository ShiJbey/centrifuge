import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializedDiagram } from 'src/utility/serialization';
import ElectronAPI from '../utility/electronApi';

declare const electron: ElectronAPI;

export interface EditorState {
    /** Unique identifier for this editor */
    id: string;
    /** Does this editor have unsaved changes */
    dirty: boolean;
    /** The path that this diagram is saved at (undefined if not saved) */
    filepath?: string;
    /** Name of the pattern*/
    patternName: string;
    /** Serialized node Model */
    model?: SerializedDiagram;
}

interface EditorsReduxState {
    activeEditor?: string;
    editors: EditorState[];
}

export interface UpdateEditorChanges {
    patternName?: string;
    filepath?: string;
    dirty?: boolean;
    model?: SerializedDiagram;
}

const initialState: EditorsReduxState = {
    editors: [],
};

export const EditorSlice = createSlice({
    name: 'editors',
    initialState,
    reducers: {
        addEditor: (state, action: PayloadAction<UpdateEditorChanges>) => {
            const modifiedEditors = [...state.editors];

            // Give the editor a patternName
            const id = electron.createUUID();

            // Create a new editor and push it to the array
            modifiedEditors.push({
                id,
                dirty: false,
                filepath: action.payload.filepath,
                patternName: action.payload.patternName ?? 'New Pattern',
                model: action.payload.model,
            });

            return {
                ...state,
                activeEditor: id,
                editors: modifiedEditors,
            };
        },
        removeEditor: (state, action: PayloadAction<string>) => {
            const modifiedEditors = [...state.editors];

            let deletedEditorIndex = -1;

            for (let i = 0; i < state.editors.length; i++) {
                if (state.editors[i].id === action.payload) {
                    deletedEditorIndex = i;
                }
            }

            if (deletedEditorIndex === -1) return state;

            modifiedEditors.splice(deletedEditorIndex, 1);

            if (modifiedEditors.length > 0) {
                // There are editors still open
                if (state.activeEditor === action.payload) {
                    const activeEditorIndex = Math.max(
                        0,
                        Math.min(deletedEditorIndex, modifiedEditors.length - 1)
                    );

                    return {
                        ...state,
                        activeEditor: modifiedEditors[activeEditorIndex].id,
                        editors: modifiedEditors,
                    };
                }

                return {
                    ...state,
                    editors: modifiedEditors,
                };
            } else {
                // There are no editors open
                return {
                    ...state,
                    editors: modifiedEditors,
                    activeEditor: undefined,
                };
            }
        },
        updateEditor: (
            state,
            action: PayloadAction<{
                id: string;
                changes: UpdateEditorChanges;
            }>
        ) => {
            const modifiedEditors = [...state.editors].map((editor) => {
                if (editor.id === action.payload.id) {
                    return {
                        ...editor,
                        dirty: !!action.payload.changes.dirty,
                        patternName:
                            action.payload.changes.patternName ??
                            editor.patternName,
                        filepath:
                            action.payload.changes.filepath ?? editor.filepath,
                        model: action.payload.changes.model ?? editor.model,
                    } as EditorState;
                } else {
                    return editor;
                }
            });

            return {
                ...state,
                editors: modifiedEditors,
            };
        },
        selectEditor: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                activeEditor: action.payload,
            };
        },
    },
});

export const { addEditor, removeEditor, selectEditor, updateEditor } =
    EditorSlice.actions;
