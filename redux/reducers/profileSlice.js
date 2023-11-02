import {createSlice} from '@reduxjs/toolkit';
const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        name: 'none'
    },
    reducers: {
        SET_NAME: (state, action) => {
            state.name = action.payload
        }
}})

export const {SET_NAME} = profileSlice.actions;
export default profileSlice.reducer;