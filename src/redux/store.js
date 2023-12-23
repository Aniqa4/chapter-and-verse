import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import { logger } from "./middlewares/logger";
import favoriteSlice from "./features/favorites/favoriteSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        favorite: favoriteSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store