import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './reducers/profileSlice';
export const store = configureStore({
    reducer:{
        profile: profileReducer
    }
})