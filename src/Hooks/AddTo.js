import Swal from 'sweetalert2';

function AddTo() {
    const handleWishlist = (product_id, bookName, bookImage, price, email) => {
        let selectedFavorites = localStorage.getItem(email ? email + 'favorites' : 'favorites') ?
            JSON.parse(localStorage.getItem(email ? email + 'favorites' : 'favorites')) : [];
        const myFavorites = { product_id, bookName, bookImage, price };
        selectedFavorites.push(myFavorites)

        localStorage.setItem(email ? email + 'favorites' : 'favorites', JSON.stringify(selectedFavorites));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added to Wishlist!',
            showConfirmButton: false,
            timer: 500

        })
    }

    const handleCart = (product_id, bookName, bookImage, price, email) => {
        let selectedCart = localStorage.getItem(email ? email + 'cart' : 'cart') ?
            JSON.parse(localStorage.getItem(email ? email + 'cart' : 'cart')) : [];
        const myCart = { product_id, bookName, bookImage, price };
        selectedCart.push(myCart)
        localStorage.setItem(email ? email + 'cart' : 'cart', JSON.stringify(selectedCart));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added to Cart!',
            showConfirmButton: false,
            timer: 500

        })
    }
    return { handleCart, handleWishlist}
}

export default AddTo