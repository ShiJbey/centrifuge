import { SELECT_EDITOR, ADD_EDITOR, DELETE_EDITOR, EditorActionTypes, UPDATE_EDITOR } from './editorTypes';
import { Reducer } from 'react';
import Application from '../../Application';
import ElectronAPI from '../../utility/electronApi';

declare const electron: ElectronAPI;

export interface EditorState {
  /** Unique identifier for this editor */
  id: string;
  /** Is this editor currently active in the GUI */
  active: boolean;
  /** Title displayed in the editor's tab */
  title: string;
  /** Has this diagram been edited since its last save */
  dirty: boolean;
  /** Serialized react-diagram model */
  model?: { [key: string]: any };
  /** Datascript query representation of the current model */
  code?: string;
  /** The path that this diagram is saved at (undefined if not saved) */
  filepath?: string;
  /** Application running the editor */
  app: Application;
}

export interface EditorsReduxState {
  activeEditor?: string;
  editors: EditorState[];
  tempEditors: number;
}

const initialState: EditorsReduxState = {
  editors: [],
  tempEditors: 0,
};

const editorsReducer: Reducer<EditorsReduxState, EditorActionTypes> = (state = initialState, action) => {
  switch(action.type) {
    case ADD_EDITOR: {
      const modifiedEditors = [...state.editors];
      let editorExists = false;
      let activeEditor = state.activeEditor;

      // Unselect all existing editors
      // Check if the desired file is already open
      for (let i = 0; i < modifiedEditors.length; i++) {
        const editor = modifiedEditors[i];
        editor.active = false;
        if (editor.filepath && editor.filepath === action.payload.path) {
          editorExists = true;
          editor.active = true;
          activeEditor = editor.id;
        }
      }

      if (editorExists) {
        return {
          ...state,
          activeEditor,
          editors: modifiedEditors,
        }
      } else {
        const app = new Application();

        if (action.payload.model) {
          app.getActiveDiagram().deserializeModel(action.payload.model as any, app.getDiagramEngine());
        }

        // Give the editor a title
        let title = action.payload.title ?? 'NewPattern';
        if (state.tempEditors > 0) {
          title = `${title}_${state.tempEditors}`;
        }

        // Create an editor ID using the hash of the path
        let id = '';
        if (action.payload.path) {
          id = electron.createSHA1(action.payload.path);
        } else {
          id = electron.createSHA1(title);
        }

        // Create a new editor and push it to the array
        modifiedEditors.push({
          id,
          active: true,
          dirty: false,
          model: action.payload.model,
          filepath: action.payload.path,
          title,
          app,
        });


        return {
          ...state,
          activeEditor: id,
          editors: modifiedEditors,
          tempEditors: (action.payload.path) ? state.tempEditors : state.tempEditors + 1,
        };
      }
    }

    case DELETE_EDITOR: {
      const modifiedEditors = [...state.editors]

      let deletedEditorIndex = -1;

      for (let i = 0; i < state.editors.length; i++) {
        if (state.editors[i].id === action.payload.id) {
          deletedEditorIndex = i;
        }
      }


      modifiedEditors.splice(deletedEditorIndex, 1);


      if (modifiedEditors.length) {
        if (state.activeEditor === action.payload.id) {
          const activeEditorIndex = Math.max(0, Math.min(deletedEditorIndex, modifiedEditors.length - 1));
          modifiedEditors[activeEditorIndex].active = true;
          return {
            ...state,
            activeEditor: modifiedEditors[activeEditorIndex].id,
            editors: modifiedEditors,
          };
        }
        return {
          ...state,
          editors: modifiedEditors,
        }
      } else {
        return {
          ...state,
          editors: modifiedEditors,
        };
      }
    }

    case UPDATE_EDITOR: {
      const modifiedEditors = [...state.editors]
        .map((editor) => {
          if (editor.id === action.payload.id) {
            return {
              ...editor,
              ...action.payload.changes,
            };
          } else {
            return editor;
          }
        });

      return {
        ...state,
        editors: modifiedEditors,
      };
    }

    case SELECT_EDITOR: {
      const modifiedEditors = [...state.editors];

      for (const editor of modifiedEditors) {
        editor.active = false;
        if (editor.id === action.payload.id) {
          editor.active = true;
        }
      }

      return {
        ...state,
        activeEditor: action.payload.id,
        editors: modifiedEditors,
      }
    }

    default:
      return state;
  }
}

export default editorsReducer;
