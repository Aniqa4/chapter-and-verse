import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Title from '../Components/Title';
import BookLayout from '../Components/BookLayout';

function BooksByCategory() {
  const data=useParams();
  const category=data?.name;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/books-with-less-info')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, []);

  const myBooks=books?.filter(x=>x.category===category)

 console.log(myBooks);
  
  return (
    <div className='container mx-auto pt-1'>
      <Title title={category}/>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5'>
        {
          myBooks?.map(x =><BookLayout key={x._id} bookImage={x.bookImage} bookName={x.bookName} price={x.price}/>)
        }
      </div>
    </div>
  )
}

export default BooksByCategory