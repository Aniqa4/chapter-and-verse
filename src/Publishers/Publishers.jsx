import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';
import Modal from '../Components/Modal';
import { Link } from 'react-router-dom';

function Publishers() {
  const [namesOfPublications, setNamesOfPublications] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/publishers')
      .then(res => res.json())
      .then(data => setNamesOfPublications(data))
  }, []);

  //console.log(namesOfPublications);
  return (
    <div className=' lg:container lg:mx-auto py-5 mx-5'>
      <Title title={'Publishers'} />
      <p className='py-2 text-gray-400'>Search books by Publishers</p>
      <AddItems text={'Add Publishers'} route={'/publishers/add-publishers'} />
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-2'>
        {
          namesOfPublications?.map(x =>
            <div key={x?._id} className=' p-5 shadow my-2 flex justify-between items-center hover:bg-gray-100' >
              <Link to={`${x?.name}`}><h1 className=' font-semibold text-sm text-red-700 hover:text-red-400'>{x.name}</h1></Link>
              <div className='grid grid-cols-2 gap-2'>
                <button className=' border px-3 py-1 hover:bg-white'>Delete</button>
                <Modal name={x.name} email={x.email} phone={x.phone} description={x.description} route={`${x._id}/update-publisher`} />
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Publishers