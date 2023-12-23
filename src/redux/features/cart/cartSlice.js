import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementCart: (state) => {
            state.cartItems += 1
        },
        decrementCart: (state) => {
            state.cartItems -= 1
        }
    }
})

export const { incrementCart, decrementCart } = cartSlice.actions

export default cartSlice.reducer