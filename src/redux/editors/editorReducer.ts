import { SELECT_EDITOR, ADD_EDITOR, DELETE_EDITOR, EditorActionTypes, UPDATE_EDITOR } from './editorTypes';
import { Reducer } from 'react';

export interface EditorState {
  /** Unique ID for this editor instance */
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
}

export interface EditorsReduxState {
  activeEditor?: string;
  editors: {[key: string]: EditorState};
}

const initialState: EditorsReduxState = {
  editors: {},
  activeEditor: '',
};

const editorsReducer: Reducer<EditorsReduxState, EditorActionTypes> = (state = initialState, action: EditorActionTypes): EditorsReduxState => {
  switch(action.type) {
    case ADD_EDITOR: {
      const id = action.payload.id;

      const modifiedEditors = {...state.editors};

      if (state.activeEditor) {
        modifiedEditors[state.activeEditor].active = false;
      }

      const newState = {
        activeEditor: id,
        editors: {
          ...state.editors,
          [id]: {
            active: true,
            dirty: false,
            model: {},
            ...action.payload,
          }
        }
      };

      return newState;
    }
    case DELETE_EDITOR: {
      const selectedId = action.payload.id;
      const modifiedEditors = {...state.editors};
      delete modifiedEditors[selectedId];
      if (state.activeEditor === selectedId &&  Object.keys(modifiedEditors).length > 0) {
        const [newSelection] = Object.keys(modifiedEditors);
        modifiedEditors[newSelection].active = true;
        return {
          activeEditor: newSelection,
          editors: modifiedEditors,
        }
      } else {
        return {
          activeEditor: null,
          editors: modifiedEditors,
        }
      }
    }
    case UPDATE_EDITOR: {
      const selectedId = action.payload.id;
      const modifiedEditors = {...state.editors};
      modifiedEditors[selectedId] = {
        ...modifiedEditors[selectedId],
        ...action.payload,
      }
      return {
        ...state,
        editors: modifiedEditors,
      };
    }
    case SELECT_EDITOR: {
      const selectedId = action.payload.id;
      const modifiedEditors = {...state.editors};
      modifiedEditors[selectedId].active = true;
      if (state.activeEditor) {
        modifiedEditors[state.activeEditor].active = false;
      }
      return {
        activeEditor: selectedId,
        editors: modifiedEditors,
      }
    }
    default:
      return state;
  }
}

export default editorsReducer;
