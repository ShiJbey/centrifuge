import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AlertInfo from 'src/utility/models/AlertInfo';

export interface AlertsReduxState {
    alerts: AlertInfo[];
}

const initialState: AlertsReduxState = {
    alerts: [],
};

export const AlertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<AlertInfo>) => {
            return {
                alerts: [...state.alerts, action.payload],
            };
        },
        removeAlert: (state, action: PayloadAction<number>) => {
            const indexToRemove = action.payload;

            if (indexToRemove >= 0 && indexToRemove < state.alerts.length) {
                const modifiedAlertArray = [...state.alerts];
                modifiedAlertArray.splice(indexToRemove, 1);
                return {
                    ...state,
                    alerts: modifiedAlertArray,
                };
            } else {
                return state;
            }
        },
    },
});

export const { addAlert, removeAlert } = AlertSlice.actions;
