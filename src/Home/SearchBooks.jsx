import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

function SearchBooks() {
    const handleSearch=(event)=>{
        event.preventDefault();
        const form=event.target;
        const searchedItem=form.search.value;
        console.log(searchedItem);
    }
    return (
        <div className=' container mx-auto'>
            <form onSubmit={handleSearch} className='flex justify-center my-10'>
                <div className=' relative  w-1/2'>
                    <input type="search" name="search" className=' absolute top-0 left-0 right-0 bottom-0' />
                </div>
                <button className=' text-2xl flex items-center bg-gray-800 text-white p-2'><BiSearchAlt2 /></button>
            </form>
        </div>
    )
}

export default SearchBooks