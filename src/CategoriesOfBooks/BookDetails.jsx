import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Title from '../Components/Title';

function BookDetails() {
    const data = useParams();
    const bookName = data?.bookName;
    const category = data?.name;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/books')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);

    const myBook = books?.find(x => x.bookName === bookName && x.category === category)
    console.log(myBook);

    const date = myBook?.dateOfArrival

    const formatDate = (date) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    const utcDateFromMongoDB = new Date("2023-08-15T12:00:00Z");
    const formattedDate = formatDate(utcDateFromMongoDB);

    return (
        <div className=' container mx-auto pt-1'>
            <Title title={`${myBook?.bookName}`} />
            <div className='grid md:grid-cols-2 px-5 lg:px-0 gap-5'>
                <div className=''>
                    <img src={myBook?.bookImage} className=' w-96 mx-auto' />
                </div>
                <div className='grid gap-5 text-center md:text-start text-gray-500'>
                    <h1 className=' font-semibold'>Book Name: <span className='text-red-700'>{myBook?.bookName}</span></h1>
                    <h1 className=' font-semibold'>Writer: <span className='text-red-700'>{myBook?.authorName}</span></h1>
                    <h1 className=' font-semibold'>Publisher: <span className='text-red-700'>{myBook?.publisherName}</span></h1>
                    <h1 className=' font-semibold'>Category: {myBook?.category}</h1>
                    <h1 className=' font-semibold'>Price: {myBook?.price} taka</h1>
                    <h1 className=' font-semibold'>Pages: 300</h1>
                    <h1 className=' font-semibold'> 1st Published: {formattedDate}</h1>
                    <p className=' underline'><Link to={`/categories/${category}`}>Explore similar books</Link></p>
                    <button
                        className='bg-green-500 md:w-1/2 text-white border shadow hover:text-black hover:bg-white hover:border-black'>Add To Favorite
                    </button>
                    <button
                        className='bg-green-500 md:w-1/2 text-white border shadow hover:text-black hover:bg-white hover:border-black'>Add To Cart
                    </button>
                </div>
            </div>
            <div className=' py-10 px-5 '>
                <Title title={'About'}/>
                <p className='text-sm text-gray-500'>{myBook?.description}</p>
            </div>
        </div>
    )
}

export default BookDetails