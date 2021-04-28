import { Action } from '@reduxjs/toolkit';
import { ADD_ALERT, DELETE_ALERT } from './alertsTypes';
import AlertData from '../../utility/alertData';

export interface AlertsReduxState {
  alerts: AlertData[];
}

const initialState: AlertsReduxState = {
  alerts: [],
}

const editorsReducer = (state: AlertsReduxState = initialState, action: Action): AlertsReduxState => {
  switch(action.type) {
    case ADD_ALERT:
      return state;
    case DELETE_ALERT:
      return state;
    default:
      return state;
  }
}

export default editorsReducer;
