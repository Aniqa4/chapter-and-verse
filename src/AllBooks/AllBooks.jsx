import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import { CgAdd } from 'react-icons/cg';
import { Link } from 'react-router-dom';


function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/books-with-less-info')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, []);

  console.log(books);

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'books'}></Title>
      <div className='relative text-green-500'>
        <p className=' absolute bottom-2 right-5'><Link to={'/books/add-books'}
          className='flex items-center shadow px-2 py-1 rounded-md border'>Add Books&nbsp;<CgAdd /></Link></p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5'>
        {
          books?.map(x =>
            <div key={x._id} className='grid gap-5 shadow py-5 hover:bg-gray-100'>
              <img src={x.bookImage} className=' xl:h-72 xl:w-44 h-40 w-28 mx-auto' />
              <div className='text-center'>
                <h1 className=' font-semibold text-red-700'> {x.bookName}</h1>
                <p className=' text-gray-400'>Price: {x.price}</p>
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default AllBooks