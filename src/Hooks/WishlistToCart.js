import { useDispatch } from "react-redux";
import { CartItems } from "../redux/features/cart/cartSlice";
import { FavoriteItems } from "../redux/features/favorites/favoriteSlice";

function WishlistToCart() {
    const dispatch = useDispatch()
    const handleCart = (product_id, bookName, bookImage, price, email, i, func) => {
        let selectedCart = localStorage.getItem(email ? email + 'cart' : 'cart') ?
            JSON.parse(localStorage.getItem(email ? email + 'cart' : 'cart')) : [];
        const myCart = { product_id, bookName, bookImage, price };
        selectedCart.push(myCart)
        localStorage.setItem(email ? email + 'cart' : 'cart', JSON.stringify(selectedCart));

        const arrayOfItems = localStorage.getItem(email ? email + 'favorites' : 'favorites');
        const arrayOfObjects = JSON.parse(arrayOfItems)
        arrayOfObjects.splice(i, 1)
        localStorage.setItem(email ? email + 'favorites' : 'favorites', JSON.stringify(arrayOfObjects));
        func(arrayOfObjects)
        dispatch(CartItems(selectedCart.length))
        dispatch(FavoriteItems(arrayOfObjects.length))
    }
    return { handleCart }

}

export default WishlistToCart