import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Title from '../../components/Title';
import BookLayout from '../../components/BookLayout';
import axios from 'axios';

function BooksByAuthor() {
    const data = useParams();
    const author = data?.name;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`https://chapter-and-verse-server-side.vercel.app/books-by-author/${author}`)
            .then(data => setBooks(data.data))
    }, []);

    //console.log(books);
    return (
        <div className='container mx-auto pt-1'>
        <Title title={`Books of ${author}`} />
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5'>
          {
            books?.map(x => <BookLayout key={x._id} product_id={x._id} bookImage={x.bookImage} bookName={x.bookName} price={x.price} route={`/categories/${x.category}/${x.bookName}`}/>)
          }
        </div>
      </div>
    )
}

export default BooksByAuthor