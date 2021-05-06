import { Action } from "redux";

export const LOAD = 'LOAD';
export const CLEAR = 'CLEAR';

export interface LoadDataAction extends Action {
  type: typeof LOAD;
  payload: {
    data: {[attr: string]: any};
  }
}

export interface ClearDataAction extends Action {
  type: typeof CLEAR;
}

export type DatabaseAction =
  | LoadDataAction
  | ClearDataAction;
