import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
import { Link } from 'react-router-dom';
import BookLayout from '../Components/BookLayout';

function NewArrivals() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/new-arrivals')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, []);

  return (
    <div>
      <div className=' container mx-auto'>
        <Title title={'New arrivals'} />
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5 md:mx-0'>
          {
            books?.map(x => <BookLayout key={x?._id} product_id={x._id} bookImage={x.bookImage} bookName={x.bookName} price={x.price} route={`/categories/${x?.category}/${x.bookName}`} />)
          }
        </div>
        <p className=' text-center mt-5 underline text-blue-400'><Link to="books">See More</Link></p>
      </div>
    </div>
  )
}

export default NewArrivals