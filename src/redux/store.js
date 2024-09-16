import {configureStore} from '@reduxjs/toolkit';
import cartSlice  from './slices/cardadder'
import { loginStatusSlice } from './slices/loginstatus';

export const store = configureStore({
    reducer: {
        carter: cartSlice,
        logger: loginStatusSlice,
    },
});

export default store;