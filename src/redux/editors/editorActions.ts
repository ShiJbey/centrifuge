import { SerializedDiagram } from '../../utility/serialization';
import { EditorState } from './editorReducer';
import {
  ADD_EDITOR,
  DELETE_EDITOR,
  UPDATE_EDITOR,
  SELECT_EDITOR,
  AddEditorAction,
  DeleteEditorAction,
  UpdateEditorAction,
  SelectEditorAction,
} from './editorTypes';

export const addEditor = (options?: {
  title?: string,
  path?: string,
  model?: SerializedDiagram
}): AddEditorAction => {
  return {
    type: ADD_EDITOR,
    payload: {
      ...options,
    },
  };
};

export const selectEditor = (
  id: string,
): SelectEditorAction => {
  return {
    type: SELECT_EDITOR,
    payload: { id },
  };
};

export const deleteEditor = (id: string): DeleteEditorAction => {
  return {
    type: DELETE_EDITOR,
    payload: { id },
  };
};

export const updateEditor = (id: string, newState?: EditorState): UpdateEditorAction => {
  return {
    type: UPDATE_EDITOR,
    payload: {
      id,
      changes: {...newState},
    },
  };
};
