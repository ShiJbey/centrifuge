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

export const addEditor = (
  title: string,
  path?: string,
  model?: SerializedDiagram
): AddEditorAction => {
  return {
    type: ADD_EDITOR,
    payload: {
      title,
      path,
      model,
    },
  };
};

export const selectEditor = (
  index: number,
): SelectEditorAction => {
  return {
    type: SELECT_EDITOR,
    payload: { index },
  };
};

export const deleteEditor = (index: number): DeleteEditorAction => {
  return {
    type: DELETE_EDITOR,
    payload: { index },
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
