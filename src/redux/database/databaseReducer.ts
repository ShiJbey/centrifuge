import { Reducer } from "react";
import { CLEAR, DatabaseAction, LOAD } from './databaseTypes';
import SimulationDatabase from "../../database/simulationDatabase";

export interface DatabaseReduxState {
  database: SimulationDatabase;
}

const initialState = {
  database: new SimulationDatabase(),
}

const databaseReducer: Reducer<DatabaseReduxState, DatabaseAction> = (state = initialState, action) => {
  switch(action.type) {
    case CLEAR:
      state.database.reset
      return {...state};
    case LOAD:
      state.database.loadTalkOfTheTown(action.payload)
      return state;
    default:
      return state;
  }
}

export default databaseReducer;
