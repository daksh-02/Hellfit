import {configureStore} from '@reduxjs/toolkit'
import APISlice from './APISlice.js'
import UserSlice from './UserSlice.js';

const store = configureStore({
    reducer:{
        Api : APISlice,
        UserInfo : UserSlice
    }
});

export default store;