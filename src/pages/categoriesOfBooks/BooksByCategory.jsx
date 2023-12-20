import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Title from '../components/Title';
import BookLayout from '../components/BookLayout';
import axios from 'axios';

function BooksByCategory() {
  const data = useParams();
  const category = data?.name;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`https://chapter-and-verse-server-side.vercel.app/books-by-category/${category}`)
      .then(data => setBooks(data.data))
  }, []);

  //console.log(myBooks);
  return (
    <div className='container mx-auto pt-1'>
      <Title title={category} />
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5'>
        {
          books?.map(x => <BookLayout key={x?._id} product_id={x._id} bookImage={x.bookImage} bookName={x.bookName} price={x.price} route={`/categories/${category}/${x.bookName}`}/>)
        }
      </div>
    </div>
  )
}

export default BooksByCategory