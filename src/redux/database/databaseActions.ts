import { CLEAR, ClearDataAction, LOAD, LoadDataAction } from "./databaseTypes";

export const loadData = (data: {[attr: string]: any}): LoadDataAction => {
  return {
    type: LOAD,
    payload: {
      data
    },
  };
};

export const clearData = (): ClearDataAction => {
  return {
    type: CLEAR,
  };
};
