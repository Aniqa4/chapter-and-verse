import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import { TbCurrencyTaka } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Books from '../Hooks/Books';
import BookCategories from '../Hooks/BookCategories';
import Publications from '../Hooks/Publications';
import AllAuthors from '../Hooks/AllAuthors';

function UpdateBooks() {
    const books = Books()
    const categories = BookCategories();
    const namesOfPublications = Publications()
    const namesOfAuthors = AllAuthors()
    const data = useParams();
    const bookName = data?.bookName;
    const category = data?.name;
    const navigate = useNavigate();
    const from = `/categories/${category}/${bookName}`;

    const myBook = books?.find(x => x?.bookName === bookName && x?.category === category)
    //console.log(myBook);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const bookName = form.bookName.value;
        const bookImage = form.bookImage.value;
        const authorName = form.authorName.value;
        const publisherName = form.publisherName.value;
        const price = form.price.value;
        const category = form.category.value;
        const dateOfArrival = form.date.value;
        const availableCopies = form.availableCopies.value;
        const soldCopies = form.soldCopies.value;
        const description = form.description.value;
        const newBook = { bookName, bookImage, authorName, publisherName, price, category, dateOfArrival, availableCopies, soldCopies, description }

        fetch(`https://chapter-and-verse-server-side.vercel.app/update-book/${myBook._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Book has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(from, { replace: true })
                }
            })

        form.reset()
        console.log(myBook._id, newBook);

    }
    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Update book'} />
            <form onSubmit={handleForm} className='grid px-10 md:shadow'>
                <label>Book's Name: </label>
                <input type="text" name='bookName' defaultValue={myBook?.bookName} />
                <label>Book's PhotoURL: </label>
                <input type="text" name='bookImage' defaultValue={myBook?.bookImage} />
                <label>Author's Name: </label>
                <select name="authorName">
                    <option defaultValue={myBook?.authorName}>{myBook?.authorName}</option>
                    {
                        namesOfAuthors?.map(x =>
                            <option key={x._id} value={x?.name}>{x?.name}</option>)
                    }
                </select>
                <label>Publisher's Name: </label>
                <select name="publisherName" defaultValue={myBook?.publisherName}>
                    <option defaultValue={myBook?.publisherName}>{myBook?.publisherName}</option>
                    {
                        namesOfPublications?.map((x) =>
                            <option key={x._id} value={x?.name}>{x?.name}</option>)
                    }
                </select>
                <label className='flex'>Price<span><TbCurrencyTaka /></span> : </label>
                <input type="number" name="price" defaultValue={myBook?.price} />
                <label>Date of Arrival: </label>
                <input type="datetime-local" name="date" defaultValue={myBook?.dateOfArrival} disabled className='bg-gray-100 border-0' />
                <label >Category: </label>
                <select name="category">
                    <option defaultValue={myBook?.category}>{myBook?.category}</option>
                    {
                        categories?.map((x, index) =>
                            <option key={index} value={x?.name}>{x?.name}</option>)
                    }
                </select>
                <label>Available Copies: </label>
                <input type="number" name='availableCopies' defaultValue={myBook?.availableCopies} />
                <label>Copies sold: </label>
                <input type="number" name='soldCopies' defaultValue={myBook?.soldCopies} disabled className='bg-gray-100 border-0' />
                <label>Description: </label>
                <input type="text" name='description' defaultValue={myBook?.description} className='h-20' />
                <input type="submit" value="Add" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
            </form>
        </div>
    )
}

export default UpdateBooks