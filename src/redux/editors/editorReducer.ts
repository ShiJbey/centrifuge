import { SELECT_EDITOR, ADD_EDITOR, DELETE_EDITOR, EditorActionTypes, UPDATE_EDITOR } from './editorTypes';
import { Reducer } from 'react';
import Application from '../../Application';

export interface EditorState {
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
  activeEditor?: number;
  editors: EditorState[];
}

const initialState: EditorsReduxState = {
  editors: [],
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
          activeEditor = i;
        }
      }

      if (editorExists) {
        return {
          activeEditor,
          editors: modifiedEditors,
        }
      } else {
        const app = new Application();

        if (action.payload.model) {
          app.getActiveDiagram().deserializeModel(action.payload.model as any, app.getDiagramEngine());
        }

        // Create a new editor and push it to the array
        modifiedEditors.push({
          active: true,
          dirty: false,
          model: action.payload.model,
          filepath: action.payload.path,
          title: action.payload.title,
          app,
        });


        const newState = {
          activeEditor: modifiedEditors.length - 1,
          editors: modifiedEditors,
        };

        return newState;
      }
    }
    case DELETE_EDITOR: {
      const modifiedEditors = [...state.editors];
      modifiedEditors.splice(action.payload.index, 1);

      if (modifiedEditors.length) {
        const activeEditor = Math.max(0, Math.min(state.activeEditor ?? -1, modifiedEditors.length - 1))
        return {
          activeEditor,
          editors: modifiedEditors,
        };
      } else {
        return {
          editors: modifiedEditors,
        };
      }
    }
    case UPDATE_EDITOR: {
      const modifiedEditors = [...state.editors];

      modifiedEditors[state.activeEditor] = {
        ...modifiedEditors[state.activeEditor],
        ...action.payload,
      }

      return {
        ...state,
        editors: modifiedEditors,
      };
    }
    case SELECT_EDITOR: {
      const modifiedEditors = [...state.editors];

      // Unselect all existing editors
      for (const editor of modifiedEditors) {
        editor.active = false;
      }

      modifiedEditors[action.payload.index].active = true;

      return {
        activeEditor: action.payload.index,
        editors: modifiedEditors,
      }
    }
    default:
      return state;
  }
}

export default editorsReducer;
