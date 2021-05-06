import { combineReducers } from 'redux';
import editorsReducer from './editors/editorReducer';
import alertsReducer from './alerts/alertsReducer';
import databaseReducer from './database/databaseReducer';

const rootReducer = combineReducers({
  alert: alertsReducer,
  editor: editorsReducer,
  database: databaseReducer,
});

export default rootReducer;
