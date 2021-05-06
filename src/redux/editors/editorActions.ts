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

export const addEditor = (
  id: string,
  title: string,
  path?: string,
  model?: any
): AddEditorAction => {
  return {
    type: ADD_EDITOR,
    payload: {
      id,
      title,
      path,
      model,
    },
  };
};

export const selectEditor = (
  id: string,
): SelectEditorAction => {
  return {
    type: SELECT_EDITOR,
    payload: {
      id
    },
  };
};

export const deleteEditor = (id: string): DeleteEditorAction => {
  return {
    type: DELETE_EDITOR,
    payload: {
      id,
    },
  };
};

export const updateEditor = (newState?: EditorState): UpdateEditorAction => {
  return {
    type: UPDATE_EDITOR,
    payload: {
      ...newState,
    },
  };
};
