import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';
import UserInfo from '../Hooks/UserInfo';
import AddTo from '../Hooks/AddTo';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';

function BookDetails() {
    const data = useParams();
    const bookName = data?.bookName;
    const category = data?.name;
    const [bookData, setBookData] = useState([]);
    const [role]=UserInfo();
    const { user } = useContext(AuthContext)
    const email = user?.email
    const {handleCart,handleWishlist}=AddTo()

    useEffect(() => {
        fetch(`https://chapter-and-verse-server-side.vercel.app/books/${bookName}`)
            .then(res => res.json())
            .then(data => setBookData(data))
    }, []);

    const date = bookData?.dateOfArrival

    const formatDate = (date) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    const utcDateFromMongoDB = new Date("2023-08-15T12:00:00Z");
    const formattedDate = formatDate(utcDateFromMongoDB);

    return (
        <div className=' container mx-auto pt-1'>
            <Title title={`${bookData?.bookName}`} />
            {
                role==='admin' && <AddItems route={`/categories/${category}/${bookName}/update-book`} text={'Update book'}/>  
            }  
            <div className='grid md:grid-cols-2 px-5 lg:px-0 gap-5'>
                <div className=''>
                    <img src={bookData?.bookImage} className=' w-96 mx-auto' />
                </div>
                <div className='grid gap-5 text-center md:text-start text-gray-500'>
                    <h1 className=' font-semibold'>Book Name: <span className='text-red-700'>{bookData?.bookName}</span></h1>
                    <h1 className=' font-semibold'>Writer: <span className='text-red-700'>{bookData?.authorName}</span></h1>
                    <h1 className=' font-semibold'>Publisher: <span className='text-red-700'>{bookData?.publisherName}</span></h1>
                    <h1 className=' font-semibold'>Category: {bookData?.category}</h1>
                    <h1 className=' font-semibold'>Price: {bookData?.price} taka</h1>
                    <h1 className=' font-semibold'>Pages: 300</h1>
                    <h1 className=' font-semibold'> 1st Published: {formattedDate}</h1>
                    <p className=' underline'><Link to={`/categories/${bookData?.category}`}>Explore similar books</Link></p>
                    <button onClick={() => handleWishlist(bookData?._id, bookData?.bookName, bookData?.bookImage, bookData?.price, email)}
                        className='bg-green-500 md:w-1/2 text-white border shadow hover:text-black hover:bg-white hover:border-black'>Add To Favorite
                    </button>
                    <button onClick={() => handleCart(bookData?._id, bookData?.bookName, bookData?.bookImage, bookData?.price, email)}
                        className='bg-green-500 md:w-1/2 text-white border shadow hover:text-black hover:bg-white hover:border-black'>Add To Cart
                    </button>
                </div>
            </div>
            <div className=' py-10 px-5 '>
                <Title title={'About'}/>
                <p className='text-sm text-gray-500'>{bookData?.description}</p>
            </div>
        </div>
    )
}

export default BookDetails