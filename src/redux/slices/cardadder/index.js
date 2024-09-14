import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    initialState: 0,
    name: 'cart',
    reducers:{
        addItem: (state) => state+1,
        checkOutItem: (state) => 0,
        removeItem: (state) => state-1,
    },
});

export const {addItem, checkOutItem, removeItem} = cartSlice.actions;
export default cartSlice.reducer;