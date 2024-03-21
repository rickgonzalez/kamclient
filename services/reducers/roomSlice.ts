import {createSlice, PayloadAction } from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name: 'activeRoom',
    initialState: {
        roomid: 'none',
        friendly: 'none',
        reconnectToken: 'none', 
        roomtype:'none',
        sessionid: 'none' ,
        connected: false,
        private: false 
    },
    reducers: {
        SET_ACTIVEROOM: (state, { payload }) => {
            console.log({ payload });
           // state = payload;
            return {
                ...state,
                ...payload
            }
        }
}})

export const {SET_ACTIVEROOM} = roomSlice.actions;
export default roomSlice.reducer;