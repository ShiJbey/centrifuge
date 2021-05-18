import { Action } from "redux";
import { SerializedDiagram } from "../../utility/serialization";

export const ADD_EDITOR = 'ADD_EDITOR';
export const SELECT_EDITOR = 'SELECT_EDITOR';
export const DELETE_EDITOR = 'DELETE_EDITOR';
export const UPDATE_EDITOR = 'UPDATE_EDITOR';

export interface AddEditorAction extends Action {
  type: typeof ADD_EDITOR;
  payload: {
    title: string;
    path?: string;
    model?: SerializedDiagram;
  };
}

export interface SelectEditorAction extends Action {
  type: typeof SELECT_EDITOR;
  payload: {
    index: number;
  };
}

export interface DeleteEditorAction extends Action {
  type: typeof DELETE_EDITOR;
  payload: {
    index: number;
  };
}

export interface UpdateEditorAction extends Action {
  type: typeof UPDATE_EDITOR;
  payload: {
    title?: string;
    path?: string;
    model?: any;
    active?: boolean;
    dirty?: boolean;
    code?: string;
  };
}

export type EditorActionTypes =
  | AddEditorAction
  | DeleteEditorAction
  | UpdateEditorAction
  | SelectEditorAction;
