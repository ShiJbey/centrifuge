import { Action } from '@reduxjs/toolkit';
import { ADD_ALERT, DELETE_ALERT } from './alertsTypes';

export const addAlert = (): Action => {
  return {
    type: ADD_ALERT,
  }
}

export const deleteAlert = (): Action => {
  return {
    type: DELETE_ALERT,
  }
}
