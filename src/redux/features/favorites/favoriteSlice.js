import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteItems: 0,
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        FavoriteItems: (state, { payload }) => {
            state.favoriteItems = payload
        }
    }
})

export const { FavoriteItems } = favoriteSlice.actions

export default favoriteSlice.reducer