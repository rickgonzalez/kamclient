import {configureStore} from '@reduxjs/toolkit';
import roomReducer from './reducers/roomSlice';
export const store = configureStore({
    reducer:{
        roomReducer
    },
});

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;