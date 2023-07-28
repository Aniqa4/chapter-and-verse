import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className=' bg-sky-600'>
        <div className='container mx-auto flex justify-between bg-sky-600 text-white py-5'>
          <h1 className=' uppercase'>Chapter<span className=' text-black'>&</span>Verse</h1>
          <ul className='flex gap-10'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/all-books'>All Books</Link></li>
          </ul>
          <button>Sign In</button>
        </div>
      </div>
    </>
  )
}

export default Navbar