import React from 'react';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

function BookLayout({bookImage,bookName,price}) {
    return (
        <div className='grid gap-2 md:gap-5 shadow border py-5 hover:bg-gray-100 hover:border-gray-300 relative'>
            <div className=' absolute -top-2 -right-2 bg-red-600 p-1 rounded-full'>
                <p className='text-white'><MdClose /></p>
            </div>
            <img src={bookImage} className=' xl:h-72 xl:w-44 h-40 w-28 mx-auto' />
            <div className='text-center grid gap-2 md:gap-5'>
                <h1 className=' font-semibold text-red-700'> {bookName}</h1>
                <p className=' text-gray-400'>Price: {price}</p>
                <span className='flex justify-center gap-5 text-gray-500 text-xl'>
                    <span className='hover:text-gray-900'><MdOutlineFavoriteBorder /></span>
                    <span className='hover:text-gray-900'><CgShoppingBag /></span>
                </span>
            </div>
        </div>
    )
}

export default BookLayout