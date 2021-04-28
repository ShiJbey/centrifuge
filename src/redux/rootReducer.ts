import { combineReducers } from 'redux';
import editorsReducer from './editors/editorReducer';
import alertsReducer from './alerts/alertsReducer';

const rootReducer = combineReducers({
  alerts: alertsReducer,
  editors: editorsReducer,
});

export default rootReducer;
