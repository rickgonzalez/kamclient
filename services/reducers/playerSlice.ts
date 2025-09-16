import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: 'player',

    initialState: {
        playername: '',
        email: 'none',
        id: 'none', 
        playerip:'none',
        verToken: 'none' ,
        isAuthenticated: false,
        emailValidated: false,
        stripeid: '',
        credits: 0,
        trustedDevices:[
                {address:'',deviceName:'none', pairedAt:'', lastSeen:'never'}
            ]
    },
    reducers: {
        SET_PLAYER: (state, { payload }) => {
    
         //   console.log({ payload });
            return {
                ...state,
                ...payload
            }
        }
    }})
export const {SET_PLAYER} = playerSlice.actions;
export default playerSlice.reducer;
