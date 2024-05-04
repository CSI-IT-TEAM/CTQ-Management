import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openNotice: false,
    typeNotice: "success",
    openLoad: false,
};

const dataSlice = createSlice({
    name: 'commonData',
    initialState,
    reducers: {
        openNotice: (state) => {
            state.openNotice = true;
        },
        closeNotice: (state) => {
            state.openNotice = false;
        },
        openLoad: (state) => {
            state.openLoad = true;
        },
        closeLoad: (state) => {
            state.openLoad = false;
        },
        setTypeNotice: (state, action) => {
            state.typeNotice = action.payload;
        },
    }
});

export const dataAction = dataSlice.actions;
export default dataSlice;