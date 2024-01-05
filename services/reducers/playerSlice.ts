import {createSlice, PayloadAction } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        name: '?',
        email: 'none',
        id: 'none', 
        playerip:'none',
        verToken: 'none' ,
        isAuthenticated: false 
    },
    reducers: {
        SET_PLAYER: (state, { payload }) => {
            console.log({ payload });
           // state = payload;
            return {
                ...state,
                ...payload
            }
        }
}})

export const {SET_PLAYER} = playerSlice.actions;
export default playerSlice.reducer;
