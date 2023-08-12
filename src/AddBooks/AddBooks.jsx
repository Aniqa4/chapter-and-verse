import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
import { TbCurrencyTaka} from 'react-icons/tb'

function AddBooks() {
  const [description, setDescription] = useState([]);
  const [namesOfAuthors, setNamesOfAuthors] = useState([]);

  useEffect(() => {
    fetch('/description.json')
      .then(res => res.json())
      .then(data => setDescription(data.categories))
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/names-of-authors')
      .then(res => res.json())
      .then(data => setNamesOfAuthors(data))
  }, []);


  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;

    console.log(date);
  }

  console.log(namesOfAuthors);

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'add a book'} />
      <form onSubmit={handleForm} className='grid px-10 md:shadow'>
        <label>Book Name: </label>
        <input type="text" />
        <label>Author's Name: </label>
        <select name="category">
          <option value="defaultValue" disabled selected>-----</option>
          {
            namesOfAuthors?.map((x) =>
            <option key={x._id} value={x?.name}>{x?.name}</option>)
          }
        </select>
        <label>Publisher's Name: </label>
        <input type="text" />
        <label className='flex'>Price<span><TbCurrencyTaka/></span> : </label>
        <input type="number" name="price"/>
        <label>Date of Arrival: </label>
        <input type="datetime-local" name="date" id="" />
        <label >Category: </label>
        <select name="category">
          <option value="default" disabled selected>-----</option>
          {
            description?.map((x, index) =>
            <option key={index} value={x?.name}>{x?.name}</option>)
          }
        </select>
        <label>Available Copies: </label>
        <input type="number"/>
        <label>Copies sold: </label>
        <input type="number" value={0} disabled/>
        <label>Description: </label>
        <input type="text" className='h-20' />
        <input type="submit" value="Add" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
      </form>
    </div>
  )
}

export default AddBooks