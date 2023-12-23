import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteItems: 0,
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        incrementFavorite: (state) => {
            state.favoriteItems += 1
        },
        decrementFavorite: (state) => {
            state.favoriteItems -= 1
        }
    }
})

export const { incrementFavorite, decrementFavorite} = favoriteSlice.actions

export default favoriteSlice.reducer