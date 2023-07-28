import React from 'react'
import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';

function Navbar() {
  return (
    <>
      <div className='bg-slate-700 fixed top-0 left-0 right-0 z-50'>
        <div className='container mx-auto flex justify-between text-white py-5'>
          <h1 className=' uppercase'>Chapter<span className=' text-black'>&</span>Verse</h1>
          <ul className='flex gap-10'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/all-books'>All Books</Link></li>
          </ul>
          <button>Sign In</button>
        </div>
      </div>
      <div className=' fixed bottom-10 right-10 bg-slate-700 bg-opacity-60 p-5 rounded-full'>
        <h1 className=' text-black text-2xl'><RiShoppingCartLine /></h1>
      </div>
    </>
  )
}

export default Navbar