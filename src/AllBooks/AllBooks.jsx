import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title';
import BookLayout from '../Components/BookLayout';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';
import Books from '../Hooks/Books';

function AllBooks() {
  const {loading}=useContext(AuthContext);
  const books=Books();

  if(loading){
    return <div>Loading...</div>
  }  

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'books'}></Title>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5 md:mx-0 pb-10'>
        {
          books?.map(x => 
          <BookLayout key={x?._id} product_id={x._id} bookImage={x.bookImage} bookName={x.bookName} price={x.price} 
          route={`/categories/${x?.category}/${x.bookName}`} />)
        }
      </div>
    </div>
  )
}

export default AllBooks