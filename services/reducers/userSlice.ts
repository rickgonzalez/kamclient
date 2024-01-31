import {createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '?',
        email: 'none',
        id: 'none', 
        verToken: 'none' ,
        isAuthenticated: false 
    },
    reducers: {
        SET_USER: (state, { payload }) => {
            console.log({ payload });
           // state = payload;
            return {
                ...state,
                ...payload
            }
        }
}})

export const {SET_USER} = userSlice.actions;
export default userSlice.reducer;
