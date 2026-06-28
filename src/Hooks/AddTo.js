import { useDispatch } from 'react-redux';
import { CartItems } from '../redux/features/cart/cartSlice';
import { FavoriteItems } from '../redux/features/favorites/favoriteSlice';
import { toast } from 'sonner';

function AddTo() {
    const dispatch = useDispatch()

    const handleWishlist = (product_id, bookName, bookImage, price, email) => {
        let selectedFavorites = localStorage.getItem(email ? email + 'favorites' : 'favorites') ?
            JSON.parse(localStorage.getItem(email ? email + 'favorites' : 'favorites')) : [];

        const alreadyAdded = selectedFavorites.some(item => item.product_id === product_id);
        if (alreadyAdded) {
            toast.info('Already in wishlist');
            return;
        }

        const myFavorites = { product_id, bookName, bookImage, price };
        selectedFavorites.push(myFavorites);
        localStorage.setItem(email ? email + 'favorites' : 'favorites', JSON.stringify(selectedFavorites));
        dispatch(FavoriteItems(selectedFavorites.length));
        toast.success('Added to wishlist!');
    }

    const handleCart = (product_id, bookName, bookImage, price, email) => {
        let selectedCart = localStorage.getItem(email ? email + 'cart' : 'cart') ?
            JSON.parse(localStorage.getItem(email ? email + 'cart' : 'cart')) : [];

        const existingIndex = selectedCart.findIndex(item => item.product_id === product_id);
        if (existingIndex !== -1) {
            selectedCart[existingIndex] = {
                ...selectedCart[existingIndex],
                quantity: (selectedCart[existingIndex].quantity || 1) + 1,
            };
            toast.success('Quantity updated!');
        } else {
            selectedCart.push({ product_id, bookName, bookImage, price, quantity: 1 });
            toast.success('Added to cart!');
        }

        localStorage.setItem(email ? email + 'cart' : 'cart', JSON.stringify(selectedCart));
        dispatch(CartItems(selectedCart.length));
    }

    return { handleCart, handleWishlist }
}

export default AddTo
