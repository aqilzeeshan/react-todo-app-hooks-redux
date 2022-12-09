//import redux toolkit
import { configureStore } from "@reduxjs/toolkit";
//import task reducer
import taskReducer from "./task";
// The configureStore function to setup store with relevent settings
const store =  configureStore({
    reducer: {
        task: taskReducer,
    },
});
//export store to be used in index.js
export default store