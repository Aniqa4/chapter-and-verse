import React from 'react'
import Title from '../Components/Title'
import { TbCurrencyTaka } from 'react-icons/tb'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import BookCategories from '../Hooks/BookCategories';
import AllAuthors from '../Hooks/AllAuthors';
import Publications from '../Hooks/Publications';

function AddBooks() {
  const categories=BookCategories();
  const namesOfPublications=Publications()
  const namesOfAuthors = AllAuthors()

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

    fetch('https://chapter-and-verse-server-side.vercel.app/add-books', {
      method: 'POST',
      headers:
        { 'content-type': 'application/json' },
      body: JSON.stringify(newBook)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged === true) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Book has been added',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    form.reset()
  }

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'add a book'} />
      <form onSubmit={handleForm} className='grid px-10 md:shadow'>
        <label>Book's Name: </label>
        <input type="text" name='bookName' />
        <label>Book's PhotoURL: </label>
        <input type="text" name='bookImage' />
        <label>Author's Name: </label>
        <select name="authorName">
          <option disabled selected>Choose an option</option>
          {
            namesOfAuthors?.map((x) =>
              <option key={x._id} value={x?.name}>{x?.name}</option>)
          }
        </select>
        <label>Publisher's Name: </label>
        <select name="publisherName">
          <option disabled selected>Choose an option</option>
          {
            namesOfPublications?.map((x) =>
              <option key={x._id} value={x?.name}>{x?.name}</option>)
          }
        </select>
        <label className='flex'>Price<span><TbCurrencyTaka /></span> : </label>
        <input type="number" name="price" />
        <label>Date of Arrival: </label>
        <input type="datetime-local" name="date" />
        <label >Category: </label>
        <select name="category">
          <option disabled selected>Choose an option</option>
          {
            categories?.map((x, index) =>
              <option key={index} value={x?.name}>{x?.name}</option>)
          }
        </select>
        <label>Available Copies: </label>
        <input type="number" name='availableCopies' />
        <label>Copies sold: </label>
        <input type="number" name='soldCopies' value={0} disabled />
        <label>Description: </label>
        <input type="text" name='description' className='h-20' />
        <input type="submit" value="Add" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
      </form>
      <p className=' text-center underline text-blue-600 pt-10'><Link to={'/dashboard/manage-books'}>Retun</Link></p>
    </div>
  )
}

export default AddBooks