import {configureStore} from '@reduxjs/toolkit';
import cartSlice  from './slices/cardadder'

export const store = configureStore({
    reducer: {
        carter: cartSlice,
    },
});

export default store;