import { combineReducers } from 'redux';
import editorsReducer from './editors/editorReducer';
import alertsReducer from './alerts/alertsReducer';
import databaseReducer from './database/databaseReducer';
import fileTreeReducer from './fileTree/fileTreeReducer';

const rootReducer = combineReducers({
  alert: alertsReducer,
  editor: editorsReducer,
  database: databaseReducer,
  fileTree: fileTreeReducer,
});

export default rootReducer;
