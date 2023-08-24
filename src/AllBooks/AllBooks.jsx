import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';
import BookLayout from '../Components/BookLayout';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';
import UserInfo from '../Hooks/UserInfo';
import Books from '../Hooks/Books';



function AllBooks() {
  const {loading}=useContext(AuthContext);
  const [role]=UserInfo();
  const books=Books();

  if(loading){
    return <div>Loading...</div>
  }  

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'books'}></Title>
     {
       role==='admin' && <AddItems text={'Manage Books'} route={'/books/manage-books'} />
     }
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5 md:mx-0'>
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