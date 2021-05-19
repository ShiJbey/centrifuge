import { Reducer } from "react";
import { CLEAR, DatabaseAction, LOAD } from './databaseTypes';
import SimulationDatabase from "../../database/simulationDatabase";

declare global {
  interface Window {
      db:any;
  }
}

export interface DatabaseReduxState {
  database: SimulationDatabase;
}

const initialState = {
  database: new SimulationDatabase(),
}

const databaseReducer: Reducer<DatabaseReduxState, DatabaseAction> = (state = initialState, action) => {
  switch(action.type) {
    case CLEAR:
      state.database.reset();
      return {...state};
    case LOAD:
      window.db = state.database;
      state.database.loadTalkOfTheTown(action.payload.data);
      return state;
    default:
      return state;
  }
}

export default databaseReducer;
