import React from 'react'
import Title from '../Components/Title';
import { CgAdd } from 'react-icons/cg';
import { Link } from 'react-router-dom';
;


function AllBooks() {
  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'books'}></Title>
      <div className='relative text-4xl text-green-500'>
        <span className=' absolute bottom-5 right-5' title='add books'><Link to={'/books/add-books'}><CgAdd/></Link></span>
      </div>
      
    </div>
  )
}

export default AllBooks