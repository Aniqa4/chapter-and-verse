import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BookLayout from '../../components/BookLayout';
import Title from '../../components/Title';
import axios from 'axios';

function BooksByPublisher() {
    const data = useParams();
    const publisher = data?.name;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`https://chapter-and-verse-server-side.vercel.app/books-by-publisher/${publisher}`)
            .then(data => setBooks(data.data))
    }, []);

    return (
        <div className='container mx-auto pt-1'>
            <Title title={`Books of ${publisher}`} />
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5'>
                {
                    books?.map(x => <BookLayout key={x._id} product_id={x._id} bookImage={x.bookImage} bookName={x.bookName} price={x.price} route={`/categories/${x.category}/${x.bookName}`} />)
                }
            </div>
        </div>
    )
}

export default BooksByPublisher