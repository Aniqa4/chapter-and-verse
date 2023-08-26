import React from 'react';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function BookLayout({ product_id, bookImage, bookName, price, route }) {

    
    const handleWishlist = (product_id, bookName, bookImage, price) => {
        let selectedFavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
        const myFavorites = { product_id, bookName, bookImage, price };
        selectedFavorites.push(myFavorites)
       
        localStorage.setItem('favorites', JSON.stringify(selectedFavorites));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added to Wishlist!',
            showConfirmButton: false,
            timer: 500

        })
    }
    
    const handleCart = (product_id, bookName, bookImage, price) => {
        let selectedItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const myCart = { product_id, bookName, bookImage, price };
        selectedItems.push(myCart)
       
        localStorage.setItem('cart', JSON.stringify(selectedItems));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added toCart!',
            showConfirmButton: false,
            timer: 500

        })
    }

    return (
        <div className='book grid gap-2 md:gap-5 shadow border py-5 hover:border-gray-300 relative'>
            <Link to={route}><img src={bookImage} className=' xl:h-72 xl:w-44 h-40 w-28 mx-auto hover:opacity-80' /></Link>
            <div className='text-center grid gap-2 md:gap-5'>
                <h1 className=' font-semibold text-red-700'> {bookName}</h1>
                <p className=' text-gray-400'>Price: {price}</p>
                <span className='flex justify-center gap-5 text-gray-500 text-xl'>
                    <span onClick={()=>handleWishlist(product_id,bookName,bookImage,price)} className='hover:text-gray-900'><MdOutlineFavoriteBorder /></span>
                    <span onClick={()=>handleCart(product_id,bookName,bookImage,price)} className='hover:text-gray-900'><CgShoppingBag /></span>
                </span>
            </div>
        </div>
    )
}

export default BookLayout