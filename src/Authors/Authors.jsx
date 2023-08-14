import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';

function Authors() {
  const [namesOfAuthors, setNamesOfAuthors] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/authors')
      .then(res => res.json())
      .then(data => setNamesOfAuthors(data))
  }, []);

  //console.log(namesOfAuthors);
  return (
    <div className=' lg:container lg:mx-auto py-5 mx-5'>
      <Title title={'Authors'}/>
      <p className='py-2 text-gray-400'>Search books by Author</p>
      <AddItems text={'Add Authors'} route={'/authors/add-authors'}/>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-2'>
        {
          namesOfAuthors?.map(x=>
          <div key={x._id} className=' p-5 shadow my-2 flex justify-between items-center hover:bg-gray-100 ' >
            <h1 className=' font-semibold text-sm text-red-700'>Name: {x.name}</h1>
            <button className=' px-3 py-2 border rounded-sm'>About</button>
          </div>)
        }
      </div>
    </div>
  )
}

export default Authors