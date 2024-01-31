import {createSlice, PayloadAction } from '@reduxjs/toolkit';

const docSlice = createSlice({
    name: 'document',
    initialState: {
        name: 'empty',
        content: 'none',
        owner: 'none'
    },
    reducers: {
        SET_DOC: (state, { payload }) => {
            console.log({ payload });
           // state = payload;
            return {
                ...state,
                ...payload
            }
        }
}})

export const {SET_DOC} = docSlice.actions;
export default docSlice.reducer;
