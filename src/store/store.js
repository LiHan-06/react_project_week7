import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slice/messageSlice";//約定成熟的習慣，會命名Reducer而不是Slice

export const store = configureStore({
    reducer:{
        message: messageReducer,
    },
});

export default store;