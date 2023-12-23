import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        CartItems: (state, { payload }) => {
            state.cartItems = payload
        },

    }
})

export const { CartItems } = cartSlice.actions

export default cartSlice.reducer