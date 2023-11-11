import {PayloadAction, createSlice} from '@reduxjs/toolkit';


type initialState = {
    value: roomState
}

type roomState ={
    roomName : String;
    roomId: String;
}

const initialState = {
    value:{
        roomName: "",
        roomId: ""
    } as roomState,
}as initialState;


export const room = createSlice({

    name: 'room',
    initialState,
    reducers: {
        SET_NAME: (state, action: PayloadAction <String>) => {
            return {
                ...state,
                roomName: action.payload,
              }
        },
        SET_ID: (state, action: PayloadAction <String>) => {
            return {
                ...state,
                roomId: action.payload,
              }
        }
}})

export const {SET_NAME, SET_ID} = room.actions;
export default room.reducer;