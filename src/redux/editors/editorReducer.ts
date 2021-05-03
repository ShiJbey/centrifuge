import { AddEditorAction, SELECT_EDITOR, ADD_EDITOR, DELETE_EDITOR, EditorActionTypes, UPDATE_EDITOR } from './editorTypes';
import { EditorState } from '../../components/App';
import { v4 as uuidv4 } from 'uuid';

export interface EditorsReduxState {
  currentEditor?: string;
  editors: {[key: string]: EditorState};
}

const initialState: EditorsReduxState = {
  editors: {},
};

const editorsReducer = (state = initialState, action: EditorActionTypes): EditorsReduxState => {
  switch(action.type) {
    case ADD_EDITOR: {
      let id = uuidv4();
      if (Object.keys(state.editors).includes(id)) {
        console.warn('Conflicting UUIDs');
        id = uuidv4();
      }

      const modifiedEditors = {...state.editors};

      for (const key of Object.keys(modifiedEditors)) {
        modifiedEditors[key].active = false;
      }

      const newState = {
        currentEditor: id,
        editors: {
          ...modifiedEditors,
          [id]: {
            ...action.payload,
            id,
            active: true,
            dirty: false,
            model: {},
          }
        }
      };

      return newState;
    }
    case DELETE_EDITOR: {
      const selectedId = action.payload.id;
      const modifiedEditors = {...state.editors};
      delete modifiedEditors[selectedId];
      if (state.currentEditor === selectedId &&  Object.keys(modifiedEditors).length > 0) {
        const [newSelection] = Object.keys(modifiedEditors);
        modifiedEditors[newSelection].active = true;
        return {
          currentEditor: newSelection,
          editors: modifiedEditors,
        }
      } else {
        return {
          currentEditor: null,
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
      if (state.currentEditor) {
        modifiedEditors[state.currentEditor].active = false;
      }
      return {
        currentEditor: selectedId,
        editors: modifiedEditors,
      }
    }
    default:
      return state;
  }
}

export default editorsReducer;
