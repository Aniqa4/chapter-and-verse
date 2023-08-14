import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdClose } from 'react-icons/md';


function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/books-with-less-info')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, []);

  //console.log(books);

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'books'}></Title>
      <AddItems text={'Add Books'} route={'/books/add-books'} />
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5'>
        {
          books?.map(x =>
            <div key={x._id} className='grid gap-2 md:gap-5 shadow border py-5 hover:bg-gray-100 relative'>
              <div className=' absolute -top-2 -right-2 bg-red-600 p-1 rounded-full'>
                <p className='text-white'><MdClose/></p>
              </div>
              <img src={x.bookImage} className=' xl:h-72 xl:w-44 h-40 w-28 mx-auto' />
              <div className='text-center grid gap-2 md:gap-5'>
                <h1 className=' font-semibold text-red-700'> {x.bookName}</h1>
                <p className=' text-gray-400'>Price: {x.price}</p>
                <span className='flex justify-center gap-5 text-gray-500 text-xl'>
                  <span className='hover:text-gray-900'><MdOutlineFavoriteBorder /></span>
                  <span className='hover:text-gray-900'><CgShoppingBag /></span>
                </span>
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default AllBooks