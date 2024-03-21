import {createSlice, PayloadAction } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
    name: 'room',
    initialState: {
        clients: 0,
        locked: false,
        private: false,
        maxClients: 50,
        unlisted: false,
        createdAt: 'none',
        name: 'AzariaRoom',
        processId: 'none',
        publicAddress: 'us-atl-3b185468.colyseus.cloud',
        roomId: 'none',
        sessionId: 'none'
    },
    reducers: {
        SET_RESERVATION: (state, { payload }) => {
            console.log({ payload });
           // state = payload;
            return {
                ...state,
                ...payload
            }
        }
}})

export const {SET_RESERVATION} = reservationSlice.actions;
export default reservationSlice.reducer;
