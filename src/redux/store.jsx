import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const store = configureStore({
    reducer: {
        commonData: dataSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;